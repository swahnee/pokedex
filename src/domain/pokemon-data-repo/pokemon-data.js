/**
 * Entity representing pokemon data.
 */
export default class PokemonData {
  /**
   * @var {Array<Domain.PokemonDataRepo.Description>}
   */
  #descriptions;

  /**
   * @var {string|null}
   */
  #habitat;

  /**
   * @var {boolean}
   */
  #isLegendary;

  /**
   *
   * @param {Array<Domain.PokemonDataRepo.Description>} descriptions
   * @param {string|null} habitat
   * @param {boolean} isLegendary
   */
  constructor(descriptions, habitat, isLegendary) {
    this.#descriptions = descriptions;
    this.#habitat = habitat;
    this.#isLegendary = isLegendary;
  }

  /**
   * @returns {Array<Domain.PokemonDataRepo.Description>}
   */
  get descriptions() {
    return this.#descriptions;
  }

  /**
   * @returns {string|null}
   */
  get habitat() {
    return this.#habitat;
  }

  /**
   * @returns {boolean}
   */
  get isLegendary() {
    return this.#isLegendary;
  }
}
