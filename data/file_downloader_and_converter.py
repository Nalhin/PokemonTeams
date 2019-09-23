import urllib.request
import io
from zipfile import ZipFile
import json
import os
import subprocess
import shutil

temp_path = './files'
output = './models'


def download_and_extract_file(download_url):
    print(f'Downloading {pokemon_id} ...')
    resp = urllib.request.urlopen(download_url)
    zipfile = ZipFile(io.BytesIO(resp.read()), 'r')
    zipfile.extractall(temp_path)


def find_file_path():
    for root, dirs, files in os.walk(temp_path):
        for file in files:
            if file.endswith('.FBX' or '.fbx'):
                return os.path.join(root, file)


def convert_to_glb(file_path, pokemon_id):
    subprocess.call(
        f'./data/FBX2glTF-windows-x64.exe "{file_path}" -b -o {output}/{pokemon_id}')
    print(f'\n{pokemon_id} converted successfully')


def remove_excess_files():
    shutil.rmtree(f'{temp_path}/')


with open('pokemon_data.json') as f:
    data = json.load(f)

models_in_different_format = []

for d in data:
    pokemon_id = d["id"]
    download_url = d['download_url']
    download_and_extract_file(download_url)
    file_path = find_file_path()
    if file_path:
        convert_to_glb(file_path, pokemon_id)
    else:
        models_in_different_format.append(pokemon_id)
    remove_excess_files()

print(models_in_different_format)
