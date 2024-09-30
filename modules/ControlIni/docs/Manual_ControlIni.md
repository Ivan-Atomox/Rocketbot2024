# Control Ini
  
This module allows you to create, read, modify or get values from a .ini file  

*Read this in other languages: [English](Manual_ControlIni.md), [Português](Manual_ControlIni.pr.md), [Español](Manual_ControlIni.es.md)*
  
![banner](imgs/Banner_ControlIni.png)
## How to install this module
  
To install the module in Rocketbot Studio, it can be done in two ways:
1. Manual: __Download__ the .zip file and unzip it in the modules folder. The folder name must be the same as the module and inside it must have the following files and folders: \__init__.py, package.json, docs, example and libs. If you have the application open, refresh your browser to be able to use the new module.
2. Automatic: When entering Rocketbot Studio on the right margin you will find the **Addons** section, select **Install Mods**, search for the desired module and press install.  


## Description of the commands

### New Ini
  
This commands creates a new ini file in the specified path.
|Parameters|Description|example|
| --- | --- | --- |
|Path where the file will be located|Path where the created ini file will be located.|C:/Users/user/Desktop|
|Name Ini file|Name of the ini file that will be created.|Ini file name|

### Read Ini
  
This command opens and reads the ini file from the specified path.
|Parameters|Description|example|
| --- | --- | --- |
|Path of the ini file|Path of the ini file that will be read|C:/Users/User/Desktop/file.ini|
|Variable|Variable where the result of the operation will be stored|result|

### Get Data
  
This command gets the data from the section and store it in a Rocketbot variable.
|Parameters|Description|example|
| --- | --- | --- |
|Section|Section where the data we want to obtain is located|SECTION|
|Data|Name of the data that wants to be obtained|data|
|Variable|Variable where the result of the operation will be stored|result|

### Get All Data
  
This command gets the all data from the selected section and stores it in a Rocketbot variable in a dictionary format.
|Parameters|Description|example|
| --- | --- | --- |
|Section|Section where the data we want to obtain are located|SECTION|
|Variable|Variable where the result of the operation will be stored|result|

### Edit Data
  
This command allows you to modify the data of the open ini.
|Parameters|Description|example|
| --- | --- | --- |
|Section|Section where the data we want to edit is located|SECTION|
|Data|Data that wants to be edited.|data|
|Content|New content that the ini data will have.|Content of the variable.|

### Add Data
  
This command adds a data in a section indicated.
|Parameters|Description|example|
| --- | --- | --- |
|Section|Section where the data we want to add will be located.|SECTION|
|Data|Data that wants to be added.|data|
|Content|Content of the variable that will be added to the ini file.|Content of the variable.|

