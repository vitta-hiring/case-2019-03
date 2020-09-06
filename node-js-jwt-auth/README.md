# Node.js – JWT Authentication & Authorization example with JSONWebToken & Sequelize

For more detail, please visit:
> [Node.js JWT Authentication & Authorization example](https://bezkoder.com/node-js-jwt-authentication-mysql/)

> [Deploying/Hosting Node.js app on Heroku with MySQL database](https://bezkoder.com/deploy-node-js-app-heroku-cleardb-mysql/)

Working with Front-end:
> [Vue.js JWT Authentication with Vuex and Vue Router](https://bezkoder.com/jwt-vue-vuex-authentication/)

> [Angular 8 JWT Authentication with HttpInterceptor and Router](https://bezkoder.com/angular-jwt-authentication/)

> [Angular 10 JWT Authentication with HttpInterceptor and Router](https://bezkoder.com/angular-10-jwt-auth/)

> [React JWT Authentication & Authorization (without Redux) example](https://bezkoder.com/react-jwt-auth/)

> [React Redux JWT Authentication & Authorization example](https://bezkoder.com/react-redux-jwt-auth/)

## Project setup
```
npm install
```
docker swarm init   
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

{
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
	"Descricao": "O uso concomitante de vortioxetina e agentes serotonérgicos pode resultar em aumento do risco de síndrome serotoninérgica (hipertensão, hipertermia,mioclonia,alterações do estado mental)."
}

CRUD usuario do sistema
CRUD medico
CRUD paciente
CRUD prescricao - contem uma lista de medicamentos para uma relacao unica entre medico e paciente
CRUD medicamento
CRUD interacao medicamentosa - conflito entre dois medicamentos, devemos exibir um alerta caso uma prescricao tenha esses dois medicamentos

Os alertar devem ter um layout compatível com sua nivel de gravidade

Fármaco: Fármaco, de acordo com a Agência Nacional de Vigilância Sanitária – Anvisa, é a principal substância da formulação do medicamento, responsável pelo efeito terapêutico. Fármaco também é um composto químico obtido por extração, purificação, síntese ou semi-síntese. São os fármacos que dão origem aos medicamentos, sendo o princípio ativo da forma terapêutica.  

Medicamento: Medicamento é o produto farmacêutico, tecnicamente obtido ou elaborado com finalidade profilática, curativa, paliativa ou para fins de diagnóstico. A definição legal deixa claro o papel fundamental desse produto, que previne doenças, mantém e recupera a saúde e alivia sintomas. Por isso o Idec entende que medicamentos não podem ser vistos como bens comuns, de uso ordinário, e sim como produtos essenciais.