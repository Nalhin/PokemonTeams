import io
import json
import os
import shutil
import subprocess
import urllib.request
from zipfile import ZipFile

temp_path = './files'
output = './models'
pokemon_data_path = './pokemon_data.json'


def download_and_extract_file(download_url, pokemon_id):
    print(f'Downloading {pokemon_id} ...')
    resp = urllib.request.urlopen(download_url)
    zipfile = ZipFile(io.BytesIO(resp.read()), 'r')
    zipfile.extractall(temp_path)


def find_file_with_extension(extension):
    for root, dirs, files in os.walk(temp_path):
        for file in files:
            if file.endswith(extension):
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


converters = [{"formatter": convert_from_fbx, "extension": ('.fbx', '.FBX')},
              {"formatter": convert_from_obj, "extension": ('.obj', '.OBJ')},
              {"formatter": convert_from_dae, "extension": ('.dae', '.DAE')}]


def main():
    with open(pokemon_data_path) as f:
        data = json.load(f)

    for element in data:
        pokemon_id = element["id"]
        download_url = element['download_url']
        download_and_extract_file(download_url, pokemon_id)
        for extension in converters:
            file_path = find_file_with_extension(extension["extension"])
            if file_path:
                extension["formatter"](file_path, pokemon_id)
                break

        remove_excess_files()


if __name__ == '__main__':
    main()
