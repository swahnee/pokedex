import express from "express";
import mewtwo from "./fixtures/mewtwo.json" with { type: "json" };
const app = express();

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

app.get("/api/v2/pokemon-species/:name", (req, res) => {
  if (req.params.name === "mewtwo") {
    return res.json(mewtwo);
  }

  if (req.params.name === "error") {
    return res.status(500).send("Internal Server Error");
  }

  return res.status(400).send("Bad Request");
});

app.listen(4000, () => {
  console.log("App started on port 4000");
});
