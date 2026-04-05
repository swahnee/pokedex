const ApiError = require("../../domain/pokemon-repo/api-error");
const axios = require("axios");
const Pokemon = require("../../domain/pokemon");

/**
 * @implements Domain.PokemonRepo
 */
module.exports = class Pokeapi {
  constructor(pokeapiUrl) {
    this._pokeapiUrl = pokeapiUrl;
  }

  async find(name) {
    try {
      const response = await axios.get(
        `${this._pokeapiUrl}/api/v2/pokemon-species/${name}`
      );

      const data = response.data;

      return new Pokemon(
        name,
        data.flavor_text_entries[0].flavor_text,
        data.habitat.name,
        data.is_legendary
      );
    } catch (e) {
      if (e.response && e.response.status === 400) {
        return null;
      }

      // @TODO: add log
      throw new ApiError();
    }
  }
};
