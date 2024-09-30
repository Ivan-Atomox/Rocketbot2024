import os
import keyring

class RDP:

    @staticmethod
    def write_rdp(mode, width, height, address):
        """
        mode = 1-Window. 2-Full screen.
        width = In Pixels. Just for Window Mode.
        height = In Pixels. Just for Window Mode.
        full address = Name or IP address (and optional port) of the remote computer that you want to connect to.
        prompt for credentials = 0-Use the saved credentials and will not prompt for credentials.
        """
        
        script = f"""
            screen mode id:i:{mode}
            use multimon:i:0
            desktopwidth:i:{width}
            desktopheight:i:{height}
            session bpp:i:32
            winposstr:s:0,1,82,109,1274,894
            autoreconnect max retries:i:5
            compression:i:1
            keyboardhook:i:2
            audiocapturemode:i:0
            videoplaybackmode:i:1
            connection type:i:7
            networkautodetect:i:1
            bandwidthautodetect:i:1
            displayconnectionbar:i:1
            enableworkspacereconnect:i:0
            disable wallpaper:i:0
            allow font smoothing:i:0
            allow desktop composition:i:0
            disable full window drag:i:1
            disable menu anims:i:1
            disable themes:i:0
            disable cursor setting:i:0
            bitmapcachepersistenable:i:1
            full address:s:{address}
            audiomode:i:0
            redirectprinters:i:1
            redirectcomports:i:0
            redirectsmartcards:i:1
            redirectclipboard:i:1
            redirectposdevices:i:0
            autoreconnection enabled:i:1
            authentication level:i:2
            prompt for credentials:i:0
            negotiate security layer:i:1
            remoteapplicationmode:i:0
            alternate shell:s:
            shell working directory:s:
            gatewayhostname:s:
            gatewayusagemethod:i:4
            gatewaycredentialssource:i:4
            gatewayprofileusagemethod:i:0
            promptcredentialonce:i:0
            gatewaybrokeringtype:i:0
            use redirection server name:i:0
            rdgiskdcproxy:i:0
            kdcproxyname:s:
        """
        
        return script

    @staticmethod
    def create_rdp(text, path, name):
        
        full_path = os.path.join(path, name + ".rdp")
        
        with open(full_path, 'w') as file:
            file.write(text)

    @staticmethod
    def set_pass(ip, username, password):
        
        keyring.set_password(ip, username, password)
        
    @staticmethod
    def get_html(path):
        
        with open(path, 'r') as f:
            data = f.read()
            f.close()
            return data