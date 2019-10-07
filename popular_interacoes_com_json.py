import os
import django
import json
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()
from medicamentos.models import Interacao


def interacao_existe(farmaco1, farmaco2, nome):
    resultado = Interacao.objects\
        .filter(farmaco1__iexact=farmaco1)\
        .filter(farmaco2__iexact=farmaco2)\
        .filter(nome__iexact=nome)
    if not resultado:
        return False
    return True


def inserir_interacao(item):
    try:
        interacao = Interacao()
        interacao.farmaco1 = item.get('Farmaco1')
        interacao.farmaco2 = item.get('Farmaco2')
        interacao.nome = item.get('Nome')
        interacao.descricao = item.get('Descricao')
        interacao.save()
    except Exception as e:
        print(item)
        raise Exception(e)


print('Verificando interacoes medicamentosas inexistentes no banco...')
lista_interacao = json.loads(open('dados/interacao_medicamentosa.json').read())
if not lista_interacao:
    print('Nenhuma interacao a ser adicionada.')
    quit()

print('Inserindo interacoes no banco... Total a ser inseridas: ' + str(len(lista_interacao)))
for item in lista_interacao:
        farmaco1 = item.get('Farmaco1')
        farmaco2 = item.get('Farmaco2')
        nome = item.get('Nome')
        if not interacao_existe(farmaco1, farmaco2, nome):
            inserir_interacao(item)

