# Projeto Vitta Hiring

#### Premissas
- Capacidade de se recuperar de falhas sem perder mensagens 
- Objetos imutáveis
- Utilizar tecnologias não-bloqueantes
- Orientado à eventos
- Baixo tempo de resposta
- Baixo tempo de startup 

## Desenvolvimento
#### Requisitos para execução do projeto

- Gradle >= 4.0.0
- Configurar sua IDE para trabalhar com UTF-8
- Configurar sua IDE para trabalhar com lombok
    - O IntelliJ precisa do plugin do lombok
    - Dependendo da versão, é necessário ativar **Enable annotation processing** em `Settings>Build>Compiler>Annotation Processors`. 


#### Importar o projeto

2. Abrir o intelliJ e importar o projeto
    a. Marcar:
        - Use auto-import
        - Create directories for empty content roots automatically
        - Create separate module per source separate
        - Use local gradle distribution (coloque o path do seu gradle)

    b. Escolher *JVM 8*

#### Testes

Para executar testes unitários:

```bash
    ./gradlew test
```

#### Execução
Para executar o projeto localmente:

```bash
    ./gradlew bootRun
```

## Publicação (deploy)

#### Gerar o pacote

1. Executar o build

```bash
    ./gradlew clean build
```

2. O pacote foi gerado no diretório `./api/build/libs/api-<version>.jar`

3. Executar o pacote
```bash
    java -jar ./api/build/libs/api-<version>.jar
```

## Importante
