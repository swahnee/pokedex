import FunTranslations from "../../../src/drivers/translations-service/funtranslations.js";
import TranslationsServiceError from "../../../src/domain/translations-service/translations-service-error.js";

describe("funtranslations", () => {
  it("translates given text with yoda translation", async () => {
    const service = new FunTranslations(process.env.FUNTRANSLATIONS_URL);

    const translation = await service.translateYoda("It was created");

    expect(translation).toBe("Yoda translated Mewtwo description");
  });

  it("translates given text with shakespeare translation", async () => {
    const service = new FunTranslations(process.env.FUNTRANSLATIONS_URL);

    const translation = await service.translateShakespeare("When it folds");

    expect(translation).toBe("Shakespeare translated Garchomp description");
  });

  it("handles bad requests with yoda translations", async () => {
    const service = new FunTranslations(process.env.FUNTRANSLATIONS_URL);

    await expect(service.translateYoda("")).rejects.toBeInstanceOf(
      TranslationsServiceError
    );
  });

  it("handles bad requests with shakespeare translations", async () => {
    const service = new FunTranslations(process.env.FUNTRANSLATIONS_URL);

    await expect(service.translateShakespeare("")).rejects.toBeInstanceOf(
      TranslationsServiceError
    );
  });

  it("handles api errors with yoda translations", async () => {
    const service = new FunTranslations(process.env.FUNTRANSLATIONS_URL);

    await expect(service.translateYoda("error")).rejects.toBeInstanceOf(
      TranslationsServiceError
    );
  });

  it("handles api errors with shakespeare translations", async () => {
    const service = new FunTranslations(process.env.FUNTRANSLATIONS_URL);

    await expect(service.translateShakespeare("error")).rejects.toBeInstanceOf(
      TranslationsServiceError
    );
  });

  it("handles network errors with yoda translations", async () => {
    const service = new FunTranslations("http://invalid_host");

    await expect(service.translateYoda("valid text")).rejects.toBeInstanceOf(
      TranslationsServiceError
    );
  }, 60_000);

  it("handles network errors with shakespeare translations", async () => {
    const service = new FunTranslations("http://invalid_host");

    await expect(
      service.translateShakespeare("valid text")
    ).rejects.toBeInstanceOf(TranslationsServiceError);
  }, 60_000);
});
