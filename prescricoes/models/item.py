from django.db import models
from medicamentos.models.medicamento import Medicamento
from .prescricao import Prescricao


class Item(models.Model):
    prescricao = models.ForeignKey(Prescricao, related_name='items', on_delete=models.CASCADE)
    medicamento = models.ForeignKey(Medicamento, on_delete=models.PROTECT)
    observacoes = models.TextField(null=True)

    class Meta:
        ordering = ['medicamento']

    def __str__(self):
        return f'{self.medicamento.nome} - {self.observacoes}'

    def __repr__(self):
        return self.__str__()
