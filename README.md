## Vitta Project

## Description

This application is an example of what an API in NodeJS is capable of and was produced to meet the demands requested in the presentation test to Vitta company, which is a company that aims to integrate technology and health in the best possible way.

## Deploy the Application

### Execution in real time - server-side

You can run the application locally using the command below:
```shell
$ docker run kalleodocker/vitta:api
```

After executing the command the application will run using the default port


If it is in the default set the System will run in:
[`http://localhost:3000`](http://localhost:3000).

It is also possible to run the application on HOST and different port, using the command below:
```shell
docker run -it -p 3001:3001 kalleodocker/vitta:client
```

### Execution in real time - client-side

You can run the application locally using the command below:
```shell
$ docker run kalleodocker/vitta:client
```

After executing the command the application will run using the default port


If it is in the default set the System will run in:
[`http://localhost:3001`](http://localhost:3001).

It is also possible to run the application on HOST and different port, using the command below:
```shell
docker run -it -p 3001:3001 kalleodocker/vitta:client
```

Developed by ** Kalléo Pinheiro **
