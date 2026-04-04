const express = require("express");
const app = express();

const mewtwo = require("./fixtures/mewtwo.json");

app.get("/api/v2/pokemon-species/:name", (req, res) => {
  if (req.params.name === "mewtwo") {
    res.json(mewtwo);

    return;
  }

  res.status(400);
  res.send("Bad Request");
});

app.listen(4000, () => {
  console.log("App started on port 4000");
});
