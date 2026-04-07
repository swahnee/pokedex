/**
 * Entity representing an existing Pokémon persisted somewhere
 */
export default class Pokemon {
  /**
   * @var {string}
   */
  #name;

  /**
   * @var {string}
   */
  #description;

  /**
   * @var {string|null}
   */
  #habitat;

  /**
   * @var {boolean}
   */
  #isLegendary;

  /**
   * @param {string} name
   * @param {string} description
   * @param {string|null} habitat
   * @param {boolean} isLegendary
   */
  constructor(name, description, habitat, isLegendary) {
    this.#name = name;
    this.#description = description;
    this.#habitat = habitat;
    this.#isLegendary = isLegendary;
  }

  /**
   * @returns {string}
   */
  get name() {
    return this.#name;
  }

  /**
   * @returns {string}
   */
  get description() {
    return this.#description;
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
