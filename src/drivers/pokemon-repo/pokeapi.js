import Description from "../../domain/pokemon-data-repo/description.js";
import PokemonDataRepoError from "../../domain/pokemon-data-repo/pokemon-data-repo-error.js";
import PokemonData from "../../domain/pokemon-data-repo/pokemon-data.js";

/**
 * @implements Domain.PokemonDataRepo
 */
export default class Pokeapi {
  /**
   * @var {string}
   */
  #pokeapiUrl;

  /**
   * @param {string} pokeapiUrl
   */
  constructor(pokeapiUrl) {
    this.#pokeapiUrl = pokeapiUrl;
  }

  /**
   * @inheritdoc
   */
  async find(name) {
    let response;
    try {
      response = await fetch(
        `${this.#pokeapiUrl}/api/v2/pokemon-species/${name}`
      );
    } catch (e) {
      // @TODO: add proper logging
      console.error(e);
      throw new PokemonDataRepoError();
    }

    if (response.status === 400) {
      return null;
    }

    if (response.status !== 200) {
      // @TODO: add proper logging
      console.error(response);
      throw new PokemonDataRepoError();
    }

    const data = await response.json();

    return new PokemonData(
      data.flavor_text_entries.map(
        ({ flavor_text, language: { name } }) =>
          new Description(flavor_text, name)
      ),
      data.habitat?.name ?? null,
      data.is_legendary
    );
  }
}
