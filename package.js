class Package {
  #pkgID;
  #pkgWeightInKg;
  #pkgDistanceInKm;
  #offerCode;
  #discount;
  #totalExDiscount;
  #total;

  constructor(
    pkgID,
    pkgWeightInKg,
    pkgDistanceInKm,
    baseDeliveryCost,
    offerCode
  ) {
    this.#pkgID = pkgID;
    this.#pkgWeightInKg = pkgWeightInKg;
    this.#pkgDistanceInKm = pkgDistanceInKm;
    this.#offerCode = offerCode;
    this.#discount = 0;
    this.#totalExDiscount =
      baseDeliveryCost + pkgWeightInKg * 10 + pkgDistanceInKm * 5;
    this.#total = this.#totalExDiscount - this.#discount;
  }

  // for testing purposes
  getDiscount() {
    return this.#discount;
  }
  // for testing purposes
  getTotal() {
    return this.#total;
  }

  getSummary() {
    return `${this.#pkgID} ${this.#discount} ${this.#total}`;
  }

  checkDiscountValid(offersData) {
    if (
      !this.#offerCode ||
      !offersData[this.#offerCode] ||
      this.#discount !== 0
    ) {
      return false;
    }
    if (
      offersData[this.#offerCode]["distanceMin"] > this.#pkgDistanceInKm ||
      offersData[this.#offerCode]["distanceMax"] < this.#pkgDistanceInKm
    ) {
      return false;
    }
    if (
      offersData[this.#offerCode]["weightMin"] > this.#pkgWeightInKg ||
      offersData[this.#offerCode]["weightMax"] < this.#pkgWeightInKg
    ) {
      return false;
    }

    return true;
  }

  applyDiscount(offersData) {
    this.#discount =
      (this.#totalExDiscount * offersData[this.#offerCode]["discountPercent"]) /
      100;
    this.#total = this.#totalExDiscount - this.#discount;
    return [this.#discount, this.#total]; // for testing purposes
  }
}

module.exports = Package;
