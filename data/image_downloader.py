import json
from urllib.request import urlretrieve
import PIL.Image

target_path = './assets'


def resize_images(path, d):
    image = PIL.Image.open(path)
    resized_image = image.resize((40, 40),PIL.Image.BILINEAR )
    resized_image.save(f'{target_path}/icons/{d["id"]}.png')


def main():
    with open('pokemon_data.json') as f:
        data = json.load(f)
    for d in data:
        print(f'Downloading {d["id"]}')
        path = f'{target_path}/images/{d["id"]}.png'
        urlretrieve(d['icon'], path)
        resize_images(path, d)


if __name__ == '__main__':
    main()
