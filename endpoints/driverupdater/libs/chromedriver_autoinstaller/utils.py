# coding: utf-8
"""
Helper functions for filename and URL generation.
"""

import sys
import os
import subprocess
import urllib.request
import urllib.error
import zipfile
import xml.etree.ElementTree as elemTree
import logging
import re
import requests

from io import BytesIO
from urllib.parse import urlparse, urlunparse


__author__ = 'Yeongbin Jo <iam.yeongbin.jo@gmail.com>'


def get_chromedriver_filename():
    """
    Returns the filename of the binary for the current platform.
    :return: Binary filename
    """
    if sys.platform.startswith('win'):
        return 'chromedriver.exe'
    return 'chromedriver'


def get_variable_separator():
    """
    Returns the environment variable separator for the current platform.
    :return: Environment variable separator
    """
    if sys.platform.startswith('win'):
        return ';'
    return ':'


def get_platform_architecture():
    if sys.platform.startswith('linux') and sys.maxsize > 2 ** 32:
        platform = 'linux'
        architecture = '64'
    elif sys.platform == 'darwin':
        platform = 'mac-x'
        architecture = '64'
    elif sys.platform.startswith('win'):
        platform = 'win'
        architecture = '32'
    else:
        raise RuntimeError('Could not determine chromedriver download URL for this platform.')
    return platform, architecture

def get_base_url():
    """
    Returns the base URL for the download of chromedriver.
    :return: Base URL
    """
    json_url = 'https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions-with-downloads.json'
    get_json = requests.get(json_url)
    data = get_json.json()
    base_full_url = data.get('channels').get('Stable').get('downloads').get('chromedriver')[0].get('url')
    parsed_url = urlparse(base_full_url)
    path_parts = parsed_url.path.split('/')
    new_path = '/'.join(path_parts[:-3])
    base_url = urlunparse((parsed_url.scheme, parsed_url.netloc, new_path, '', '', ''))
    return base_url


def get_chromedriver_url(version):
    """
    Generates the download URL for current platform , architecture and the given version.
    Supports Linux, MacOS and Windows.
    :param version: chromedriver version string
    :return: Download URL for chromedriver
    """
    # base_url = 'https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/'
    try:
        base_url = get_base_url()
    except Exception:
        base_url = 'https://storage.googleapis.com/chrome-for-testing-public/'
    platform, architecture = get_platform_architecture()
    return base_url + '/' + version + '/' + platform + architecture + '/chromedriver-' + platform + architecture + '.zip'


def find_binary_in_path(filename):
    """
    Searches for a binary named `filename` in the current PATH. If an executable is found, its absolute path is returned
    else None.
    :param filename: Filename of the binary
    :return: Absolute path or None
    """
    if 'PATH' not in os.environ:
        return None
    for directory in os.environ['PATH'].split(get_variable_separator()):
        binary = os.path.abspath(os.path.join(directory, filename))
        if os.path.isfile(binary) and os.access(binary, os.X_OK):
            return binary
    return None


def check_version(binary, required_version):
    try:
        version = subprocess.check_output([binary, '-v'])
        version = re.match(r'.*?([\d.]+).*?', version.decode('utf-8'))[1]
        if version == required_version:
            return True
    except Exception:
        return False
    return False


