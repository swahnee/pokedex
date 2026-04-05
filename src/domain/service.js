module.exports = class Service {
  /**
   * @param {Domain.PokemonRepo} pokemonRepo
   */
  constructor(pokemonRepo) {
    this._pokemonRepo = pokemonRepo;
  }

  async findPokemon(name) {
    return await this._pokemonRepo.find(name);
  }
};
