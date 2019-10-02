import requests
from bs4 import BeautifulSoup
import json

page = requests.get('https://www.models-resource.com/3ds/pokemonxy/')
model_download_url = 'https://www.models-resource.com/download/'

soup = BeautifulSoup(page.content, 'html.parser')
main = soup.body.find(id='body')
sections = main.findAll("div", {"class": "updatesheeticons"})

data = []

for s in sections:
    links = s.findAll("a")
    for a in links:
        model_link = a['href']
        model_id = model_link.split('/')[4]
        name = a.find('span', {'class': 'iconheadertext'}).text
        pokemon_id = 0
        if name.startswith('#'):
            pokemon_id = name.split(' ')[0].lstrip('#0')
            name = name.split(' ')[1]

        icon = a.findAll('img')[0]['src']
        if pokemon_id != 0:
            data.append(
                {'id': pokemon_id, 'download_url': f'{model_download_url}{model_id}/', 'name': name,
                 'icon': f'https://www.models-resource.com{icon}'})


with open('pokemon_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=4)
