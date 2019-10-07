from django.db import models
from pessoas.models import Medico, Paciente
from medicamentos.models import Medicamento, Interacao


class Prescricao(models.Model):
    paciente = models.ForeignKey(Paciente, on_delete=models.PROTECT)
    medico = models.ForeignKey(Medico, on_delete=models.PROTECT)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f'Codigo: {self.id} - Paciente: {self.paciente.nome} - Medico: {self.medico.nome}'

    def __repr__(self):
        return self.__str__()


class Items(models.Model):
    prescricao = models.ForeignKey(Prescricao, related_name='items', on_delete=models.CASCADE)
    medicamento = models.ForeignKey(Medicamento, on_delete=models.PROTECT)
    observacoes = models.TextField(null=True)

    class Meta:
        unique_together = ['prescricao', 'medicamento']
        ordering = ['medicamento']

    def __str__(self):
        return f'{self.medicamento.nome} - {self.administracao}'

    def __repr__(self):
        return self.__str__()
