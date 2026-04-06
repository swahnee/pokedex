const ApiError = require("../../domain/pokemon-repo/api-error");
const Pokemon = require("../../domain/pokemon");

/**
 * @implements Domain.PokemonRepo
 */
module.exports = class Pokeapi {
  constructor(pokeapiUrl) {
    this._pokeapiUrl = pokeapiUrl;
  }

  async find(name) {
    let response;
    try {
      response = await fetch(
        `${this._pokeapiUrl}/api/v2/pokemon-species/${name}`
      );
    } catch (e) {
      // @TODO: add log
      throw new ApiError();
    }

    if (response.status === 400) {
      return null;
    }

    if (response.status !== 200) {
      // @TODO: add log
      throw new ApiError();
    }

    const data = await response.json();

    return new Pokemon(
      name,
      // @TODO: look for English translations specifically
      data.flavor_text_entries[0].flavor_text,
      data.habitat.name,
      data.is_legendary
    );
  }
};
