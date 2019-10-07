from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from prescricoes.models import Prescricao, Item
from .serializers import PrescricaoSerializer, ItemSerializer


class PrescricaoViewSet(ModelViewSet):
    queryset = Prescricao.objects.all()
    serializer_class = PrescricaoSerializer


class ItemViewSet(ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer