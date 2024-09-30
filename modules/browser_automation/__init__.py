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
    
   sudo pip install <package> -t .

"""

import sys
import os
from selenium.webdriver import Chrome # type: ignore
from selenium.webdriver import ActionChains # type: ignore
from selenium.webdriver.chrome.options import Options # type: ignore
import platform
import socket
import subprocess

BASE_PATH = tmp_global_obj["basepath"] # type: ignore
cur_path = BASE_PATH + 'modules' + os.sep + 'browser_automation' + os.sep + 'libs' + os.sep
uc_path = BASE_PATH + 'modules' + os.sep + 'browser_automation' + os.sep + 'libs' + os.sep + 'src' + os.sep
if cur_path not in sys.path:
    sys.path.append(cur_path)
if uc_path not in sys.path:
    sys.path.append(uc_path)


systems = {
    'Linux': "linux", 
    'Darwin': "mac",
    'Windows': "win"
}
SYSTEM = platform.system()

GetGlobals = GetGlobals # type: ignore
GetParams = GetParams # type: ignore
SetVar = SetVar # type: ignore
PrintException = PrintException # type: ignore

web = GetGlobals('web')
module = GetParams("module")
class BrowserAutomation:
    global BASE_PATH, systems, SYSTEM, socket
    
    DRIVERS = {
        "chrome": "chromedriver",
        "firefox": "x64" + os.sep + "geckodriver"
    }
   
    def __init__(self, browser="chrome", driver_path=None, browser_path="", folderPath="", port="5002", search=False):
        self.driver = None
        self.driver_path = driver_path
        self.browser = browser
        self.browser_path = browser_path
        soc = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        self.port = port
        
        if search:
            for i in range(2, 11):
                port_ = 5000 + i
                result = soc.connect_ex(('127.0.0.1', port_))
                p = subprocess.Popen(f'netstat -a | find "127.0.0.1:{port_}"', stdout=subprocess.PIPE, shell=True)
                output, err = p.communicate()
                if not "established" in output.decode().lower():
                    print(output.decode().lower())
                    self.port = str(port_)
                    break
        
        if folderPath != " ":
            self.profile_path = folderPath if " " not in folderPath else "\"" + folderPath + "\""
        else:
            folderPath = os.path.join(BASE_PATH,'modules','browser_automation','profile')
            self.profile_path = folderPath if " " not in folderPath else "\"" + folderPath + "\""
    
    @property
    def driver_path(self):
        if self.__driver_path:
            return self.__driver_path

        driver_name = self.DRIVERS[self.browser] + (".exe" if SYSTEM == "Windows" else "")
        return os.path.join(BASE_PATH, "drivers", systems[SYSTEM], self.browser, driver_name)

    @driver_path.setter
    def driver_path(self, path):
        self.__driver_path = path

    @property
    def browser_path(self):
        BROWSER_PATHS = {
            "chrome": {
                "Windows": 'start "" chrome',
                "Linux": "/usr/bin/google-chrome",
                "Darwin": "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
            }
        }

        if self.__browser_path:
            return self.__browser_path
        return BROWSER_PATHS[self.browser][SYSTEM]

    @browser_path.setter
    def browser_path(self, path):
        self.__browser_path = path

    def launch_browser(self, force_renderer=False):
        import subprocess
        if force_renderer:
            print("for renderer")
            subprocess.Popen(" ".join([self.browser_path, "--force-renderer-accessibility --kiosk-printing --remote-debugging-port="+self.port, "--user-data-dir=" + self.profile_path + ""]), shell=True)
        else:
            subprocess.Popen(" ".join([self.browser_path, "--remote-debugging-port="+self.port, "--user-data-dir=" + self.profile_path + ""]), shell=True)
    
    def open(self, force_renderer=False):
        global Options, Chrome
        self.launch_browser(force_renderer=force_renderer)
        if self.browser == "chrome":
            chrome_options = Options()
            chrome_options.debugger_address = "127.0.0.1:" + self.port
            self.driver = Chrome(chrome_options=chrome_options, executable_path=self.driver_path)
            return self.driver
    
    def open_undetected(self, force_renderer=False):
        global Options, Chrome
        self.launch_browser()
        if self.browser == "chrome":
            import r_undetected_chromedriver as uc # type: ignore
            print(uc.__file__)
            # uc.install(
            #     executable_path = self.driver_path ,
            # )
            options = uc.ChromeOptions()
            options.add_argument('--no-sandbox')
            if force_renderer:
                options.add_argument('--force-renderer-accessibility')
            # options.add_argument('--headless')
            # options.add_argument('--enable-javascript')
            # options.add_argument('--disable-gpu')
            # options.experimental_options["debuggerAddress"] = "127.0.0.1:" + self.port
            options.debugger_address = "127.0.0.1:" + self.port
            user_agent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Safari/605.1.15'
            options.add_argument('User-Agent={0}'.format(user_agent))
            options.user_data_dir = self.profile_path
            print(self.driver_path)
            self.driver = uc.Chrome(options=options, browser_executable_path=self.driver_path, executable_path=self.driver_path)
            print("opening")
            # chrome_options = Options()
            # chrome_options.debugger_address = "127.0.0.1:" + self.port
            # self.driver = Chrome(chrome_options=chrome_options, executable_path=self.driver_path)
            return self.driver


if module == "openBrowser":

    url = GetParams("url")
    path = GetParams("path")
    browser = GetParams("browser")
    folder = GetParams("folder")
    port = GetParams("port")
    search_port = GetParams("search_port")
    force_renderer = eval(GetParams("force_renderer_accessibility")) if GetParams("force_renderer_accessibility") else False
    
    if folder == None or folder == "":
        folder = " "

    if port == None or port == "":
        port = "5002"
        
    if search_port == None or search_port == "":
        search_port = False
    
    try:
        browser_ = "chrome"
        browser_automation = BrowserAutomation(browser_, browser_path=path, folderPath=folder, port=port, search=search_port)
        
        if browser == 'undetected_chrome':
            browser_driver = browser_automation.open_undetected(force_renderer=force_renderer)
        else:
            browser_driver = browser_automation.open(force_renderer=force_renderer)

        web.driver_list[web.driver_actual_id] = browser_driver
        if url:
            browser_driver.get(url)

    except Exception as e:
        import traceback
        traceback.print_exc()
        print("\x1B[" + "31;40mAn error occurred\x1B[" + "0m")
        PrintException()
        raise e

if module == "closeBrowser":
    browser_driver = web.driver_list[web.driver_actual_id]
    browser_driver.close()
    browser_driver.quit()
