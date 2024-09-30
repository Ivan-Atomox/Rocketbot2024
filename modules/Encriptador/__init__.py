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
from cryptography.fernet import Fernet
import os

"""
    Obtengo el modulo que fueron invocados
"""
module = GetParams("module")

"""
    Resuelvo catpcha tipo reCaptchav2
"""
if module == "nuevoKey":
    # Modulo Crear Key
    ruta = GetParams('content')
    nombrekey = GetParams('idnombrekey')
    
    key = Fernet.generate_key()
    archivo = ruta+"\\"+nombrekey+".key"

    file = open(archivo, "wb")
    file.write(key)
    file.close

if module == "encriptarVar":
    # Modulo para encryptar el contenido de una variable
    ruta = GetParams('content')
    var = GetParams('idVar')
    varEncript = GetParams('idVarEncript')

    try:
        file = open(ruta, 'rb')
        key = file.read()
        file.close()

        contenido = GetVar(var)
        contenido = contenido.encode()
        f = Fernet(key)
        codificado = f.encrypt(contenido)
        SetVar(varEncript, codificado)
    except Exception as e:
        print("\x1B[" + "31;40mError\u2193\x1B[" + "0m")
        PrintException()
        raise e

if module == "decriptarVar":
    # Modulo para decryptar el contenido de una variable
    ruta = GetParams('content')
    var = GetParams('idVar')
    varDecript = GetParams('idVarDecript')

    try:
        file = open(ruta, 'rb')
        key = file.read()
        file.close()

        contenido = GetVar(var)
        contenido = str(contenido)
        f = Fernet(key)
        desencriptado = f.decrypt(eval(contenido))
        SetVar(varDecript, desencriptado.decode())

    except Exception as e:
        print("\x1B[" + "31;40mError\u2193\x1B[" + "0m")
        PrintException()
        raise e
    
if module == "encriptarArchivo":
    # Modulo to encrypt files
    rutaKey = GetParams('content')
    rutaFile = GetParams('file')
    rutaEncryp = GetParams('fileEnc')
    varEncript = GetParams('res')
    filename = GetParams('filename')
    
    try:
        # Opening the key
        with open(rutaKey, 'rb') as filekey:
            key = filekey.read()

        # Using key
        fernet = Fernet(key)
        
        # Open original file to encrypt
        with open(rutaFile, 'rb') as file:
            original = file.read()
        ext_ = os.path.splitext(rutaFile)
        print(ext_)
        # Encrypt file
        encrypted = fernet.encrypt(original)
        
        if rutaEncryp:
            if filename:
                rutaEncryp = os.path.join(rutaEncryp, filename + ext_[-1])
            else:
                raise Exception ("Must give a valid filename.")
            
            with open(rutaEncryp, 'wb') as encrypted_file:
                encrypted_file.write(encrypted)
        else:
            # Opening the original file in write mode and writing the encrypted data
            with open(rutaFile, 'wb') as encrypted_file:
                encrypted_file.write(encrypted) 
        
        SetVar(varEncript, True)
    except Exception as e:
        SetVar(varEncript, False)
        print("\x1B[" + "31;40mError\u2193\x1B[" + "0m")
        PrintException()
        raise e

if module == "desencriptarArchivo":
    # Modulo to decrypt files
    rutaKey = GetParams('content')
    rutaEncryp = GetParams('fileEnc')
    rutaFile = GetParams('file')
    varEncript = GetParams('res')
    filename = GetParams('filename')

    try:
        # Opening the key
        with open(rutaKey, 'rb') as filekey:
            key = filekey.read()

        # Using key
        fernet = Fernet(key)
        
        # Open encrypted file
        with open(rutaEncryp, 'rb') as encrypted_file:
            encrypted = encrypted_file.read()
        ext_ = os.path.splitext(rutaEncryp)
        # Decrypt file
        decrypted  = fernet.decrypt(encrypted)
        
        if rutaFile:
            if filename:
                rutaFile = os.path.join(rutaFile, filename + ext_[-1] )
            else:
                raise Exception ("Must give a valid filename.")
            
            with open(rutaFile, 'wb') as dec_file:
                dec_file.write(decrypted)
        else:
            # Opening the encryptedfile in write mode and writing the decrypted data
            with open(rutaEncryp, 'wb') as dec_file:
                dec_file.write(decrypted) 
        
        SetVar(varEncript, True)
    except Exception as e:
        SetVar(varEncript, False)
        print("\x1B[" + "31;40mError\u2193\x1B[" + "0m")
        PrintException()
        raise e