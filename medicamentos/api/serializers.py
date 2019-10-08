from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from medicamentos.models import Interacao


class InteracaoSerializer(ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Interacao
        fields = [
            'id',
            'farmaco1',
            'farmaco2',
            'nome',
            'descricao'
        ]