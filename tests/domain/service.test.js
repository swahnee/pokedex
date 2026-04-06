import Service from "../../src/domain/service.js";
import TranslatedPokemon from "../../src/domain/translated-pokemon.js";

describe("service.findPokemon", () => {
  it("finds pokemon given name", async () => {
    const pokemon = "pokemon";
    const pokemonRepo = {
      find: () => pokemon,
    };
    const service = new Service(pokemonRepo, {});

    const result = await service.findPokemon("name");

    expect(result).toBe(pokemon);
  });
});

describe("service.findTranslated", () => {
  it("finds translated pokemon given name", async () => {
    const pokemon = {
      name: "name",
      description: "description",
      habitat: "habitat",
      isLegendary: "isLegendary",
    };

    const pokemonRepo = {
      find: (name) => {
        if (name === "name") {
          return pokemon;
        }
      },
    };
    const translationsService = {
      translate: (text) => {
        if (text === "description") {
          return "translation";
        }
      },
    };
    const service = new Service(pokemonRepo, translationsService);

    const translated = await service.findTranslated("name");

    expect(translated).toBeInstanceOf(TranslatedPokemon);
    expect(translated.name).toBe("name");
    expect(translated.description).toBe("translation");
    expect(translated.habitat).toBe("habitat");
    expect(translated.isLegendary).toBe("isLegendary");
  });

  it("handles pokemon not found", async () => {
    const pokemonRepo = {
      find: () => null,
    };
    const service = new Service(pokemonRepo, {});

    const translated = await service.findTranslated("name");

    expect(translated).toBeNull();
  });

  it("keeps original description in case of translation error", async () => {
    const pokemon = {
      name: "name",
      description: "description",
      habitat: "habitat",
      isLegendary: "isLegendary",
    };

    const pokemonRepo = {
      find: () => pokemon,
    };
    const translationsService = {
      translate: () => {
        throw new Error();
      },
    };
    const service = new Service(pokemonRepo, translationsService);

    const translated = await service.findTranslated("name");

    expect(translated).toBeInstanceOf(TranslatedPokemon);
    expect(translated.name).toBe("name");
    expect(translated.description).toBe("description");
    expect(translated.habitat).toBe("habitat");
    expect(translated.isLegendary).toBe("isLegendary");
  });
});
