from rest_framework.viewsets import ModelViewSet
from pessoas.api.serializers import *
from pessoas.models import Paciente, Medico


class PacienteViewSet(ModelViewSet):
    queryset = Paciente.objects.all()
    serializer_class = PacienteSerializer


class MedicoViewSet(ModelViewSet):
    queryset = Medico.objects.all()
    serializer_class = MedicoSerializer