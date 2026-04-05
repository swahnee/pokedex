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
    try {
      const response = await fetch(
        `${this._pokeapiUrl}/api/v2/pokemon-species/${name}`,
        {
          signal: AbortSignal.timeout(3000),
        }
      );

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
        data.flavor_text_entries[0].flavor_text,
        data.habitat.name,
        data.is_legendary
      );
    } catch (e) {
      // @TODO: add log
      throw new ApiError();
    }
  }
};
