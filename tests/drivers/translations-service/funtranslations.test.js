import FunTranslations from "../../../src/drivers/translations-service/funtranslations.js";
import TranslationsServiceError from "../../../src/domain/translations-service/translations-service-error.js";

describe("funtranslations", () => {
  it("translates given text with yoda translation", async () => {
    const service = new FunTranslations(process.env.FUNTRANSLATIONS_URL);

    const translation = await service.translate("valid text");

    expect(translation).toBe("Yoda translated Zubat description");
  });

  it("handles bad requests", async () => {
    const service = new FunTranslations(process.env.FUNTRANSLATIONS_URL);

    await expect(service.translate("")).rejects.toBeInstanceOf(
      TranslationsServiceError
    );
  });

  it("handles api errors", async () => {
    const service = new FunTranslations(process.env.FUNTRANSLATIONS_URL);

    await expect(service.translate("error")).rejects.toBeInstanceOf(
      TranslationsServiceError
    );
  });

  it("handles network errors", async () => {
    const service = new FunTranslations("http://invalid_host");

    await expect(service.translate("valid text")).rejects.toBeInstanceOf(
      TranslationsServiceError
    );
  }, 60_000);
});
