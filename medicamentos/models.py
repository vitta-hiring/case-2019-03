from django.db import models
from django.contrib.postgres.fields import ArrayField


class Medicamento(models.Model):
    id_medicamento = models.IntegerField()
    nome = models.TextField(null=True)
    farmaco = models.CharField(max_length=255, null=True)
    farmacos = ArrayField(models.CharField(max_length=600, null=True), blank=True)
    concentracao = models.CharField(max_length=255, null=True)
    unidade = models.CharField(max_length=255, null=True)
    tipo_medicamento = models.CharField(max_length=255, null=True)
    forma_farmaceutica = models.CharField(max_length=255, null=True)
    via_administracao = models.CharField(max_length=255, null=True)
    codigo_atc = models.CharField(max_length=255, null=True)
    uso_interno = models.BooleanField(default=False)
    antimicromiano = models.BooleanField(default=False)
    bula = models.URLField(null=True)
    portaria344 = models.CharField(max_length=255, blank=True, null=True)
    controle_especial = models.BooleanField(default=False)
    tiss = models.CharField(max_length=255, null=True)
    mip = models.BooleanField(default=False)
    label = models.TextField(null=True)
    unificado = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.id_medicamento

    def __repr__(self):
        return self.__str__()


class Interacao(models.Model):
    farmaco1 = models.CharField(max_length=255)
    farmaco2 = models.CharField(max_length=255)
    nome = models.CharField(max_length=255)
    descricao = models.TextField()

    def __str__(self):
        return self.nome

    def __repr__(self):
        return self.__str__()
