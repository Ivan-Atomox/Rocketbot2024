# Control Ini
  
Este módulo permite crear, leer, modificar u obtener valores de un archivo .ini  

*Read this in other languages: [English](Manual_ControlIni.md), [Português](Manual_ControlIni.pr.md), [Español](Manual_ControlIni.es.md)*
  
![banner](imgs/Banner_ControlIni.png)
## Como instalar este módulo
  
Para instalar el módulo en Rocketbot Studio, se puede hacer de dos formas:
1. Manual: __Descargar__ el archivo .zip y descomprimirlo en la carpeta modules. El nombre de la carpeta debe ser el mismo al del módulo y dentro debe tener los siguientes archivos y carpetas: \__init__.py, package.json, docs, example y libs. Si tiene abierta la aplicación, refresca el navegador para poder utilizar el nuevo modulo.
2. Automática: Al ingresar a Rocketbot Studio sobre el margen derecho encontrara la sección de **Addons**, seleccionar **Install Mods**, buscar el modulo deseado y presionar install.  


## Descripción de los comandos

### Nuevo Ini
  
Este comando crea un nuevo archivo ini en la ruta especificada.
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Ruta donde se ubicará el archivo|Ruta donde se ubicará el archivo ini creado.|C:/Users/usuario/Desktop|
|Nombre del archivo ini|Nombre del archivo ini que se creará.|Nombre del archivo ini|

### Leer Ini
  
Este comando abre y lee el archivo ini desde la ruta especificada.
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Ruta del archivo ini|Ruta del archivo ini que se leerá|C:/Users/User/Desktop/archivo.ini|
|Variable|Variable donde se almacenará el resultado de la operación|resultado|

### Obtener Dato
  
Este comando obtiene el dato de la sección y lo almacena en una variable de Rocketbot.
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Seccion|Seccion donde se encuentra el dato que deseamos obtener|SECTION|
|Dato|Nombre del dato que se desea obtener|data|
|Variable|Variable donde se almacenará el resultado de la operación|resultado|

### Obtener Todos los Datos
  
Este comando obtiene los datos de la sección y los almacena en una variable Rocketbot en formato diccionario.
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Seccion|Seccion donde se encuentran los que deseamos obtener|SECTION|
|Variable|Variable donde se almacenará el resultado de la operación|resultado|

### Modificar Dato
  
Este comando permite modificar el dato del ini abierto.
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Seccion|Seccion donde se encuentra el dato que deseamos editar|SECTION|
|Dato|Dato que se desea editar.|data|
|Contenido|Contenido nuevo que tendrá el dato del ini.|Contenido de la variable.|

### Añadir Dato
  
Este comando añade un dato en una sección indicada.
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Seccion|Seccion donde se ubicará el dato que deseamos agregar.|SECTION|
|Dato|Dato que se desea agregar.|data|
|Contenido|Contenido de la variable que se agregará al archivo ini.|Contenido de la variable.|
