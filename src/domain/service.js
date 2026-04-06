export default class Service {
  /**
   * @param {Domain.PokemonRepo} pokemonRepo
   */
  constructor(pokemonRepo) {
    this._pokemonRepo = pokemonRepo;
  }

  async findPokemon(name) {
    return this._pokemonRepo.find(name);
  }
};
