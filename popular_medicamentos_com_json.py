import os
import django
import json
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()
from medicamentos.models import Medicamento


def medicamento_existe(id_medicamento):
    resultado = Medicamento.objects.filter(id_medicamento__exact=id_medicamento)
    if not resultado:
        return False
    return True


def gerar_lista_diferencial_medicamentos(lista):
    try:
        lista_ids_medicamentos = list(map(lambda lista_temp: lista_temp['IdMedicamento'], lista))
        print('Total de medicamentos do arquivo: ' + str(len(lista_ids_medicamentos)))
        lista_existentes = Medicamento.objects.filter(id_medicamento__in=lista_ids_medicamentos)
        print('Total de medicamentos da lista existentes no banco: ' + str(len(lista_existentes)))

        if lista_existentes:
            lista_existentes = list(map(lambda lista_temp: lista_temp['id_medicamento'], lista_existentes.values('id_medicamento')))
            return list(set(lista_ids_medicamentos) - set(lista_existentes))

        return lista_ids_medicamentos
    except Exception as e:
        print(str(e))
        return list()


def inserir_medicamento(item):
    try:
        medicamento = Medicamento()
        medicamento.id_medicamento = item.get('IdMedicamento')
        medicamento.nome = item.get('Nome')
        medicamento.farmaco = item.get('Farmaco')
        medicamento.farmacos = item.get('Farmacos')
        medicamento.concentracao = item.get('Concentracao')
        medicamento.unidade = item.get('Unidade')
        medicamento.tipo_medicamento = item.get('TipoMedicamento')
        medicamento.forma_farmaceutica = item.get('FormaFarmaceutica')
        medicamento.via_administracao = item.get('ViaAdministracao')
        medicamento.codigo_atc = item.get('CodigoATC')
        medicamento.uso_interno = item.get('UsoInterno')
        medicamento.antimicromiano = item.get('Antimicrobiano')
        medicamento.bula = item.get('Bula')
        medicamento.portaria344 = item.get('Portaria344')
        medicamento.controle_especial = item.get('ControleEspecial')
        medicamento.tiss = item.get('TISS')
        medicamento.mip = item.get('MIP')
        medicamento.label = item.get('Label')
        medicamento.unificado = item.get('Unificado')
        medicamento.save()
    except Exception as e:
        print(item)
        raise Exception(e)

print('Verificando medicamentos inexistentes no banco...')
lista_medicamentos = json.loads(open('dados/medicamentos.json').read())
lista_items_inexistentes = gerar_lista_diferencial_medicamentos(lista_medicamentos)

if lista_items_inexistentes:
    print('Inserindo medicamentos inexistentes no banco...')
    for item in lista_medicamentos:
        id_medicamento = int(item.get('IdMedicamento'))
        if id_medicamento in lista_items_inexistentes:
            inserir_medicamento(item)
    print('Tabela de medicamentos populada com sucesso.')