# Contenedor automatico

el proyecto crea una imagen para que en una pagina web pueda descargase un repositorio zip

Se debe crear un entorno de trabajo para evitar perder el tiempo en acutalizaciones repetitivas o instalaciones.

Las tecnologia a utilizar son
* git
* zip
* node

creamos nuestro primer dockerfile

```
FROM node

RUN apt-get update 
RUN apt-get install git -y
RUN apt-get install zip -y
```

para crear la imagen se utiliza el comando 

```
docker build -t [nombre] [ubicacion]

```
queda algo como esto

```
docker build -t tarea .
```
se crea una imagen acutalizada con nodejs git y zip

ahora para desarrollar se crea una nueba imagen, esto con el fin de hacer pruebas y no volver a construir el contenedor desde 0

````
FROM tarea
# Set the working directory to /app
WORKDIR /app/
# Copy the current directory contents into the container at /app
ADD . /app
EXPOSE 80
# Define environment variable
ENV NAME="repo"
CMD [ "bash","createZip.sh" ]
````

esta imagen se contruye en funcion de la imagen creada anteriormente(CMD es un comando que se ejecuta al encender el contenedor)

una vez creado se puede trababajar en un ambiente de desarrollo 
```
#docker run --rm --name [nombreProceso] -p [puertohots]:[puertoDocker] -v [dirHost]:[dirDocker] -e REPO=https://github.com/luigitercero/EjemplosConR.git -it [imagen] bash 
```
*  rm: es un comando que borra el contenedor una vez sea detenido
* name: es el nombre de como se identificará el contenedor
* -p: es un mapeo de puertos de la host al container
* -v es el mapeo de un directorio local a un contenedor
* -e: es una variable global que se le agraga al sistema
* -it: es para poder ejectura una terminal bash o /bin/bash

quedaria asi 

```
#docker run --rm --name taread -p 8081:3000 -v /home/luigitercero/Documents/dockerbuild/serviciosSA/TareaV02/:/app -e REPO=https://github.com/luigitercero/EjemplosConR.git -it web-tarea bash 
```
entonces podriamos trabajar en nuestra maquina host desde un ide y ejecutar la consola de nuestro contenedor al mismo tiempo

al crear esto se crea un simple servicio con node y express incializando un proyecto en node, al finalizar se levanta el servidor de node
```
npm init 
```
creamos el proyecto, luego  creamos un archivo index.js en el repositorio se encuentra archivo index.js
ejecutamos el comando
```
node index.js
```
luego es abrir el navegador y dirigirnos a localhost:8081

una vez finalizado el la tarea podemos manejarlo todo en el orquestador 
creando un archivo docker-composer.yml
```
version: "3"
services:
  Tarea:
    container_name: taread
    image: luigitercero/tareita:01
    environment:
      REPO: https://github.com/luigitercero/Practica2.git
    ports:
      - 8080:3000
```

y con el comando up docker composer podemos levantar el servicos

```
docker-composer up
```
y para detener
```
docker-composer down
```
