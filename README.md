## Sobre o projeto

- Ajudar médicos a evitarem erros, verificando e alertando sobre interações medicamentosas dos princípios ativos dos medicamentos.


## Passo a passo

Docker:
	- Criação de um container Postgres no Docker
		$ docker run --name desafiovitta -e POSTGRES_PASSWORD=vitta -p 5435:5432 -d postgres:11
	
	- Usando o Postbird ou algum software de gerenciamento de banco, criar a database desafiovitta.
	
	
Node:
	- Para iniciar o server:
		yarn dev
		
	- Dentro da pasta config, alterar o host no arquivo database.js para o endereço do seu Docker.
	
	- Para criar as tabelas no banco:
		yarn sequelize db:migrate
		
JWT:
	- Foi utilizado um gerador de token para autenticação no projeto, usando como palavra chave o hash da MD5 abaixo:
		The MD5 hash for desafiovitta is : 0f35074a1d12011b0bbad506fbe64528

## Considerações

- Encontrei dificuldade em fazer a inserção dos dados fornecidos (interacao_medicamentosa.json e medicamentos.json) para a base de dados,
	dessa forma o desafio será entregue apenas com as API's de Usuario, Paciente e Sessão (User, Patient and Session)
