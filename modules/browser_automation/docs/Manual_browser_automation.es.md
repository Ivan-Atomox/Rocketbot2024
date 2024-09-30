# browser_automation
  
Este modulo abre el navegador sin la alerta de que es automatizado. Útil para trabajar con extensiones, captcha y desktopRecorder  

*Read this in other languages: [English](Manual_browser_automation.md), [Português](Manual_browser_automation.pr.md), [Español](Manual_browser_automation.es.md)*
  
![banner](imgs/Banner_browser_automation.png)
## Como instalar este módulo
  
Para instalar el módulo en Rocketbot Studio, se puede hacer de dos formas:
1. Manual: __Descargar__ el archivo .zip y descomprimirlo en la carpeta modules. El nombre de la carpeta debe ser el mismo al del módulo y dentro debe tener los siguientes archivos y carpetas: \__init__.py, package.json, docs, example y libs. Si tiene abierta la aplicación, refresca el navegador para poder utilizar el nuevo modulo.
2. Automática: Al ingresar a Rocketbot Studio sobre el margen derecho encontrara la sección de **Addons**, seleccionar **Install Mods**, buscar el modulo deseado y presionar install.  


## Descripción de los comandos

### Abrir Navegador
  
Abre el navegador seleccionado.
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
|Navegador|Navegador que se desea usar.|Chrome|
|URL|Direccion a la cual se desea acceder.|https://rocketbot.com/es|
|Carpeta de perfil (Opcional)|Carpeta de perfil (dejar en blanco si se desea tomar la carpeta por default de rocketbot para pruebas).|C:/Users/Usuario/Desktop/perfil_navegador|
|Puerto (Optional)|Puerto en el cual se abrirá el navegador automatizado. (Opcional)|5002|
|Buscar puerto libre (Optional)|Buscar puerto libre en el cual se abrirá el navegador automatizado. (Opcional)|False|
|Activar características de accesibilidad|Activa las características de accesibilidad del navegador.|False|

### Cerrar Navegador
  
Cierra el navegador seleccionado.
|Parámetros|Descripción|ejemplo|
| --- | --- | --- |
| --- | --- | --- |
