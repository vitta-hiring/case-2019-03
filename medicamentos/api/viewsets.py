from rest_framework.viewsets import ModelViewSet
from medicamentos.models import Medicamento, Interacao
from medicamentos.api.serializers import InteracaoSerializer

class InteracaoViewSet(ModelViewSet):
    queryset = Interacao.objects.all()
    serializer_class = InteracaoSerializer