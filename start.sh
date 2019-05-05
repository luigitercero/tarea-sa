#! bin/bash
docker run --rm --name taread -d -p 8081:3000 -e REPO=https://github.com/luigitercero/Practica2.git web-tarea 
#docker run --rm --name taread -d -p 8081:3000 -v /home/luigitercero/Documents/dockerbuild/serviciosSA/TareaV02/:/app -e REPO=https://github.com/luigitercero/EjemplosConR.git -it web-tarea bash 