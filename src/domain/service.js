import Pokemon from "./pokemon.js";

export default class Service {
  static get DEFAULT_DESCRIPTION() {
    return "Default description";
  }

  /**
   * @var {Domain.PokemonDataRepo}
   */
  #pokemonDataRepo;

  /**
   * @var {Domain.TranslationsService}
   */
  #translationsService;

  /**
   * @param {Domain.PokemonDataRepo} pokemonDataRepo
   * @param {Domain.TranslationsService} translationsService
   */
  constructor(pokemonDataRepo, translationsService) {
    this.#pokemonDataRepo = pokemonDataRepo;
    this.#translationsService = translationsService;
  }

  async findPokemon(name) {
    const data = await this.#pokemonDataRepo.find(name);
    if (data === null) {
      return null;
    }

    const description =
      this.#getEnglishDescription(data.descriptions) ??
      Service.DEFAULT_DESCRIPTION;

    return new Pokemon(name, description, data.habitat, data.isLegendary);
  }

  async findTranslated(name) {
    const data = await this.#pokemonDataRepo.find(name);
    if (data === null) {
      return null;
    }

    return new Pokemon(
      name,
      await this.#translate(data),
      data.habitat,
      data.isLegendary
    );
  }

  async #translate(data) {
    const description = this.#getEnglishDescription(data.descriptions);
    if (!description) {
      return Service.DEFAULT_DESCRIPTION;
    }

    try {
      if (data.habitat === "cave" || data.isLegendary) {
        return await this.#translationsService.translateYoda(description);
      }

      return await this.#translationsService.translateShakespeare(description);
    } catch (e) {
      return description;
    }
  }

  #getEnglishDescription(descriptions) {
    const description = descriptions.find(
      ({ text, language }) => language === "en"
    );

    return description?.text ?? null;
  }
}
