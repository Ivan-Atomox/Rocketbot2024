# Control Ini
  
Este módulo permite criar, ler, modificar ou obter valores de um arquivo .ini  

*Read this in other languages: [English](Manual_ControlIni.md), [Português](Manual_ControlIni.pr.md), [Español](Manual_ControlIni.es.md)*
  
![banner](imgs/Banner_ControlIni.png o jpg)
## Como instalar este módulo
  
Para instalar o módulo no Rocketbot Studio, pode ser feito de duas formas:
1. Manual: __Baixe__ o arquivo .zip e descompacte-o na pasta módulos. O nome da pasta deve ser o mesmo do módulo e dentro dela devem ter os seguintes arquivos e pastas: \__init__.py, package.json, docs, example e libs. Se você tiver o aplicativo aberto, atualize seu navegador para poder usar o novo módulo.
2. Automático: Ao entrar no Rocketbot Studio na margem direita você encontrará a seção **Addons**, selecione **Install Mods**, procure o módulo desejado e aperte instalar.  


## Descrição do comando

### Novo Ini
  
Este comando cria um novo arquivo ini no caminho especificado.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Caminho onde o arquivo será localizado|Caminho onde o arquivo ini criado será localizado.|C:/Users/usuario/Desktop|
|Nome do arquivo ini|Nome do arquivo ini que será criado.|Nome do arquivo ini|

### Ler Ini
  
Este comando abre e lê o arquivo ini do caminho especificado.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Caminho do arquivo ini|Caminho do arquivo ini que será lido|C:/Users/User/Desktop/arquivo.ini|
|Variável|Variável onde o resultado da operação será armazenado|resultado|

### Obter Dado
  
Este comando obtém os dados da seção e os armazena em uma variável Rocketbot.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Seção|Seção onde os dados que desejamos obter estão localizados|SECTION|
|Dados|Nome dos dados que deseja obter|data|
|Variável|Variável onde o resultado da operação será armazenado|resultado|

### Obter todos os dados
  
Este comando obtém todos os dados da seção selecionada e os armazena em uma variável Rocketbot em formato de dicionário.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Seção|Seção onde os dados que queremos obter estão localizados|SECTION|
|Variável|Variável onde o resultado da operação será armazenado|resultado|

### Editar Dado
  
Este comando permite modificar o dado do ini aberto.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Seção|Seção onde os dados que desejamos editar estão localizados|SECTION|
|Dados|Dados que deseja editar.|data|
|Conteúdo|Novo conteúdo que o dado do ini terá.|Conteúdo da variável.|

### Adicionar Dado
  
Este comando adiciona um dado em uma seção indicada.
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Seção|Seção onde os dados que desejamos adicionar estarão localizados.|SECTION|
|Dados|Dados que deseja adicionar.|data|
|Conteúdo|Conteúdo da variável que será adicionada ao arquivo ini.|Conteúdo da variável.|
