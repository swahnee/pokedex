import TranslationsServiceError from "../../domain/translations-service/translations-service-error";

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

  async translate(text) {
    let response;
    try {
      response = await fetch(`${this.#funtranslationsUrl}/v1/translate/yoda`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });
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
