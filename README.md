# demo-react-node

Prueba Tecnica Daniel Flores.

1. Base de datos

Este repositorio incluye el archivo "postgresql-query.sql" para la creación de las tablas 
en postgresql. para efecto prácticos se incluyeron en los archivos .env que posee la conexión a
una base de datos online. ya queda a criterio si se cambia y se ajusta el .env en demo-api

2. Ejecucion de proyecto. 

El proyecto viene preparado para levantarse por medio de docker, por lo que solo debe ejecutar
el siguiente comando en la raíz de este proyecto. "docker-compose up"

El sitio se desplegara en http://localhost

3. Acceso al sitio Demo.

Para ingresar al sitio solo se puede hacerse por medio de usuario y contraseña, si se conectara 
con la db por defecto se disponen de los siguientes usuarios: 

    - Administrador: admin@gmail.com --> 797940
    - Empleado: user@gmail.com --> 797941

Si se desea crear un usuario nuevo o se asocio a una nueva base de datos, se debe crear el usuario por medio de postman, a continuación se proporciona la petición y el body. 
** Nota: la contraseña por defecto será el numero de documento del usuario (Se encripta aparte)

    - METODO POST: http://localhost:3000/api/auth/users/create
    - BODY: 
            {
            "documentNumber": "797950",
            "name": "Usuario Demo",
            "email": "demo@gmail.com",
            "role": "Empleado"
            }
