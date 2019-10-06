import requests
from bs4 import BeautifulSoup
import json
import operator


def get_id(cell):
    return int(cell.findAll('span')[2].text.lstrip("0"))


def get_name(cell):
    return cell.find('a').text


def get_tags(cell):
    tags = []
    for tag in cell.findAll('a'):
        tags.append(tag.text)
    return tags


def get_number(cell):
    return int(cell.text)


columns = ('pokedexId', 'name', 'tags', 'total', 'hp', 'attack', 'defense', 'spellAttack', 'spellDefense', 'speed')
parse_function = {0: get_id, 1: get_name, 2: get_tags}


def get_row_data(row, model_data,data):
    row_data = {}
    for i, cell in enumerate(row.findAll('td')):
        if i in parse_function:
            row_data[columns[i]] = parse_function[i](cell)
        else:
            row_data[columns[i]] = get_number(cell)

    if str(row_data["pokedexId"]) in map(operator.itemgetter('id'), model_data):
        if row_data["name"] not in map(operator.itemgetter('name'), data):
            return row_data


page = requests.get('https://pokemondb.net/pokedex/all')
soup = BeautifulSoup(page.content, 'html.parser')

pokedex = soup.find('table', id="pokedex").tbody

data = []
with open('pokemon_data.json', 'r') as json_file:
    model_data = json.load(json_file)
    for row in pokedex.findAll("tr"):
        row_data = get_row_data(row, model_data,data)
        if row_data:
            data.append(row_data)

with open('pokedex_data.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False)
