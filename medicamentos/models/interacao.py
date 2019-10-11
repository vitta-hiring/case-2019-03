from django.db import models
from django.contrib.postgres.fields import ArrayField


class Interacao(models.Model):
    farmaco1 = ArrayField(models.CharField(max_length=255, null=True), blank=True)
    farmaco2 = ArrayField(models.CharField(max_length=255, null=True), blank=True)
    tipo_interacao = models.CharField(max_length=255)
    descricao = models.TextField()

    def __str__(self):
        return self.tipo_interacao

    def __repr__(self):
        return self.__str__()
