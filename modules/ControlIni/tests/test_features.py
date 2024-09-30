"""Main feature test from module ControlIni."""
# pylint: disable=invalid-name,global-variable-not-assigned, exec-used
import os
import json
import pytest

def GetParams(name):
    """Replicate GetParams rocketbot function."""
    command = json.loads(pytest.running_command["command"])
    return command.get(name, None)

def SetVar(name, value):
    """Replicate SetVar rocketbot function."""
    datas = pytest.variables
    for data_ in datas:
        if str(data_['name']) == str(name).replace("}","").replace("{",""):
            data_['data'] = str(value)

    pytest.variables= datas

def GetVar(name):
    """Replicate GetVar rocketbot function."""
    datas = pytest.variables
    for data_ in datas:
        print(data_)
        if str(data_['name']) == str(name).replace("}","").replace("{",""):
            return data_['data']

def PrintException():
    """Replicate PrintException rocketbot function."""


def load_robot(robot_file):
    """Load robot."""
    with open('tests/robots/' + robot_file, 'r', encoding='latin-1') as file:
        robot = json.load(file)
        file.close()
    return robot


@pytest.mark.parametrize("robot_file", os.listdir('tests/robots'))
def test_module(robot_file):
    """Test module."""
    with open('__init__.py', 'r', encoding='latin-1') as file:
        module = file.read()
        file.close()

    robot = load_robot(robot_file)
    pytest.variables = robot['variables']
    for command in robot['commands']:
        pytest.running_command = command
        global GetParams
        global SetVar
        exec(module)

        assert GetVar("result") == "True"
