## Desafio Gustavo Miranda

Para este desafio foram desenvolvidos o front-end em ReactJs e o backend usando NodeJs


## Backend
Para rodar o container do backend basta criar uma docker machine com o comando
```
docker-machine start default
```
E depois iniciar o container com o comando
```
docker-compose up -d
```
O passo a seguir é pegar o ip do container para colocarmos no frontend da aplicação. Para isso temos de rodar o comando:
```
docker-machine ip
```
Para rodar sem container, basta apenas dar o comando:
```
yarn && yarn start
```
## Frontend

Com o container do backend rodando devemos colocar o ip do container no arquivo /src/services/api.js substituindo o IP '192.168.99.100' pelo ip obtido no passo anterior.
```javascript
const api = axios.create({
    baseURL: 'http://192.168.99.100:3333/api/',
});
```
Para rodar o container do frontend basta rodar o comando.
```
docker-compose up -d
```

Para rodar sem container, basta apenas dar o comando:
```
yarn && yarn start
```

## Execução
A execução do frontend é possível observar no browser acessando o ip do container:3000.


ex: 192.168.99.100:3000