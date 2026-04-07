import express from "express";
import fs from "fs";

const app = express();
const mewtwo = JSON.parse(fs.readFileSync("./fixtures/mewtwo.json", "utf-8"));
const zubat = JSON.parse(fs.readFileSync("./fixtures/zubat.json", "utf-8"));
const garchomp = JSON.parse(
  fs.readFileSync("./fixtures/garchomp.json", "utf-8")
);

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

app.get("/api/v2/pokemon-species/:name", (req, res) => {
  if (req.params.name === "mewtwo") {
    return res.json(mewtwo);
  }

  if (req.params.name === "zubat") {
    return res.json(zubat);
  }

  if (req.params.name === "garchomp") {
    return res.json(garchomp);
  }

  if (req.params.name === "error") {
    return res.status(500).send("Internal Server Error");
  }

  return res.status(400).send("Bad Request");
});

app.listen(4000, () => {
  console.log("App started on port 4000");
});
