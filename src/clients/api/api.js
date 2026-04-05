const express = require("express");
const PokemonController = require("./controllers/pokemon-controller");
const PokemonRepo = require("../../drivers/pokemon-repo/pokeapi");
const PokemonService = require("../../domain/service");

require("dotenv").config({
  path: `config/.env.dist.${process.env.NODE_ENV}`,
});

const pokemonRepo = new PokemonRepo(
  `${process.env.POKEAPI_HOST}:${process.env.POKEAPI_PORT}`
);
const pokemonService = new PokemonService(pokemonRepo);
const pokemonController = new PokemonController(pokemonService);
const api = express();

api.get("/pokemon/:name", async (req, res) => {
  return await pokemonController.getPokemon(req, res);
});

module.exports = api;
