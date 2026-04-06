export default class PokemonController {
  /**
   * @param {Domain.Service} service
   */
  constructor(service) {
    this._service = service;
  }

  async getPokemon(req, res) {
    // Pokemon names can contain many special characters, so for
    // simplicity we're just trimming the input here.
    // Blank strings are already caught by the router as different routes,
    // so they won't ever get here.
    const pokemonName = req.params.name.trim();

    try {
      const result = await this._service.findPokemon(pokemonName);
      if (result === null) {
        return res
          .status(404)
          .json({ error: `Pokemon ${req.params.name} not found` });
      }

      const { name, description, habitat, isLegendary } = result;

      return res.json({ name, description, habitat, isLegendary });
    } catch (e) {
      // @TODO: add proper logging
      console.log(e);
      return res.status(500).json({
        error:
          "An error happened processing your request. Please try again later",
      });
    }
  }
};
