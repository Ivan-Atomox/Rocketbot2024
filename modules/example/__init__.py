# pylint: disable-all
# coding: utf-8
"""
Template for external module development.
To get the command name executed, use:
    module = GetParams("module") # It will return the name of the command executed.

To get the content of the input filled by the user, use:
    var = GetParams(variable)
    The "variable" is defined in forms of the package.json file.

To modify a Rocketbot variable:
    SetVar("NameOfVariable", value)


To install libraries you must enter via terminal to the "modules/{module_name}/libs" folder
and execute the following command:
    
   pip install <package> -t .

This will install the library in the module folder, and then you must include the following lines in the __init__.py file:

    import sys
    import os
    
    BASE_PATH = tmp_global_obj["basepath"] # get the base path of the Rocketbot installation
    module_path = os.path.join(BASE_PATH, 'modules', '{module_name}', 'libs') # get the path of the module
    if module_path not in sys.path:
        sys.path.append(module_path)

Then you can use the library normally in the module.

    import library

"""
# import native libraries
import sys
import os

BASE_PATH = tmp_global_obj["basepath"] # get the base path of the Rocketbot installation
module_path = os.path.join(BASE_PATH, 'modules', 'example', 'libs') # get the path of the module
if module_path not in sys.path:
    sys.path.append(module_path)

from pymsgbox import alert


# First, we need to get the name of the command executed. In the packages.json file, in the line 169, we have the following:
#     "module": "example_view"
# That means that the command with title 'View example' has the name 'example_view'.
# If the user executes the command 'View example', the variable 'module' will have the value 'example_view'.
module = GetParams("module") # module = example_view

# Now we can use the variable 'module' to execute the code that corresponds to the command executed.
if module == "example_view":
    # GetParams also allows you to get the content of the inputs filled by the user.
    input_1 = GetParams("input_1") # input_1 is the id of the input in the forms of the package.json file (line 44).
    textarea = GetParams("Textarea") # Textarea is the id of the input in the forms of the package.json file (line 152).

    # Now you can add the code that corresponds to the command 'View example'.
    print(textarea)

    # If you want to modify a Rocketbot variable, you can use the SetVar function.
    SetVar("example_variable", "Hello World")
    # or you can use the variable 'input_1' to modify the variable entered by the user.
    SetVar(input_1, "Hello World")

# Similarly, you can create the code that corresponds to the command 'HTML example'.
if module == "example_html_table":
    textarea = GetParams("iframe")
    print(textarea['input'])

if module == "alerta":
    data = GetParams("identifier")
    option = GetParams("option")
    alert("Hola " + str(data) + ", Opcion:" + str(option ))
