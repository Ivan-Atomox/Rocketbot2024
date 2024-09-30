# Rocketbot Xperience
  
Modulo para trabalhar com formulários do Rocketbot Xperience  

*Read this in other languages: [English](Manual_Xperience.md), [Português](Manual_Xperience.pr.md), [Español](Manual_Xperience.es.md)*
  
![banner](imgs/Banner_Xperience.jpg)
## Como instalar este módulo
  
Para instalar o módulo no Rocketbot Studio, pode ser feito de duas formas:
1. Manual: __Baixe__ o arquivo .zip e descompacte-o na pasta módulos. O nome da pasta deve ser o mesmo do módulo e dentro dela devem ter os seguintes arquivos e pastas: \__init__.py, package.json, docs, example e libs. Se você tiver o aplicativo aberto, atualize seu navegador para poder usar o novo módulo.
2. Automático: Ao entrar no Rocketbot Studio na margem direita você encontrará a seção **Addons**, selecione **Install Mods**, procure o módulo desejado e aperte instalar.  


## Descrição do comando

### Login NOC
  
Faça login no NOC usando uma das opções, arquivo noc.ini, API Key ou credenciais.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|URL Servidor|URL do servidor para se conectar|https://roc.myrb.io/|
|Selecione um método para se conectar ao orquestrador|Opções para fazer login no R.O.C, você pode usar credenciais de usuário, chave de API ou selecionar o arquivo noc.ini|API Key|
|Atribuir resultado à variável|Variável onde será armazenado o estado da conexão, retorna True se for bem sucedida ou False caso contrário|Variable|

### Obter fila de trabalho de Formulários
  
Obtém as filas de trabalho
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Form Token|Form Token|8YWUW8AXAV3UPNKY|
|Definir como variável|Variável para guardar resultado sem {}|var|

### Obter dados de Formulários
  
Obter dados de formulário da fila de trabalho
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|ID da fila de trabalho|ID da fila de trabalho|1|
|Form Token|Form Token|8YWUW8AXAV3UPNKY|
|Definir como variável|Variável para guardar resultado sem {}|var|

### Baixar arquivo
  
Baixe um arquivo enviado em um formulário
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|ID da fila|ID da fila|1|
|Arquivo|Variável que contém o caminho do arquivo do formulário|arquivo.pdf|
|Salvar arquivo em|Caminho onde o arquivo será salvo|C:\Rocketbot\file.ini|

### Atualizar estado da fila Form
  
Mudar o estado da fila
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Estado|Selecione o estado da fila|Done|
|ID da fila de trabalho|Insira o ID da fila de trabalho|1|
|Atribuir a variável|Nome da variável sem {} onde o resultado será salvo|variable|

### Return Message to Xperience
  
Returns a message to the Xperience form
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Xperience Token|Xperience Token|{xperience}|
|Message to return|Message to return|This is a message|
