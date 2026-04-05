module.exports = class PokemonController {
  /**
   * @param {Domain.Service} service
   */
  constructor(service) {
    this._service = service;
  }

  async getPokemon(req, res) {
    const name = req.params.name;
    const pokemon = await this._service.findPokemon(name);

    return res.json({
      name: pokemon.name,
      description: pokemon.description,
      habitat: pokemon.habitat,
      isLegendary: pokemon.isLegendary,
    });
  }
};
