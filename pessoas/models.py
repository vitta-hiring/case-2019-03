from django.db import models
from django.contrib.auth.models import User


class Pessoa(models.Model):
    cpf = models.CharField(max_length=11, null=True)
    nome = models.CharField(max_length=255, null=True)
    idade = models.IntegerField(default=0)

    class Meta:
        abstract = True


class Paciente(Pessoa):
    def __str__(self):
        return self.nome

    def __repr__(self):
        return self.__str__()


class Medico(Pessoa):
    crm = models.CharField(max_length=30, null=False)
    usuario = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.nome

    def __repr__(self):
        return self.__str__()
