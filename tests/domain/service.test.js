import Description from "../../src/domain/pokemon-data-repo/description.js";
import { jest } from "@jest/globals";
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
      find: jest.fn(async () => pokemonData),
    };
    const service = new Service(pokemonDataRepo, {});

    const pokemon = await service.findPokemon("name");

    expect(pokemonDataRepo.find.mock.calls[0][0]).toBe("name");
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
      find: jest.fn(async () => pokemonData),
    };
    const service = new Service(pokemonDataRepo, {});

    const pokemon = await service.findPokemon("name");

    expect(pokemonDataRepo.find.mock.calls[0][0]).toBe("name");
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
      find: jest.fn(async () => pokemonData),
    };
    const translationsService = {
      translateYoda: jest.fn(async () => "yoda translation"),
    };
    const service = new Service(pokemonDataRepo, translationsService);

    const pokemon = await service.findTranslated("name");

    expect(pokemonDataRepo.find.mock.calls[0][0]).toBe("name");
    expect(translationsService.translateYoda.mock.calls[0][0]).toBe(
      "description"
    );
    expect(pokemon.name).toBe("name");
    expect(pokemon.description).toBe("yoda translation");
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
      find: jest.fn(async () => pokemonData),
    };
    const translationsService = {
      translateYoda: jest.fn(async () => "yoda translation"),
    };
    const service = new Service(pokemonDataRepo, translationsService);

    const pokemon = await service.findTranslated("name");

    expect(pokemonDataRepo.find.mock.calls[0][0]).toBe("name");
    expect(translationsService.translateYoda.mock.calls[0][0]).toBe(
      "description"
    );
    expect(pokemon.name).toBe("name");
    expect(pokemon.description).toBe("yoda translation");
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
      find: jest.fn(async () => pokemonData),
    };
    const translationsService = {
      translateShakespeare: jest.fn(async () => "shakespeare translation"),
    };
    const service = new Service(pokemonDataRepo, translationsService);

    const pokemon = await service.findTranslated("name");

    expect(pokemonDataRepo.find.mock.calls[0][0]).toBe("name");
    expect(translationsService.translateShakespeare.mock.calls[0][0]).toBe(
      "description"
    );
    expect(pokemon.name).toBe("name");
    expect(pokemon.description).toBe("shakespeare translation");
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
      find: jest.fn(async () => pokemonData),
    };
    const service = new Service(pokemonDataRepo, {});

    const pokemon = await service.findTranslated("name");

    expect(pokemonDataRepo.find.mock.calls[0][0]).toBe("name");
    expect(pokemon.name).toBe("name");
    expect(pokemon.description).toBe("Default description");
    expect(pokemon.habitat).toBe("habitat");
    expect(pokemon.isLegendary).toBe(false);
  });

  it("handles pokemon not found", async () => {
    const pokemonDataRepo = {
      find: jest.fn(async () => null),
    };
    const service = new Service(pokemonDataRepo, {});

    const pokemon = await service.findTranslated("name");

    expect(pokemonDataRepo.find.mock.calls[0][0]).toBe("name");
    expect(pokemon).toBeNull();
  });

  it("keeps original description in case of yoda translation error", async () => {
    const pokemonData = new PokemonData(
      [new Description("description", "en")],
      "habitat",
      true
    );
    const pokemonDataRepo = {
      find: jest.fn(async () => pokemonData),
    };
    const translationsService = {
      translateYoda: jest.fn(async () => {
        throw new TranslationsServiceError();
      }),
    };
    const service = new Service(pokemonDataRepo, translationsService);

    const pokemon = await service.findTranslated("name");

    expect(pokemonDataRepo.find.mock.calls[0][0]).toBe("name");
    expect(translationsService.translateYoda.mock.calls[0][0]).toBe(
      "description"
    );
    expect(pokemon.name).toBe("name");
    expect(pokemon.description).toBe("description");
    expect(pokemon.habitat).toBe("habitat");
    expect(pokemon.isLegendary).toBe(true);
  });

  it("keeps original description in case of shakespeare translation error", async () => {
    const pokemonData = new PokemonData(
      [new Description("description", "en")],
      "habitat",
      false
    );
    const pokemonDataRepo = {
      find: jest.fn(async () => pokemonData),
    };
    const translationsService = {
      translateShakespeare: jest.fn(async () => {
        throw new TranslationsServiceError();
      }),
    };
    const service = new Service(pokemonDataRepo, translationsService);

    const pokemon = await service.findTranslated("name");

    expect(pokemonDataRepo.find.mock.calls[0][0]).toBe("name");
    expect(translationsService.translateShakespeare.mock.calls[0][0]).toBe(
      "description"
    );
    expect(pokemon.name).toBe("name");
    expect(pokemon.description).toBe("description");
    expect(pokemon.habitat).toBe("habitat");
    expect(pokemon.isLegendary).toBe(false);
  });
});
