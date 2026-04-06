import buildApi from "../src/clients/api/api.js";
import request from "supertest";

describe("pokemon", () => {
  let api = null;

  beforeAll(() => {
    api = buildApi();
  });

  it("provides basic pokemon information", async () => {
    const response = await request(api)
      .get("/pokemon/mewtwo")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.name).toBe("mewtwo");
    expect(response.body.description).toMatch(/^It was created/);
    expect(response.body.habitat).toBe("rare");
    expect(response.body.isLegendary).toBe(true);
  });

  it("handles input with spaces", async () => {
    const response = await request(api)
      .get("/pokemon/  mewtwo  ")
      .expect("Content-Type", /json/)
      .expect(200);

    expect(response.body.name).toBe("mewtwo");
    expect(response.body.description).toMatch(/^It was created/);
    expect(response.body.habitat).toBe("rare");
    expect(response.body.isLegendary).toBe(true);
  });

  it("handles pokemon not found", async () => {
    const response = await request(api)
      .get("/pokemon/non_existent")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(response.body.error).toBe(`Pokemon non_existent not found`);
  });

  it("handles pokemon API errors", async () => {
    const response = await request(api)
      .get("/pokemon/error")
      .expect("Content-Type", /json/)
      .expect(500);

    expect(response.body.error).toBe(
      "An error happened processing your request. Please try again later"
    );
  });
});
