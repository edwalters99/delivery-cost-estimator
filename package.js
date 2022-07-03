class Package {
  constructor(pkgID, pkgWeightInKg, pkgDistanceInKm, baseDeliveryCost) {
    this.pkgID = pkgID;
    this.pkgWeightInKg = pkgWeightInKg;
    this.pkgDistanceInKm = pkgDistanceInKm;
    this.baseDeliveryCost = baseDeliveryCost;
    this.discount = 0;
    this.totalExDiscount =
      baseDeliveryCost + pkgWeightInKg * 10 + pkgDistanceInKm * 5;
    this.total = this.totalExDiscount - this.discount;
  }

  getSummary() {
    return `${this.pkgID} ${this.discount} ${this.total}`;
  }

  checkDiscountValid(offerCode, offersData) {
    if (!offerCode || !offersData[offerCode] || this.discount !== 0) {
      return false;
    }
    if (
      offersData[offerCode]["distanceMin"] > this.pkgDistanceInKm ||
      offersData[offerCode]["distanceMax"] < this.pkgDistanceInKm
    ) {
      return false;
    }
    if (
      offersData[offerCode]["weightMin"] > this.pkgWeightInKg ||
      offersData[offerCode]["weightMax"] < this.pkgWeightInKg
    ) {
      return false;
    }

    return true;
  }

  applyDiscount(offerCode, offersData) {
    this.discount =
      (this.totalExDiscount * offersData[offerCode]["discountPercent"]) / 100;
    this.total = this.totalExDiscount - this.discount;
    // console.log(this.discount)
    // console.log(this.total)
  }
}

module.exports = Package;
