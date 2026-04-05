const ApiError = require("../../../src/domain/pokemon-repo/api-error");
const Pokeapi = require("../../../src/drivers/pokemon-repo/pokeapi");

describe("pokeapi", () => {
  beforeAll(() => {
    jest.setTimeout(60000);
  });

  it("fetches pokemon information", async () => {
    const repo = new Pokeapi(process.env.POKEAPI_URL);

    const pokemon = await repo.find("mewtwo");

    expect(pokemon.name).toBe("mewtwo");
    expect(pokemon.description).toMatch(/^It was created/);
    expect(pokemon.habitat).toBe("rare");
    expect(pokemon.isLegendary).toBe(true);
  });

  it("handles pokemon not found", async () => {
    const repo = new Pokeapi(process.env.POKEAPI_URL);

    const pokemon = await repo.find("non_existent");

    expect(pokemon).toBeNull();
  });

  it("handles api errors", async () => {
    const repo = new Pokeapi(process.env.POKEAPI_URL);

    try {
      await repo.find("error");
    } catch (e) {
      expect(e).toBeInstanceOf(ApiError);
    }
  });

  it("handles network errors", async () => {
    const repo = new Pokeapi("http://invalid_host");

    try {
      await repo.find("mewtwo");
    } catch (e) {
      expect(e).toBeInstanceOf(ApiError);
    }
  });
});
