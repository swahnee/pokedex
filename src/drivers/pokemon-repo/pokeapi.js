import PokemonRepoError from "../../domain/pokemon-repo/pokemon-repo-error.js";
import Pokemon from "../../domain/pokemon.js";

/**
 * @implements Domain.PokemonRepo
 */
export default class Pokeapi {
  /**
   * @var {Application.Dispatcher}
   */
  #dispatcher;

  /**
   * @var {string}
   */
  #pokeapiUrl;

  /**
   * @var {Map}
   */
  #cache;

  /**
   * @param {Application.Dispatcher}
   * @param {string} pokeapiUrl
   */
  constructor(dispatcher, pokeapiUrl) {
    this.#dispatcher = dispatcher;
    this.#pokeapiUrl = pokeapiUrl;
    this.#cache = new Map();
  }

  async find(name) {
    if (this.#cache.has(name)) {
      // @TODO: here we should also store the ETag in order to check
      // with the server if it matches with the current resource, but
      // for simplicity we'll just update every time the expiration time
      // is over
      const [expiration, pokemon] = this.#cache.get(name);
      if (expiration > Math.floor(Date.now() / 1000)) {
        return pokemon;
      }
    }

    let response;
    try {
      console.log('GETTING POKEMON');
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

    const pokemon = new Pokemon(
      name,
      data.flavor_text_entries.filter((e) => e.language.name === "en")[0]
        .flavor_text,
      data.habitat.name,
      data.is_legendary
    );

    const cacheControl = response.headers.get('Cache-Control');
    const maxAgeMatch = cacheControl?.match(/max-age=(\d+)/);
    const maxAge = maxAgeMatch ? parseInt(maxAgeMatch[1], 10) : -1;
    const expiration = Math.floor(Date.now() / 1000) + maxAge;
    this.#cache.set(name, [expiration, pokemon]);
    this.#dispatcher.emit('pokemon.updated', name, pokemon);

    return pokemon;
  }
}
