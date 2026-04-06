import buildApi from "../src/clients/api/api.js";
import request from "supertest";

describe("translated", () => {
  let api = null;

  beforeAll(() => {
    api = buildApi();
  });

  it("provides translated pokemon description for cave pokemon", async () => {
    const response = await request(api)
      .get("/pokemon/translated/zubat")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.name).toBe("zubat");
    expect(response.body.description).toBe("Yoda translated Zubat description");
    expect(response.body.habitat).toBe("cave");
    expect(response.body.isLegendary).toBe(false);
  });

  it("handles input with spaces", async () => {
    const response = await request(api)
      .get("/pokemon/translated/  zubat  ")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.name).toBe("zubat");
    expect(response.body.description).toBe("Yoda translated Zubat description");
    expect(response.body.habitat).toBe("cave");
    expect(response.body.isLegendary).toBe(false);
  });

  it("handles pokemon not found", async () => {
    const response = await request(api)
      .get("/pokemon/translated/non_existent")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(response.body.error).toBe(`Pokemon non_existent not found`);
  });

  it("handles pokemon API errors", async () => {
    const response = await request(api)
      .get("/pokemon/translated/error")
      .expect("Content-Type", /json/)
      .expect(500);

    expect(response.body.error).toBe(
      "An error happened processing your request. Please try again later"
    );
  });
});
