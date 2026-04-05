module.exports = class Pokemon {
  constructor(name, description, habitat, isLegendary) {
    this._name = name;
    this._description = description;
    this._habitat = habitat;
    this._isLegendary = isLegendary;
  }

  get name() {
    return this._name;
  }

  get description() {
    return this._description;
  }

  get habitat() {
    return this._habitat;
  }

  get isLegendary() {
    return this._isLegendary;
  }
};
