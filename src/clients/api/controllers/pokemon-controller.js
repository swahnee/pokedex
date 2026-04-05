module.exports = class PokemonController {
  /**
   * @param {Domain.Service} service
   */
  constructor(service) {
    this._service = service;
  }

  async getPokemon(req, res) {
    const { name, description, habitat, isLegendary } =
      await this._service.findPokemon(req.params.name);

    return res.json({ name, description, habitat, isLegendary });
  }
};
