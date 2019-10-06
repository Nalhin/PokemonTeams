import urllib.request
import io
from zipfile import ZipFile
import json
import os
import subprocess
import shutil

temp_path = './files'
output = './models'

fbx = ('.fbx', '.FBX')
obj = ('.obj', '.OBJ')
dae = ('.dae', '.DAE')


def download_and_extract_file(download_url):
    print(f'Downloading {pokemon_id} ...')
    resp = urllib.request.urlopen(download_url)
    zipfile = ZipFile(io.BytesIO(resp.read()), 'r')
    zipfile.extractall(temp_path)


def find_fbx_file_path():
    for root, dirs, files in os.walk(temp_path):
        for file in files:
            if file.endswith(('.fbx', '.FBX')):
                return os.path.join(root, file)


def find_file_with_format(format):
    for root, dirs, files in os.walk(temp_path):
        for file in files:
            if file.endswith(format):
                print(file)
                return os.path.join(root, file)


def convert_from_fbx(file_path, pokemon_id):
    subprocess.call(
        f'./converters/FBX2glTF-windows-x64.exe "{file_path}" -b -o "{output}/{pokemon_id}"')
    print(f'{pokemon_id} converted from fbx successfully')


def convert_from_obj(file_path, pokemon_id):
    subprocess.call(
        f'node ./converters/obj2glbConverter.js -i "{file_path}" -o {output}/{pokemon_id}')
    print(f'{pokemon_id} converted from obj successfully')


def convert_from_dae(file_path, pokemon_id):
    subprocess.call(
        f'./converters/COLLADA2GLTF-bin.exe -i "{file_path}" -o {output}/{pokemon_id} -b -d')
    print(f'{pokemon_id} converted from dae successfully')


def remove_excess_files():
    shutil.rmtree(f'{temp_path}/')


with open('pokemon_data.json') as f:
    data = json.load(f)

models_in_different_format = []

for d in data:
    pokemon_id = d["id"]
    download_url = d['download_url']
    download_and_extract_file(download_url)
    file_path = find_file_with_format(fbx)
    if file_path:
        convert_from_fbx(file_path, pokemon_id)
    else:
        file_path = find_file_with_format(obj)
        if file_path:
            convert_from_obj(file_path, pokemon_id)
        else:
            file_path = find_file_with_format(dae)
            if file_path:
                convert_from_dae(file_path, pokemon_id)

    remove_excess_files()

print(models_in_different_format)
