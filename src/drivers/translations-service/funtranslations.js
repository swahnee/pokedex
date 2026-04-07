import TranslationsServiceError from "../../domain/translations-service/translations-service-error.js";

/**
 * @implements Domain.TranslationsService
 */
export default class FunTranslations {
  /**
   * @var {string}
   */
  #funtranslationsUrl;

  constructor(funtranslationsUrl) {
    this.#funtranslationsUrl = funtranslationsUrl;
  }

  async translateYoda(text) {
    return this.#translate(text, "yoda");
  }

  async translateShakespeare(text) {
    return this.#translate(text, "shakespeare");
  }

  async #translate(text, type) {
    let response;
    try {
      response = await fetch(
        `${this.#funtranslationsUrl}/v1/translate/${type}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        }
      );
    } catch (e) {
      // @TODO: add proper logging
      console.error(e);
      throw new TranslationsServiceError();
    }

    if (response.status !== 200) {
      // @TODO: add proper logging
      console.error(response);
      throw new TranslationsServiceError();
    }

    const data = await response.json();

    return data.contents.translated;
  }
}
