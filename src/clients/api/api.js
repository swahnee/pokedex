const express = require("express");
const PokemonController = require("./controllers/pokemon-controller");
const PokeApi = require("../../drivers/pokemon-repo/pokeapi");
const PokemonService = require("../../domain/service");

const pokemonRepo = new PokeApi(process.env.POKEAPI_URL);
const pokemonService = new PokemonService(pokemonRepo);
const pokemonController = new PokemonController(pokemonService);
const api = express();

api.get("/pokemon/:name", async (req, res) => {
  return pokemonController.getPokemon(req, res);
});

api.use((req, res) => {
  res.status(404).json({ error: "Not found" });
});

module.exports = api;
