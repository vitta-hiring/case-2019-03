from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from prescricoes.models import Prescricao, Item
from .serializers import PrescricaoSerializer, ItemSerializer
from medicamentos.api.serializers import InteracaoSerializer
from medicamentos.models import Medicamento, Interacao


class PrescricaoViewSet(ModelViewSet):
    queryset = Prescricao.objects.all()
    serializer_class = PrescricaoSerializer


class ItemViewSet(ModelViewSet):
    serializer_class = ItemSerializer

    def get_queryset(self):
        items = Item.objects.all()
        items_to_return = []
        for item in items:
            medicamento_atual = Medicamento.objects.filter(id__exact=item.medicamento_id).get()
            lista = Item.objects.exclude(id__exact=item.id).filter(prescricao__exact=item.prescricao)
            ids = [i.medicamento_id for i in lista]
            demais = Medicamento.objects.filter(id__in=ids)
            if not demais:
                items_to_return.append(self.get_item_to_append(item, []))
                continue

            for medicamento in demais:
                interacoes = Interacao.objects.filter(
                    farmaco1__in=medicamento_atual.farmacos,
                    farmaco2__in=medicamento.farmacos
                ).select_related().values('farmaco2', 'nome', 'descricao')
                items_to_return.append(self.get_item_to_append(item, interacoes))

        return items_to_return

    def get_item_to_append(self, item, interacoes):
        return {'medicamento': item.medicamento,
                 'observacoes': item.observacoes,
                 'prescricao': item.prescricao,
                 'interacoes': interacoes}
