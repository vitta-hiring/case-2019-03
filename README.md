## Sobre a Vitta

A Vitta é uma empresa de tecnologia em saúde. Com mais de cinco anos de existência, se tornou líder no mercado de prontuário eletrônico na nuvem. Através do ClinicWeb, voltado para o segmento médico, garante uma operação eficiente, redução de gastos e agilidade: tudo em uma só plataforma.

Aproximadamente 17 milhões de pacientes passaram pelo sistema que já transformou a rotina de mais de 10 mil profissionais da saúde. Além disso, o ClinicWeb é certificado pelo SBIS-CFM, o que comprova o mais rígido padrão de qualidade e segurança.

Por conta dessa confiança, a Vitta traz em seu portfólio de clientes, instituições de excelência no segmento como: Hospital Israelita Albert Einstein, Hospital do Coração (HCor) e a rede de Clínicas Oftalmológicas Lotten Eyes, além de extensa base de consultórios, localizados em todas as regiões brasileiras.

Seu time é formado por Vittanos, profissionais que trabalham firmes no que acreditam e que desejam não somente colocar a Vitta entre as melhores e maiores, mas sim torná-la definitivamente a MELHOR e MAIOR empresa de TECNOLOGIA EM SAÚDE DO BRASIL!

A Vitta mantém sedes em São Paulo e Uberlândia.

\#vemmudarasaudedobrasil


## Sobre o desafio

Atualmente existem muitos erros na prescrição médica, que por vezes podem levar a um agravamento no quadro clínico do paciente. Neste desafio você deve construir uma aplicação que irá ajudar médicos a evitarem erros, verificando e alertando sobre interações medicamentosas dos princípios ativos dos medicamentos.

A aplicação deve permitir que o usuário identifique o médico e o paciente sendo atendido e posteriormente a criação da prescrição de um ou mais medicamentos. Para cada medicamento é necessário informar seu nome, posologia e via de administração.

Ao identificar uma interação medicamentosa entre dois ou mais dos medicamentos escolhidos o médico deve receber um alerta da gravidade da interação, os fármacos envolvidos e a descrição. Também deve ser possível visualizar as prescrições anteriores, com data e a lista de medicamentos.

## Como executar

Acesse o diretorio raiz do projeto 
Execute docker-compose up -d
Acesse no navegador a aplicação pelo endereço http://localhost:8080
Obs: pode demorar alguns segundos para rodar as migrations dentro da api
     - Adicionei apenas alguns medicamentos e interaçoes, para validar a regra selecione o medicamento com id 28438 e 40812