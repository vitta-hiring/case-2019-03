from django.db import transaction
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from prescricoes.models import *
from medicamentos.models import Medicamento, Interacao


class ItemSerializer(ModelSerializer):
    id = serializers.IntegerField(required=False)
    medicamento = serializers.IntegerField(required=True)
    interacoes = serializers.SerializerMethodField(required=False, read_only=True)

    class Meta:
        model = Item
        fields = [
            'id',
            'medicamento',
            'observacoes',
            'interacoes'
        ]
        depth = 1

    def to_representation(self, instance):
        interacoes = self.get_interacoes(instance)
        return {
            'id': instance.id,
            'medicamento': instance.medicamento.nome,
            'observacoes': instance.observacoes,
            'interacoes': interacoes}

    def get_interacoes(self, instance):
        try:
            items = Item.objects.exclude(id__exact=instance.id).filter(prescricao__exact=instance.prescricao)
            ids = [i.medicamento_id for i in items]
            lista_de_interacoes = []
            for item in items:
                medicamento_atual = instance.medicamento
                outros_medicamentos_prescritos = Medicamento.objects.filter(id__in=ids)

                if not outros_medicamentos_prescritos:
                    continue

                for medicamento in outros_medicamentos_prescritos:
                    interacoes = Interacao.objects.filter(
                        farmaco1__exact=medicamento_atual.farmacos,
                        farmaco2__exact=medicamento.farmacos
                    ).select_related().values('tipo_interacao', 'descricao')
                    if not interacoes.count():
                        continue

                    interacoes = list(interacoes.all())
                    for i in interacoes:
                        i['medicamento_interacao'] = medicamento.nome
                        lista_de_interacoes.append(i)

                return lista_de_interacoes
        except Exception as e:
            raise serializers.ValidationError({'detail': str(e)})


class PrescricaoSerializer(ModelSerializer):
    items = ItemSerializer(many=True, read_only=False)

    class Meta:
        model = Prescricao
        fields = [
            'id',
            'paciente',
            'medico',
            'data_criacao',
            'data_atualizacao',
            'items']

    def create(self, validated_data):
        try:
            with transaction.atomic():
                items = validated_data.pop('items')
                prescricao = Prescricao.objects.create(**validated_data)
                for item in items:
                    item['medicamento'] = Medicamento.objects.get(id=item['medicamento'])
                    Item.objects.create(**item, prescricao=prescricao)
                return prescricao
        except Exception as e:
            raise serializers.ValidationError({'detail': str(e)})


    @transaction.atomic
    def update(self, instance, validated_data):
        try:
            with transaction.atomic():
                items = validated_data.pop('items', False)
                instance.paciente = validated_data.get('paciente', instance.paciente)
                instance.medico = validated_data.get('medico', instance.medico)
                instance.save()
                manter_items = []

                for item in items:
                    if "id" in item.keys():
                        if Item.objects.filter(id=item["id"]).exists():
                            i = Item.objects.get(id=item["id"])
                            i.medicamento = item.get("medicamento", i.medicamento)
                            i.observacoes = item.get("observacoes", i.observacoes)
                            i.save()
                            manter_items.append(i.id)
                        else:
                            continue
                    else:
                        i = Item.objects.create(**item, prescricao=instance)
                        manter_items.append(i.id)

                for item in instance.items.all():
                    if item.id not in manter_items:
                        item.delete()

                return instance
        except Exception as e:
            return serializers.ValidationError({'detail':str(e)})
