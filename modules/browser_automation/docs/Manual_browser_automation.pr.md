# browser_automation
  
Este módulo abre o navegador sem o alerta de que é automatizado. Útil para trabalhar com extensões, captcha e desktopRecorder  

*Read this in other languages: [English](Manual_browser_automation.md), [Português](Manual_browser_automation.pr.md), [Español](Manual_browser_automation.es.md)*
  
![banner](imgs/Banner_browser_automation.png o jpg)
## Como instalar este módulo
  
Para instalar o módulo no Rocketbot Studio, pode ser feito de duas formas:
1. Manual: __Baixe__ o arquivo .zip e descompacte-o na pasta módulos. O nome da pasta deve ser o mesmo do módulo e dentro dela devem ter os seguintes arquivos e pastas: \__init__.py, package.json, docs, example e libs. Se você tiver o aplicativo aberto, atualize seu navegador para poder usar o novo módulo.
2. Automático: Ao entrar no Rocketbot Studio na margem direita você encontrará a seção **Addons**, selecione **Install Mods**, procure o módulo desejado e aperte instalar.  


## Descrição do comando

### Abrir Navegador
  
Abre o navegador selecionado
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
|Navegador|Navegador que deseja usar.|Chrome|
|URL|URL para acessar.|https://rocketbot.com/pr|
|Pasta de perfil (Opcional)|Pasta de perfil (deixe em branco para usar a pasta padrão do rocketbot para testes).|C:/Users/Usuário/Desktop/perfil_navegador|
|Porta (Opcional)|Porta em que o navegador automatizado será aberto. (Opcional)|5002|
|Procurar porta livre (Opcional)|Procurar por uma porta livre para abrir o navegador automatizado. (Opcional)|False|
|Ativar recursos de acessibilidade|Ativa os recursos de acessibilidade do navegador.|False|

### Fechar Navegador
  
Fecha o navegador selecionado
|Parâmetros|Descrição|exemplo|
| --- | --- | --- |
| --- | --- | --- |
