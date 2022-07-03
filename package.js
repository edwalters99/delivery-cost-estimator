class Package {
  constructor(pkgID, pkgWeightInKg, pkgDistanceInKm, baseDeliveryCost, offerCode) {
    this.pkgID = pkgID;
    this.pkgWeightInKg = pkgWeightInKg;
    this.pkgDistanceInKm = pkgDistanceInKm;
    this.baseDeliveryCost = baseDeliveryCost;
    this.offerCode = offerCode;
    this.discount = 0;
    this.totalExDiscount =
      baseDeliveryCost + pkgWeightInKg * 10 + pkgDistanceInKm * 5;
    this.total = this.totalExDiscount - this.discount;
  }

  getSummary() {
    return `${this.pkgID} ${this.discount} ${this.total}`;
  }

  checkDiscountValid(offersData) {
    if (!this.offerCode || !offersData[this.offerCode] || this.discount !== 0) {
      return false;
    }
    if (
      offersData[this.offerCode]["distanceMin"] > this.pkgDistanceInKm ||
      offersData[this.offerCode]["distanceMax"] < this.pkgDistanceInKm
    ) {
      return false;
    }
    if (
      offersData[this.offerCode]["weightMin"] > this.pkgWeightInKg ||
      offersData[this.offerCode]["weightMax"] < this.pkgWeightInKg
    ) {
      return false;
    }

    return true;
  }

  applyDiscount(offersData) {
    this.discount =
      (this.totalExDiscount * offersData[this.offerCode]["discountPercent"]) / 100;
    this.total = this.totalExDiscount - this.discount;
    // console.log(this.discount)
    // console.log(this.total)
  }
}

module.exports = Package;
