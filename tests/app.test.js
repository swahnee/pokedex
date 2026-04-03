const app = require("../src/app");
const request = require("supertest");

describe("app", () => {
  it("runs", async () => {
    const response = await request(app).get("/").expect(200);

    expect(response.text).toBe("Hello, World!");
  });
});
