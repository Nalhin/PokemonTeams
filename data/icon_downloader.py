import json
from urllib.request import urlretrieve

target_path = './icons'

with open('pokemon_data.json') as f:
    data = json.load(f)

for d in data:
    print(f'Downloaded {d["id"]}')
    urlretrieve(d['icon'], f'{target_path}/{d["id"]}.png')

