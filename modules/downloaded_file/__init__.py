# coding: utf-8
"""
Base para desarrollo de modulos externos.
Para obtener el modulo/Funcion que se esta llamando:
     GetParams("module")

Para obtener las variables enviadas desde formulario/comando Rocketbot:
    var = GetParams(variable)
    Las "variable" se define en forms del archivo package.json

Para modificar la variable de Rocketbot:
    SetVar(Variable_Rocketbot, "dato")

Para obtener una variable de Rocketbot:
    var = GetVar(Variable_Rocketbot)

Para obtener la Opcion seleccionada:
    opcion = GetParams("option")


Para instalar librerias se debe ingresar por terminal a la carpeta "libs"
    
    pip install <package> -t .

"""
import os
import glob


"""
    Obtengo el modulo que fue invocado
"""
module = GetParams("module")

"""
    Obtengo variables
"""
if module == "getPathFile":
    latest_file = ''

    path = GetParams('path')
    extension = GetParams('extension')
    var_ = GetParams('result')
    print(var_)

    """
        Obtengo la ruta con y sin extensión
    """
    if path and var_:
        if not extension:
            if "\\" in path:
                path = path+'\\'+'*'
                print(path)
            if "/" in path:
                path = path+'/'+'*'

    if path and var_ and extension:
        if "\\" in path:
            path = path+'\\'+'*'+extension
            print(path)
        if "/" in path:
            path = path + '/' + '*' + extension

    list_of_files = glob.glob(path)
    if len(list_of_files) > 0:
        latest_file = max(list_of_files, key=os.path.getctime)
        print(r'' + latest_file, end="")
        latest_file = os.path.normpath(latest_file).replace('\\','/')
    else:
        print("Sin archivos", end="")

    SetVar(var_, latest_file)




