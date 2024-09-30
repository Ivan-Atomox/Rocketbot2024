# Rocketbot Xperience
  
Módulo para trabajar con formularios de Rocketbot Xperience  

*Read this in other languages: [English](Manual_Xperience.md), [Português](Manual_Xperience.pr.md), [Español](Manual_Xperience.es.md)*
  
![banner](imgs/Banner_Xperience.jpg)
## Como instalar este módulo
  
Para instalar el módulo en Rocketbot Studio, se puede hacer de dos formas:
1. Manual: __Descargar__ el archivo .zip y descomprimirlo en la carpeta modules. El nombre de la carpeta debe ser el mismo al del módulo y dentro debe tener los siguientes archivos y carpetas: \__init__.py, package.json, docs, example y libs. Si tiene abierta la aplicación, refresca el navegador para poder utilizar el nuevo modulo.
2. Automática: Al ingresar a Rocketbot Studio sobre el margen derecho encontrara la sección de **Addons**, seleccionar **Install Mods**, buscar el modulo deseado y presionar install.  


## Descripción de los comandos

### Login NOC
  
Inicie sesión en NOC utilizando unda de las opciones, API Key, archivo noc.ini o credenciales.
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|URL Servidor|URL del servidor a donde se conecta|https://roc.myrb.io/|
|Seleccione un metodo para conectarse al Orquestador|Opciones para iniciar sesión en R.O.C, se puede usar las credenciales del usuario, API Key o seleccionando archivo noc.ini|API Key|
|Asignar resultado a Variable|Variable donde se almacenara el estado de la conexion, devuelve True si es exitosa o False en el caso contrario|Variable|

### Obtener cola de trabajo de Forms
  
Obtiene las colas de trabajo
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Form Token|Form Token|8YWUW8AXAV3UPNKY|
|Asignar a variable|Variable donde guardar resultado sin {}|var|

### Obtener datos de Forms
  
Obtener datos de formulario de la cola de trabajo
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|ID cola de trabajo|ID de la cola de trabajo|1|
|Form Token|Token del formulario|8YWUW8AXAV3UPNKY|
|Asignar a variable|Variable donde guardar resultado sin {}|var|

### Descarga archivo
  
Descarga un archivo subido a un formulario
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|ID cola de trabajo|ID de la cola de trabajo|1|
|Archivo|Variable que tiene la ruta del archivo del formulario|archivo.pdf|
|Guardar archivo en|Ruta donde se guardará el archivo|C:\Rocketbot\file.ini|

### Actualizar estado de la cola Form
  
Cambia el estado de la cola
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Estado|Seleccione el estado de la cola|Done|
|ID cola de trabajo|Ingrese el ID de la cola de trabajo|1|
|Asignar a variable|Nombre de variable sin {} donde se guardara el resultado|variable|

### Devolver Mensaje a Xperience
  
Devuelve un mensaje al formulario Xperience
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Token Xperience|Token de Xperience|{xperience}|
|Mensaje a devolver|Mensaje a devolver|Este es un mensaje|
