from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from pessoas.models import Paciente, Medico


class PacienteSerializer(ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Paciente
        fields = [
            'id',
            'cpf',
            'nome',
            'idade'
        ]


class MedicoSerializer(ModelSerializer):
    id = serializers.IntegerField(required=False)

    class Meta:
        model = Medico
        fields = [
            'id',
            'crm',
            'cpf',
            'nome',
            'idade'
        ]
