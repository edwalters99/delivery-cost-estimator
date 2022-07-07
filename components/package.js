const NP = require('number-precision');

NP.enableBoundaryChecking(false);

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
    offerCode,
  ) {
    this.#pkgID = pkgID;
    this.#pkgWeightInKg = pkgWeightInKg;
    this.#pkgDistanceInKm = pkgDistanceInKm;
    this.#offerCode = offerCode;
    this.#discount = 0;
    const pkgWeightCost = NP.times(pkgWeightInKg, 10);
    const pkgDistanceCost = NP.times(pkgDistanceInKm, 5);
    this.#totalExDiscount = NP.plus(
      pkgWeightCost,
      pkgDistanceCost,
      baseDeliveryCost,
    );
    this.#total = NP.minus(this.#totalExDiscount, this.#discount);
  }

  // for testing purposes
  getDiscount() {
    return this.#discount;
  }

  // for testing purposes
  getTotal() {
    return this.#total;
  }

  // for testing purposes
  getPkgID() {
    return this.#pkgID;
  }

  getSummary() {
    const roundedDiscount = NP.round(this.#discount, 2);
    const roundedTotal = NP.round(this.#total, 2);
    let discountStr;
    let totalStr;
    if (roundedDiscount % 1 === 0) {
      discountStr = String(roundedDiscount);
    } else {
      discountStr = roundedDiscount.toFixed(2); // forces two decimal points only if not an integer
    }
    if (roundedTotal % 1 === 0) {
      totalStr = String(roundedTotal);
    } else {
      totalStr = roundedTotal.toFixed(2);
    }

    return `${this.#pkgID} ${discountStr} ${totalStr}`;
  }

  checkDiscountValid(offersData) {
    if (
      !this.#offerCode
      || !offersData[this.#offerCode]
      || this.#discount !== 0
    ) {
      return false;
    }
    if (
      offersData[this.#offerCode].distanceMin > this.#pkgDistanceInKm
      || offersData[this.#offerCode].distanceMax < this.#pkgDistanceInKm
    ) {
      return false;
    }
    if (
      offersData[this.#offerCode].weightMin > this.#pkgWeightInKg
      || offersData[this.#offerCode].weightMax < this.#pkgWeightInKg
    ) {
      return false;
    }

    return true;
  }

  applyDiscount(offersData) {
    if (this.checkDiscountValid(offersData)) { // already checked in processDiscount - failsafe
      const discountDecimal = NP.divide(
        offersData[this.#offerCode].discountPercent,
        100,
      );
      this.#discount = NP.times(this.#totalExDiscount, discountDecimal);
      this.#total = NP.minus(this.#totalExDiscount, this.#discount);
    }
  }
}

module.exports = Package;
