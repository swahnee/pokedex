import buildApi from "../src/clients/api/api.js";
import request from "supertest";

describe("api", () => {
  let api = null;

  beforeAll(() => {
    api = buildApi();
  });

  it("handles invalid routes", async () => {
    const response = await request(api)
      .get("/invalid")
      .expect("Content-Type", /json/)
      .expect(404);

    expect(response.body.error).toBe("Not found");
  });
});
