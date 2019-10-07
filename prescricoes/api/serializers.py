from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from prescricoes.models import *


class ItemSerializer(ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Item
        fields = [
            'id',
            'medicamento',
            'observacoes'
        ]


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
        items = validated_data.pop('items')
        prescricao = Prescricao.objects.create(**validated_data)
        for item in items:
            Item.objects.create(**item, prescricao=prescricao)
        return prescricao

    def update(self, instance, validated_data):
        items = validated_data.pop('items', False)
        instance.paciente = validated_data.get('paciente', instance.paciente)
        instance.medico = validated_data.get('medico', instance.medico)
        instance.save()
        manter_items = []
        ids_existentes = [i.id for i in instance.items.all()]
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
