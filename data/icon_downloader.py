import json
from urllib.request import urlretrieve

target_path = './icons'


def main():
    with open('pokemon_data.json') as f:
        data = json.load(f)

    for d in data:
        print(f'Downloading {d["id"]}')
        urlretrieve(d['icon'], f'{target_path}/{d["id"]}.png')


if __name__ == '__main__':
    main()
