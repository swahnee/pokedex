const api = require("../src/clients/api/api");
const request = require("supertest");

describe("pokemon", () => {
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
});
