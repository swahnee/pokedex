/**
 * Value object representing a Pokemon description in a specific language.
 */
export default class Description {
  /**
   * @var {string}
   */
  #text;

  /**
   * @var {string}
   */
  #language;

  /**
   * @param {string} text
   * @param {string} language
   */
  constructor(text, language) {
    this.#text = text;
    this.#language = language;
  }

  /**
   * @returns {string}
   */
  get text() {
    return this.#text;
  }

  /**
   * @returns {string}
   */
  get language() {
    return this.#language;
  }
}
