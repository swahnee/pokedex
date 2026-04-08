import PokemonDataRepoError from "../../../src/domain/pokemon-data-repo/pokemon-data-repo-error.js";
import Pokeapi from "../../../src/drivers/pokemon-repo/pokeapi.js";

describe("pokeapi", () => {
  it("fetches pokemon data", async () => {
    const repo = new Pokeapi(process.env.POKEAPI_URL);

    const data = await repo.find("mewtwo");

    expect(data.descriptions[0].text).toMatch(/^It was created/);
    expect(data.descriptions[0].language).toBe("en");
    expect(data.habitat).toBe("rare");
    expect(data.isLegendary).toBe(true);
  });

  it("handles pokemon data with no habitat", async () => {
    const repo = new Pokeapi(process.env.POKEAPI_URL);

    const data = await repo.find("garchomp");

    expect(data.habitat).toBeNull();
  });

  it("handles pokemon data not found", async () => {
    const repo = new Pokeapi(process.env.POKEAPI_URL);

    const data = await repo.find("non_existent");

    expect(data).toBeNull();
  });

  it("handles api errors", async () => {
    const repo = new Pokeapi(process.env.POKEAPI_URL);

    await expect(repo.find("error")).rejects.toBeInstanceOf(
      PokemonDataRepoError
    );
  });

  it("handles network errors", async () => {
    const repo = new Pokeapi("http://invalid_host");

    await expect(repo.find("mewtwo")).rejects.toBeInstanceOf(
      PokemonDataRepoError
    );
  }, 60_000);
});
