export default class TranslatedController {
  /**
   * @var {Domain.Service}
   */
  #service;

  /**
   * @var {Map}
   */
  #cache;

  /**
   * @param {Domain.Service} service
   */
  constructor(service, cache) {
    this.#service = service;
    this.#cache = cache;
  }

  async getTranslated(req, res) {
    console.log(this.#cache);
    // Pokemon names can contain many special characters, so for
    // simplicity we're just trimming the input here.
    // Blank strings are already caught by the router as different routes,
    // so they won't ever get here.
    const pokemonName = req.params.name.trim();

    if (this.#cache.has(pokemonName)) {
      return this.toJson(this.#cache.get(pokemonName));
    }

    try {
      const result = await this.#service.findTranslated(pokemonName);
      if (result === null) {
        return res
          .status(404)
          .json({ error: `Pokemon ${req.params.name} not found` });
      }

      // DOESN'T WORK BECAUSE IT SKIPS THE CALL TO THE REPO
      // THAT CHECKS IF IT'S STALE
      this.#cache.set(pokemonName, result);

      return res.json(this.toJson(result));
    } catch (e) {
      // @TODO: add proper logging
      console.error(e);

      return res.status(500).json({
        error:
          "An error happened processing your request. Please try again later",
      });
    }
  }

  toJson(pokemon) {
    const { name, description, habitat, isLegendary } = pokemon;

    return { name, description, habitat, isLegendary };
  }
}
