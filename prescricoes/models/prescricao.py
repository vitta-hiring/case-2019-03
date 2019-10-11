from django.db import models
from pessoas.models import Medico, Paciente


class Prescricao(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.PROTECT)
    medico = models.ForeignKey(Medico, on_delete=models.PROTECT)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)

    @property
    def items(self):
        return self.item_set.all()

    def __str__(self):
        return f'Codigo: {self.id} - Paciente: {self.paciente.nome} - Medico: {self.medico.nome}'

    def __repr__(self):
        return self.__str__()
