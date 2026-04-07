import TranslatedPokemon from "./translated-pokemon.js";

export default class Service {
  /**
   * @var {Domain.PokemonRepo}
   */
  #pokemonRepo;

  /**
   * @var {Domain.TranslationsService}
   */
  #translationsService;

  /**
   * @param {Domain.PokemonRepo} pokemonRepo
   * @param {Domain.TranslationsService} translationsService
   */
  constructor(pokemonRepo, translationsService) {
    this.#pokemonRepo = pokemonRepo;
    this.#translationsService = translationsService;
  }

  async findPokemon(name) {
    return this.#pokemonRepo.find(name);
  }

  async findTranslated(name) {
    const pokemon = await this.findPokemon(name);
    if (pokemon === null) {
      return null;
    }

    let description;
    try {
      description = await this.#translate(pokemon);
    } catch (e) {
      description = pokemon.description;
    }

    return new TranslatedPokemon(
      pokemon.name,
      description,
      pokemon.habitat,
      pokemon.isLegendary
    );
  }

  async #translate(pokemon) {
    if (pokemon.habitat === "cave" || pokemon.isLegendary) {
      return this.#translationsService.translateYoda(pokemon.description);
    }

    return this.#translationsService.translateShakespeare(pokemon.description);
  }
}
