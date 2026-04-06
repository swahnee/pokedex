import ApiError from "../../../src/domain/pokemon-repo/api-error.js";
import Pokeapi from "../../../src/drivers/pokemon-repo/pokeapi.js";

describe("pokeapi", () => {
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

    await expect(repo.find("error")).rejects.toBeInstanceOf(ApiError);
  });

  it("handles network errors", async () => {
    const repo = new Pokeapi("http://invalid_host");

    await expect(repo.find("mewtwo")).rejects.toBeInstanceOf(ApiError);
  }, 60_000);
});
