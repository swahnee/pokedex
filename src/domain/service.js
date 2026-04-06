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
      description = await this.#translationsService.translate(
        pokemon.description
      );
    } catch (e) {
      return new TranslatedPokemon(
        pokemon.name,
        pokemon.description,
        pokemon.habitat,
        pokemon.isLegendary
      );
    }

    return new TranslatedPokemon(
      pokemon.name,
      description,
      pokemon.habitat,
      pokemon.isLegendary
    );
  }
}
