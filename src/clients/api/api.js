import express from "express";
import FunTranslations from "../../drivers/translations-service/funtranslations.js";
import PokemonController from "./controllers/pokemon-controller.js";
import PokeApi from "../../drivers/pokemon-repo/pokeapi.js";
import Service from "../../domain/service.js";
import TranslatedController from "./controllers/translated-controller.js";

const buildApi = () => {
  const pokemonDataRepo = new PokeApi(process.env.POKEAPI_URL);
  const translationsService = new FunTranslations(
    process.env.FUNTRANSLATIONS_URL
  );
  const service = new Service(pokemonDataRepo, translationsService);
  const pokemonController = new PokemonController(service);
  const translatedController = new TranslatedController(service);

  const api = express();

  api.get("/pokemon/translated/:name", async (req, res) => {
    return translatedController.getTranslated(req, res);
  });

  api.get("/pokemon/:name", async (req, res) => {
    return pokemonController.getPokemon(req, res);
  });

  api.use((req, res) => {
    res.status(404).json({ error: "Not found" });
  });

  return api;
};

export default buildApi;
