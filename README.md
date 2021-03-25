### `SR. pago javascript test`
Reserva de películas en tu ciudad, Node api.

### `Descripcion`
El proyecto consta de los siguientes elementos importantes:

- Se utilizo Node.js + Express para construir los endpoints
- Se uso mySQL como base de datos en google cloud.
- Se uso JWT para la autenticación de los usuarios.
- Se utilizó jest para prueba en los endpoints del API.
- Se Documentó y probo el API utilizando Postman, Mista herramienta que ayudo a generar la [siguiente documentación](https://documenter.getpostman.com/view/3800366/TzCHBAhu).
- Se desplego el API en un serverless con Cloud Run.
- Se integró Google Cloud Build para el despliegue de la aplicación conectada al repositorio en Github.


### `Uso`
1.- Ya que se cuenta con la [documentación](https://documenter.getpostman.com/view/3800366/TzCHBAhu) publica del API, se puede utilizar la misma para realizar peticiones al api por medio de cualquier front o herramienta.

2.- Se puede Descargar el archivo Sr-pago-postman_collection.json (ubicado en la raíz de este repositorio), que es un archivo generado con Postman, Dicho archivo se puede importar en postman y estarán configurados todos los endpoints para su ejecución.

### `Flujo`
Para que el API pueda funcionar correctamente, se recomienda seguir el siguiente flujo:

- 1.- Registro de usuario.
- 2.- Inicio de sesión para copiar el token.
- 3.- Consultar las películas por ciudad [MEXICO, USA, ARGENTINA, COLOMBIA].
- 4.- Consultar el detalle de alguna película (esto nos traerá las funciones, showtimes)
- 5.- Reservar una función. (se envía el id de la película que nos interesó junto al id del horario que viene del detalle)
- 6.- Consultar Mis funciones de película para garantizar que la reserva funciona correctamente.

### `Sobre mi`
Puedes conocer un poco más sobre mí en este [enlace](https://nue.com.mx/vicente).
