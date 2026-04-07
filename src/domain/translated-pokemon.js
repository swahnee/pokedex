/**
 * DTO representing a Pokémon with a translated description.
 */
export default class TranslatedPokemon {
  #name;
  #description;
  #habitat;
  #isLegendary;

  constructor(name, description, habitat, isLegendary) {
    this.#name = name;
    this.#description = description;
    this.#habitat = habitat;
    this.#isLegendary = isLegendary;
  }

  get name() {
    return this.#name;
  }

  get description() {
    return this.#description;
  }

  get habitat() {
    return this.#habitat;
  }

  get isLegendary() {
    return this.#isLegendary;
  }
}
