from django.db import models


class Interacao(models.Model):
    farmaco1 = models.CharField(max_length=255)
    farmaco2 = models.CharField(max_length=255)
    nome = models.CharField(max_length=255)
    descricao = models.TextField()

    def __str__(self):
        return self.nome

    def __repr__(self):
        return self.__str__()
