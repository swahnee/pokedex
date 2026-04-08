import Description from "../../src/domain/pokemon-data-repo/description.js";
import PokemonData from "../../src/domain/pokemon-data-repo/pokemon-data.js";
import Service from "../../src/domain/service.js";
import TranslationsServiceError from "../../src/domain/translations-service/translations-service-error.js";

describe("service.findPokemon", () => {
  it("finds pokemon given name", async () => {
    const pokemonData = new PokemonData(
      [new Description("description", "en")],
      "habitat",
      false
    );
    const pokemonDataRepo = {
      find: async (name) => {
        if (name === "name") {
          return pokemonData;
        }
      },
    };
    const service = new Service(pokemonDataRepo, {});

    const pokemon = await service.findPokemon("name");

    expect(pokemon.name).toBe("name");
    expect(pokemon.description).toBe("description");
    expect(pokemon.habitat).toBe("habitat");
    expect(pokemon.isLegendary).toBe(false);
  });

  it("handles missing English translation", async () => {
    const pokemonData = new PokemonData(
      [new Description("description", "it")],
      "habitat",
      false
    );
    const pokemonDataRepo = {
      find: (name) => {
        if (name === "name") {
          return pokemonData;
        }
      },
    };
    const service = new Service(pokemonDataRepo, {});

    const pokemon = await service.findPokemon("name");

    expect(pokemon.name).toBe("name");
    expect(pokemon.description).toBe("Default description");
    expect(pokemon.habitat).toBe("habitat");
    expect(pokemon.isLegendary).toBe(false);
  });
});

describe("service.findTranslated", () => {
  it("translates cave pokemon with yoda translation", async () => {
    const pokemonData = new PokemonData(
      [new Description("description", "en")],
      "cave",
      false
    );
    const pokemonDataRepo = {
      find: (name) => {
        if (name === "name") {
          return pokemonData;
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
    const service = new Service(pokemonDataRepo, translationsService);

    const pokemon = await service.findTranslated("name");

    expect(pokemon.name).toBe("name");
    expect(pokemon.description).toBe("translation");
    expect(pokemon.habitat).toBe("cave");
    expect(pokemon.isLegendary).toBe(false);
  });

  it("translates legendary pokemon with yoda translation", async () => {
    const pokemonData = new PokemonData(
      [new Description("description", "en")],
      "habitat",
      true
    );
    const pokemonDataRepo = {
      find: (name) => {
        if (name === "name") {
          return pokemonData;
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
    const service = new Service(pokemonDataRepo, translationsService);

    const pokemon = await service.findTranslated("name");

    expect(pokemon.name).toBe("name");
    expect(pokemon.description).toBe("translation");
    expect(pokemon.habitat).toBe("habitat");
    expect(pokemon.isLegendary).toBe(true);
  });

  it("translates regular pokemon with shakespeare translation", async () => {
    const pokemonData = new PokemonData(
      [new Description("description", "en")],
      "habitat",
      false
    );
    const pokemonDataRepo = {
      find: (name) => {
        if (name === "name") {
          return pokemonData;
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
    const service = new Service(pokemonDataRepo, translationsService);

    const pokemon = await service.findTranslated("name");

    expect(pokemon.name).toBe("name");
    expect(pokemon.description).toBe("translation");
    expect(pokemon.habitat).toBe("habitat");
    expect(pokemon.isLegendary).toBe(false);
  });

  it("handles missing English description", async () => {
    const pokemonData = new PokemonData(
      [new Description("description", "it")],
      "habitat",
      false
    );
    const pokemonDataRepo = {
      find: (name) => {
        if (name === "name") {
          return pokemonData;
        }
      },
    };

    const service = new Service(pokemonDataRepo, {});

    const pokemon = await service.findTranslated("name");

    expect(pokemon.name).toBe("name");
    expect(pokemon.description).toBe("Default description");
    expect(pokemon.habitat).toBe("habitat");
    expect(pokemon.isLegendary).toBe(false);
  });

  it("handles pokemon not found", async () => {
    const pokemonDataRepo = {
      find: () => null,
    };
    const service = new Service(pokemonDataRepo, {});

    const pokemon = await service.findTranslated("name");

    expect(pokemon).toBeNull();
  });

  it("keeps original description in case of translation error", async () => {
    const pokemonData = new PokemonData(
      [new Description("description", "en")],
      "habitat",
      false
    );
    const pokemonDataRepo = {
      find: () => pokemonData,
    };
    const translationsService = {
      translate: () => {
        throw new TranslationsServiceError();
      },
    };
    const service = new Service(pokemonDataRepo, translationsService);

    const pokemon = await service.findTranslated("name");

    expect(pokemon.name).toBe("name");
    expect(pokemon.description).toBe("description");
    expect(pokemon.habitat).toBe("habitat");
    expect(pokemon.isLegendary).toBe(false);
  });
});
