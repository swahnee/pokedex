const api = require("../src/clients/api/api");
const request = require("supertest");

describe("api", () => {
  it("handles invalid routes", async () => {
    const response = await request(api)
      .get("/invalid")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(response.body.error).toBe("Not found");
  });
});
