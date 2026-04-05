const Pokemon = require("../../domain/pokemon");

/**
 * @implements Domain.PokemonRepo
 */
module.exports = class Pokeapi {
  constructor(pokeapiUrl) {
    this._pokeapiUrl = pokeapiUrl;
  }

  async find(name) {
    const response = await fetch(
      `${this._pokeapiUrl}/api/v2/pokemon-species/${name}`
    );
    const data = await response.json();

    return new Pokemon(
      name,
      data.flavor_text_entries[0].flavor_text,
      data.habitat.name,
      data.is_legendary
    );
  }
};
