# [Vitta - Prescrições](https://vitta.com.br/)

> Atualmente existem muitos erros na prescrição médica, que por vezes podem levar a um agravamento no quadro clínico do paciente. Neste desafio você deve construir uma aplicação que irá ajudar médicos a evitarem erros, verificando e alertando sobre interações medicamentosas dos princípios ativos dos medicamentos.

> Essa aplicação resolve a questões mencionada acima

> Nela utilizamos vue-router, vuex, webpack e diversos outros plugins e componentes

> O sistema de autenticação e persistência do usuário logado faz com que a aplicação funcione perfeitamente

> Mixins foram utilizados e são essenciais ao longo da aplicação

## :cloud: Frontend Build Setup

### para rodar a aplicação usando um unico comando (instalar dependências e executar em modo desenvolvedor)
`npm run go`
### instalar dependências
`npm install`
### serve com hot realod rodando em localhost:8081
`npm run dev`
### build para produção minificado
`npm run build`
### testes unitários
`npm run unit`
### executar e observer testes unitários
`npm run unit:watch`

## :cloud: Backend Build Setup

### Backend construído usando Node.js, JWT Authentication com JSONWebToken & Sequelize

> Banco de Dados: MySQL database


### Configuraçöes básicas (primeiro devemos fazer o build o back e depois do front)
```
npm install
```
docker stack deploy -c dockerMySQL.yml mysql
docker run --name mysql -e MYSQL_ROOT_PASSWORD=adonis -d mysql:latest
```
npm install
```

### Run
```
node server.js
```

Verificar e alertar sobre interações medicamentosas dos princípios ativos dos medicamentos:

Permitir que o usuário identifique o médico e o paciente sendo atendidos.

Criar a prescrição de um ou mais medicamentos. 

Informar nome, posologia e via de administração para cada medicamento.

Incluir data via backend.

Alertar o médico sobre a gravidade da interação quando houver uma interação medicamentosa entre dois ou mais dos medicamentos escolhidos, mostrando os fármacos envolvidos e a descrição.

Exibir as prescrições anteriores, com data e a lista de medicamentos.

```{
	"IdMedicamento":36385,
	"Nome":"RETAPAMULINA",
	"Farmaco":null,
	"Farmacos":["RETAPAMULINA"],
	"Concentracao":"10",
	"Unidade":"MG/G",
	"TipoMedicamento":"GENERICO",
	"FormaFarmaceutica":"POMADA DERMATOLOGICA",
	"ViaAdministracao":"TOP",
	"CodigoATC":"D06AX13",
	"UsoInterno":true,
	"Antimicrobiano":true,
	"Bula":"http://www.anvisa.gov.br/datavisa/fila_bula/frmVisualizarBula.asp?pNuTransacao=9442872014&pIdAnexo=2273137",
	"Portaria344":"",
	"ControleEspecial":false,
	"TISS":"510611203161218",
	"MIP":false,
	"Label":"RETAPAMULINA 10MG/G - POMADA DERMATOLOGICA",
	"Unificado":null
}

O arquivo interacao_medicamentosa.json possui uma coleção de objetos que representam a interação medicamentosa entre os componentes dos medicamentos listados no arquivo anterior. Abaixo temos um exemplo do formato do objeto que também pode ter a estrutura modificada caso julgue necessário.
{
	"Farmaco1": "VORTIOXETINA",
	"Farmaco2": "CITALOPRAM",
	"Nome": "Grave",
	"Descricao": "O uso concomitante de vortioxetina e agentes serotonérgicos pode resultar no aumento do risco de síndrome serotoninérgica (hipertensão, hipertermia,mioclonia,alterações do estado mental)."
}
```

Se o array inserido numa prescrição for igual a array dentro de um objeto interacao_medicamentosa, significa que essa prescrição poderá surtir efeitos colaterais.

CRUD usuario do sistema
CRUD medico
CRUD paciente
CRUD prescricao - contem uma lista de medicamentos para uma relacao unica entre medico e paciente
CRUD medicamento
CRUD interacao medicamentosa - conflito entre dois medicamentos, devemos exibir um alerta caso uma prescricao tenha esses dois medicamentos

#### CADASTRAR UM USUÁRIO
<a href="https://imgbb.com/"><img src="https://i.ibb.co/P49Nq1v/E5-BCB597-BDE2-4-D5-C-BD6-F-82-A266908864-4-5005-c.jpg" alt="E5-BCB597-BDE2-4-D5-C-BD6-F-82-A266908864-4-5005-c" border="0"></a>

#### CADASTRAR UM FÁRMACO
<a href="https://imgbb.com/"><img src="https://i.ibb.co/TPJhV3P/FC511272-EF84-4409-B6-DA-3-DD8-EBFCD1-F6-4-5005-c.jpg" alt="FC511272-EF84-4409-B6-DA-3-DD8-EBFCD1-F6-4-5005-c" border="0"></a>

#### CADASTRAR UMA INTERAÇÃO MEDICAMENTOSA
<a href="https://imgbb.com/"><img src="https://i.ibb.co/sj0qnjh/86352819-CC61-4803-8-D8-C-B807-BF8005-C3-4-5005-c.jpg" alt="86352819-CC61-4803-8-D8-C-B807-BF8005-C3-4-5005-c" border="0"></a>

#### CADASTRAR UMA PRESCRIÇÃO MÉDICA
<a href="https://imgbb.com/"><img src="https://i.ibb.co/tmSjZ2c/212-C6633-1-C03-4-E95-A355-BC550-BB7-BA4-C.jpg" alt="212-C6633-1-C03-4-E95-A355-BC550-BB7-BA4-C" border="0"></a>

#### DEMAIS ENDPOINTS
<a href="https://ibb.co/KzQmpRD"><img src="https://i.ibb.co/2YL51mS/CF062-B8-B-B904-44-FB-9075-0-C033-F5-D8-DF3-4-5005-c.jpg" alt="CF062-B8-B-B904-44-FB-9075-0-C033-F5-D8-DF3-4-5005-c" border="0"></a>

<a href="https://imgbb.com/"><img src="https://i.ibb.co/MGPRQQg/3658-A0-E7-F0-B5-4637-ADF3-748-AF8118-F9-F-4-5005-c.jpg" alt="3658-A0-E7-F0-B5-4637-ADF3-748-AF8118-F9-F-4-5005-c" border="0"></a>