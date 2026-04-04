const express = require("express");
const app = express();

require("dotenv").config({
  path: `config/.env.dist.${process.env.NODE_ENV}`,
});

const pokeapiUrl = `${process.env.POKEAPI_HOST}:${process.env.POKEAPI_PORT}`;

app.get("/pokemon/:name", async (req, res) => {
  const name = req.params.name;
  try {
    const response = await fetch(
      `${pokeapiUrl}/api/v2/pokemon-species/${name}`
    );
    const data = await response.json();
    res.json({
      name: name,
      description: data.flavor_text_entries[0].flavor_text,
      habitat: data.habitat.name,
      isLegendary: data.is_legendary,
    });
  } catch (e) {
    res.json({
      error: "Error getting resource",
    });
  }
});

module.exports = app;
