import express from "express";
import PokemonController from "./controllers/pokemon-controller.js";
import PokeApi from "../../drivers/pokemon-repo/pokeapi.js";
import PokemonService from "../../domain/service.js";

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

export default api;
