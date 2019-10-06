export interface Pokemon {
  _id: string;
  pokedexId: number;
  name: string;
  tags: string[];
  total: number;
  hp: number;
  attack: number;
  defense: number;
  spellAttack: number;
  spellDefense: number;
  speed: number;
}
