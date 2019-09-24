## Sobre a Vitta

A Vitta nasceu com a missão de transformar a saúde do Brasil. Em poucos anos se tornou uma das maiores startups de health tech no mercado, e mesmo com o crescimento, mantemos em nosso DNA a inovação, a experiência, a praticidade e a segurança. 
Desde então temos trabalhado para construir nossa marca e cultura a fim de desenvolver um produto altamente eficiente, capaz de revolucionar a saúde no nosso país. 
Além das melhores soluções de tecnologia e atendimento excepcional voltadas ao mercado de saúde, contamos também com as melhores pessoas, os nossos Vittanos. 

Nossos valores:
- Guerreiros por natureza; 
- Vencemos em time;
- O cliente é a nossa vida;
- Excelência inegociável.

Estamos procurando pessoas interessadas em atuar em projetos desafiadores, dispostas a revolucionar a saúde do Brasil junto com a gente. 

A Vitta mantém sedes em São Paulo e Uberlândia.

\#vemmudarasaudedobrasil #saudenonstop


## Sobre o desafio

Atualmente existem muitos erros na prescrição médica, que por vezes podem levar a um agravamento no quadro clínico do paciente. Neste desafio você deve construir uma aplicação que irá ajudar médicos a evitarem erros, verificando e alertando sobre interações medicamentosas dos princípios ativos dos medicamentos.

A aplicação deve permitir que o usuário identifique o médico e o paciente sendo atendido e posteriormente a criação da prescrição de um ou mais medicamentos. Para cada medicamento é necessário informar seu nome, posologia e via de administração.

Ao identificar uma interação medicamentosa entre dois ou mais dos medicamentos escolhidos o médico deve receber um alerta da gravidade da interação, os fármacos envolvidos e a descrição. Também deve ser possível visualizar as prescrições anteriores, com data e a lista de medicamentos.

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
- Desenvolvimento utilizando um framework/biblioteca de componentização (Vue,React,Angular);
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
- Deve ser possível rodar a aplicação com um só comando;
- Desenvolvimento utilizando Vue.js.


## Back-end

### Pré-requisitos
- Desenvolvimento de uma API REST;
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
- Deve ser possível rodar a aplicação com um só comando;
- Desenvolvimento utilizando Node.js.

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
