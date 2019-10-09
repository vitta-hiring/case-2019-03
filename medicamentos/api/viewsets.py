from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.viewsets import ModelViewSet
from medicamentos.models import Interacao, Medicamento
from medicamentos.api.serializers import InteracaoSerializer, MedicamentoSerializer


class InteracaoViewSet(ModelViewSet):
    queryset = Interacao.objects.all()
    serializer_class = InteracaoSerializer


class MedicamentoViewSet(ModelViewSet):
    queryset = Medicamento.objects.all()
    serializer_class = MedicamentoSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_fields = ['nome', 'via_administracao']
    search_fields = ['nome', 'via_administracao']
    ordering_fields = ['id', 'nome']


