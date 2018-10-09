## Front End Teste para Vitta (Desenvolvido com React / Webpack / Sass e Bootstrap)

## Para executar o projeto, faça um clone do repositório para a sua máquina.
## será necessário ter instalado em sua máquina o yarn (https://yarnpkg.com/lang/en/) ou node (npm - https://nodejs.org/en/) para executar o app.

Dentro do diretório em que foi clonado o projeto, utilizando o prompt de comando, executar o comando abaixo:

		yarn run start  
		
		ou 
		
		npm start start


		>> caso o navegador não abra após a compilação, digitar no browser localhost:8080

		O projeto também pode ser acessado no endereço abaixo:

		http://tested-shock.surge.sh/




## Sobre a Vitta

A Vitta é uma empresa de tecnologia em saúde. Com mais de três anos de existência, se tornou líder no mercado de prontuário eletrônico na nuvem. Através do ClinicWeb, voltado para o segmento médico, garante uma operação eficiente, redução de gastos e agilidade: tudo em uma só plataforma.

Aproximadamente 10 milhões de pacientes passaram pelo sistema que já transformou a rotina de mais de 10 mil profissionais da saúde. Além disso, o ClinicWeb é certificado pelo SBIS-CFM, o que comprova o mais rígido padrão de qualidade e segurança.

Por conta dessa confiança, a Vitta traz em seu portfólio de clientes, instituições de excelência no segmento como: Hospital Israelita Albert Einstein, Hospital do Coração (HCor) e a rede de Clínicas Oftalmológicas Lotten Eyes, além de extensa base de consultórios, localizados em todas as regiões brasileiras.

Seu time é formado por Vittanos, profissionais que trabalham firmes no que acreditam e que desejam não somente colocar a Vitta entre as melhores e maiores, mas sim torná-la definitivamente a MELHOR e MAIOR empresa de TECNOLOGIA EM SAÚDE DO BRASIL!

A Vitta mantém sedes em São Paulo e Uberlândia.

\#vemmudarasaudedobrasil


## Sobre o desafio

Atualmente existem muitos erros na prescrição médica, que por vezes podem levar a um agravamento no quadro clínico do paciente. Neste desafio você deve construir uma aplicação que irá ajudar médicos a evitarem erros, verificando e alertando sobre interações medicamentosas dos princípios ativos dos medicamentos.

A aplicação deve permitir que o usuário identifique o médico e o paciente sendo atendido e posteriormente a criação da prescrição de um ou mais medicamentos. Para cada medicamento é necessário informar seu nome, posologia e via de administração. 

Ao identificar uma interação medicamentosa o médico deve receber um alerta da gravidade contendo informações sobre os medicamentos envolvidos. Também deve ser possível visualizar as prescrições anteriores, com data e a lista de medicamentos.

## Considerações

- Caso o seu teste seja de front-end e você desenvolva atividades de back-end (ou vice-versa) terá pontos extras na avaliação;
- Serão avaliados a qualidade do código e capricho na organização, portanto esperamos que realize seu melhor trabalho!
- Você deverá enviar um e-mail para ti@vitta.me com quantos dias precisará para responder o teste. Leve em consideração que quanto maior o prazo solicitado, maior o rigor na avaliação. A pontualidade na entrega também será avaliada;
- O arquivo medicamentos.json possui uma coleção de medicamentos e os princípios ativos que fazem parte de sua composição. Os dados seguem o formato do exemplo abaixo, mas você pode modificar a estrutura no seu projeto se precisar:

```javascript
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
```
- O arquivo interacao_medicamentosa.json possui uma coleção de objetos que representam a interação medicamentosa entre os componentes dos medicamentos listados no arquivo anterior. Abaixo temos um exemplo do formato do objeto que também pode ter a estrutura modificada caso julgue necessário. 

```javascript
{
	"Farmaco1":"VORTIOXETINA",
	"Farmaco2":"CITALOPRAM",
	"Nome":"Grave",
	"Descricao":"O uso concomitante de vortioxetina e agentes serotonérgicos pode resultar em aumento do risco de síndrome serotoninérgica (hipertensão, hipertermia,mioclonia,alterações do estado mental)."
 }
```

## Front-end

### Pré-requisitos
- Desenvolvimento em Vue.js;
- Documentar como rodamos o projeto no README.MD;
- Dados deverão ser salvos em LocalStorage (No caso da implementação do Back-end isso não se faz necessário);
- Layout responsivo;
- Deve ser uma SPA;

### Diferenciais/Extras
- Desenvolvimento de um Dockerfile/Docker-Compose.yml para rodar o projeto;
- Criação de servidor para os mocks da tela;
- Usabilidade e feedback para o usuário no carregamento da consulta;
- Seguir algum Javascript Style Guide;
- Utilização de es2015;
- Utilização de padrões de projeto;
- Utilização de um pré-processador (Less, Sass, Stylus);
- Deve ser possível rodar a aplicação com um só comando.


## Back-end

### Pré-requisitos
- Desenvolvimento de uma API REST em Node.js;
- Documentar como rodamos o projeto no README.MD;
- Desenvolvimento de um Dockerfile/Docker-Compose.yml para rodar o projeto;
- Utilização de banco relacional;

### Diferenciais/Extras
- Resistência a falhas de containers na arquitetura desenvolvida;
- Implementação de Testes de unidade e/ou integração;
- Seguir algum Javascript Style Guide;
- Utilização de es2015;
- Utilização de padrões de projeto;
- Migrations e seeders;
- Deve ser possível rodar a aplicação com um só comando.

## Pronto para começar o desafio?

- Faça um "fork" deste repositório na sua conta do Github;
- Após completar o desafio, crie um pull request nesse repositório comparando a sua branch com a master com o seu nome no título deste;
- Envie um e-mail para ti@vitta.me notificando que a solução está entregue;
Analisaremos sua solução e entraremos em contato via e-mail.

## FAQ
> Posso utilizar algum tipo de boilerplate como vue-cli?

Sim qualquer tipo de boilerplate, manda bala o que vai valer é o seu código e como estruturou ele dentro do boilerplate;
> Preciso necessariamente fazer um fork do projeto?

Sim, desta forma utilizaremos isso para monitorar o tempo gasto desde o momento do fork até a entrega do projeto!

> Ainda tem dúvidas?

Mande um e-mail para ti@vitta.me e iremos respondê-lo o mais breve possível
