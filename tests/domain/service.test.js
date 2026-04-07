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
  it("translates cave pokemon with yoda translation", async () => {
    const pokemon = {
      name: "name",
      description: "description",
      habitat: "cave",
      isLegendary: false,
    };

    const pokemonRepo = {
      find: (name) => {
        if (name === "name") {
          return pokemon;
        }
      },
    };
    const translationsService = {
      translateYoda: (text) => {
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
    expect(translated.habitat).toBe("cave");
    expect(translated.isLegendary).toBe(false);
  });

  it("translates legendary pokemon with yoda translation", async () => {
    const pokemon = {
      name: "name",
      description: "description",
      habitat: "habitat",
      isLegendary: true,
    };

    const pokemonRepo = {
      find: (name) => {
        if (name === "name") {
          return pokemon;
        }
      },
    };
    const translationsService = {
      translateYoda: (text) => {
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
    expect(translated.isLegendary).toBe(true);
  });

  it("translates regular pokemon with shakespeare translation", async () => {
    const pokemon = {
      name: "name",
      description: "description",
      habitat: "habitat",
      isLegendary: false,
    };

    const pokemonRepo = {
      find: (name) => {
        if (name === "name") {
          return pokemon;
        }
      },
    };
    const translationsService = {
      translateShakespeare: (text) => {
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
    expect(translated.isLegendary).toBe(false);
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
      isLegendary: false,
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
    expect(translated.isLegendary).toBe(false);
  });
});
