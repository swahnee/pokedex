import PokemonRepoError from "../../domain/pokemon-repo/pokemon-repo-error.js";
import Pokemon from "../../domain/pokemon.js";

/**
 * @implements Domain.PokemonRepo
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

  async find(name) {
    let response;
    try {
      response = await fetch(
        `${this.#pokeapiUrl}/api/v2/pokemon-species/${name}`
      );
    } catch (e) {
      // @TODO: add proper logging
      console.error(e);
      throw new PokemonRepoError();
    }

    if (response.status === 400) {
      return null;
    }

    if (response.status !== 200) {
      // @TODO: add proper logging
      console.error(response);
      throw new PokemonRepoError();
    }

    const data = await response.json();

    return new Pokemon(
      name,
      data.flavor_text_entries.filter((e) => e.language.name === "en")[0]
        .flavor_text,
      data.habitat?.name ?? null,
      data.is_legendary
    );
  }
}
