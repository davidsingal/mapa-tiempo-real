#Demo de mapa en tiempo real

Demo desarrollada para [#mejorandocurso](https://twitter.com/search?q=%23mejorandocurso&src=hash "Generación Mejorandola") con la intención de enseñar cómo hacer aplicaciones basadas en mapas utilizando la tecnología del "Real Time" o tiempo real.

El código está bien comentado y espero que bien explicado, en caso de dudas, no dudéis en comentarmelo (@davidsingal) o abrir un "Issue", encantado estaré de responderos.


##Librerías utilizadas

1.	[Node Js](http://nodejs.org/)
2.	[Express Js](http://expressjs.com/)
3.	[Socket IO](http://socket.io/)
4.	[Leaflet Js](http://leafletjs.com/)


##Requisitos

1.	Tener instalado Node, podéis descargaroslo desde aquí: [http://nodejs.org/download/](http://nodejs.org/download/)
2.	Tener instalado y configurado Github, hay montones de tutoriales y vídeos, dejo un enlace de todas formas: [http://git-scm.com/book/es/Empezando-Instalando-Git](http://git-scm.com/book/es/Empezando-Instalando-Git)


##¡Empezamos!
###1. Descarga el código
Tenemos dos formas de descargarnos el proyecto:

####Git
Recuerda que debes tener instalado y configurado Git.

1.	Abrimos la consola o terminal.
2.	Nos vamos a la ruta donde queramos guardar el proyecto.
3.	Ejecutamos el siguiente codigo

	`git clone git@github.com:davidsingal/mapa-tiempo-real.git`
	
	Esto creará una carpeta llamada mapa-tiempo-real con todo el proyecto.
	
####Zip
1.	Simplemente dale al botón de 'ZIP' que tienes arriba.
2.	Descomprimelo en la carpeta donde desees guardar el proyecto.


###Instalación
Recuerda que para este paso debes tener instalado Node Js. Para instalar tenemos que entrar en la carpeta donde está el proyecto, en nuestro ejemplo seria /mapa-tiempo-real, y ejecutamos:

	npm install


###Comenzar aplicación
El siguiente código creara un servidor web en [http://localhost:5000](http://localhost:5000):

	node app


##Agradecimientos

[@mikenieva](https://twitter.com/mikenieva)

[@cvander](https://twitter.com/cvander)