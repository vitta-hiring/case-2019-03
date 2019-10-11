from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from medicamentos.models import Interacao, Medicamento


class InteracaoSerializer(ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Interacao
        fields = [
            'id',
            'farmaco1',
            'farmaco2',
            'tipo_interacao',
            'descricao'
        ]


class MedicamentoSerializer(ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Medicamento
        fields = [
            'id',
            'nome',
            'farmaco',
            'farmacos',
            'concentracao',
            'unidade',
            'tipo_medicamento',
            'forma_farmaceutica',
            'via_administracao',
            'codigo_atc',
            'uso_interno',
            'antimicrobiano',
            'bula',
            'portaria344',
            'controle_especial',
            'tiss',
            'mip',
            'label',
            'unificado'
        ]