def get_chrome_version():
    """
    :return: the version of chrome installed on client
    """
    platform, _ = get_platform_architecture()
    if platform == 'linux':
        executable_name = 'google-chrome'
        if os.path.isfile('/usr/bin/chromium-browser'):
            executable_name = 'chromium-browser'
        if os.path.isfile('/usr/bin/chromium'):
            executable_name = 'chromium'
        with subprocess.Popen([executable_name, '--version'], stdout=subprocess.PIPE) as proc:
            version = proc.stdout.read().decode('utf-8').replace('Chromium', '').replace('Google Chrome', '').strip()
    elif platform == 'mac-x':
        process = subprocess.Popen(['/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '--version'], stdout=subprocess.PIPE)
        version = process.communicate()[0].decode('UTF-8').replace('Google Chrome', '').strip()
    elif platform == 'win':
        process = subprocess.Popen(
            ['reg', 'query', 'HKEY_CURRENT_USER\\Software\\Google\\Chrome\\BLBeacon', '/v', 'version'],
            stdout=subprocess.PIPE, stderr=subprocess.DEVNULL, stdin=subprocess.DEVNULL
        )
        version = process.communicate()[0].decode('UTF-8').strip().split()[-1]
    else:
        return
    return version


def get_major_version(version):
    """
    :param version: the version of chrome
    :return: the major version of chrome
    """
    return version.split('.')[0]


def get_matched_chromedriver_version(version):
    """
    :param version: the version of chrome
    :return: the version of chromedriver
    """
    import json
    doc = urllib.request.urlopen('https://googlechromelabs.github.io/chrome-for-testing/known-good-versions-with-downloads.json', timeout=80).read()
    data = json.loads(doc.decode('utf-8'))
    major_version = get_major_version(version)
    for version in data["versions"][::-1]:
        if major_version == get_major_version(version["version"]):
            return version["version"]


    

def is_updated(chromedriver_dir):
    chrome_version = get_chrome_version()
    if not chrome_version:
        logging.debug('Chrome is not installed.')
        return
    chromedriver_version = get_matched_chromedriver_version(chrome_version)
    if not chromedriver_version:
        logging.debug('Can not find chromedriver for currently installed chrome version.')
        return
    major_version = get_major_version(chromedriver_version)
    chromedriver_filename = get_chromedriver_filename()
    chromedriver_filepath = os.path.join(chromedriver_dir, chromedriver_filename)
    is_updated = check_version(chromedriver_filepath, chromedriver_version)
    return is_updated

def get_chromedriver_path():
    """
    :return: path of the chromedriver binary
    """
    return os.path.abspath(os.path.dirname(__file__))


def print_chromedriver_path():
    """
    Print the path of the chromedriver binary.
    """
    print(get_chromedriver_path())


def download_chromedriver(chromedriver_dir, cwd=False):
    """
    Downloads, unzips and installs chromedriver.
    If a chromedriver binary is found in PATH it will be copied, otherwise downloaded.

    :param cwd: Flag indicating whether to download to current working directory
    :return: The file path of chromedriver
    """
    chrome_version = get_chrome_version()
    if not chrome_version:
        logging.debug('Chrome is not installed.')
        return
    chromedriver_version = get_matched_chromedriver_version(chrome_version)
    if not chromedriver_version:
        logging.debug('Can not find chromedriver for currently installed chrome version.')
        return
    # major_version = get_major_version(chromedriver_version)

    chromedriver_filename = get_chromedriver_filename()
    chromedriver_filepath = os.path.join(chromedriver_dir, chromedriver_filename)
    last_path = os.path.join(chromedriver_dir, chromedriver_filename)

    if not os.path.isfile(chromedriver_filepath) or \
            not check_version(chromedriver_filepath, chromedriver_version) or \
                not chromedriver_version:
        print(f'Downloading chromedriver ({chromedriver_version})...')
        logging.debug(f'Downloading chromedriver ({chromedriver_version})...')
        if not os.path.isdir(chromedriver_dir):
            os.mkdir(chromedriver_dir)
        url = get_chromedriver_url(version=chromedriver_version)
        try:
            response = requests.get(url, stream=True, timeout=60)
            if response.status_code != 200:
                raise urllib.error.URLError('Not Found')
        except urllib.error.URLError:
            print(f'Failed to download chromedriver archive: {url}')
            raise RuntimeError(f'Failed to download chromedriver archive: {url}')
        archive = BytesIO(response.content)
        with zipfile.ZipFile(archive) as zip_file:
            zip_file.extractall(chromedriver_dir)

        # move chromedriver to chromedriver_dir
        from time import sleep
        # delete chromedriver.exe if exists
        if os.path.isfile(last_path):
            os.remove(last_path)
        sleep(1)

        plat, arch = get_platform_architecture()
        chromedriver_filepath = os.path.join(chromedriver_dir, "chromedriver-"+ plat + arch, chromedriver_filename)
        os.rename(chromedriver_filepath, last_path)
    else:
        logging.debug('Chromedriver is already installed.')
    if not os.access(last_path, os.X_OK):
        os.chmod(last_path, 0o744)
    return last_path


