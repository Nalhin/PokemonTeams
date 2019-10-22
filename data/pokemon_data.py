import requests
from bs4 import BeautifulSoup
import json

page_address = 'https://www.models-resource.com/3ds/pokemonxy/'
model_download_url = 'https://www.models-resource.com/download/'


def get_page_sections(soup):
    body = soup.body.find(id='body')
    return body.findAll("div", {"class": "updatesheeticons"})


def get_data_from_a(a):
    model_link = a['href']
    model_id = model_link.split('/')[4]
    name = a.find('span', {'class': 'iconheadertext'}).text
    pokemon_id = 0
    if name.startswith('#'):
        pokemon_id = name.split(' ')[0].lstrip('#0')
        name = name.split(' ')[1]

    icon = a.findAll('img')[0]['src']
    if pokemon_id != 0:
        return {'id': pokemon_id, 'download_url': f'{model_download_url}{model_id}/', 'name': name,
                'icon': f'https://www.models-resource.com{icon}'}


def get_data_from_sections(sections):
    data = []
    for s in sections:
        links = s.findAll("a")
        for a in links:
            data_from_a = get_data_from_a(a)
            if data_from_a:
                data.append(data_from_a)
    return data


def main():
    page = requests.get(page_address)
    soup = BeautifulSoup(page.content, 'html.parser')
    sections = get_page_sections(soup)
    data = get_data_from_sections(sections)

    with open('pokemon_data.json', 'w', encoding='utf-8') as f:
        json.dump(data, f, ensure_ascii=False, indent=4)


if __name__ == '__main__':
    main()
