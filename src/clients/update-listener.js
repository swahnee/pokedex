export default class UpdateListener {
  /**
   * @var {Map}
   */
  #translatedCache;

  constructor(translatedCache) {
    this.#translatedCache = translatedCache;
  }

  bind(dispatcher) {
    dispatcher.on('pokemon.updated', name => {
      // Invalidate the translated cache
      console.log(`Invalidating ${name}`);
      this.#translatedCache.delete(name);
    });
  }
};
