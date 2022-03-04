export class DiscountOffer {
  constructor(partnerName, expiresIn, discountRateInPercent) {
    this.partnerName = partnerName;
    this.expiresIn = expiresIn;
    this.discountInPercent = discountRateInPercent;
  }

  updateExpiresIn() {
    switch (this.partnerName) {
      case "Ilek":
        break;
      default:
        this.expiresIn--;
    }
  }

  updateDiscount() {
    switch (this.partnerName) {
      case "Naturalia":
        this.discountInPercent = this.getNewNaturaliaDiscount();
        break;
      case "Vinted":
        this.discountInPercent = this.getNewVintedDiscount();
        break;
      case "BackMarket":
        this.discountInPercent = this.getBackMarketDiscount();
        break;
      case "Ilek":
        break;
      default:
        this.discountInPercent = this.getNewDefaultDiscount();
    }
  }

  getNewDefaultDiscount() {
    if (this.expiresIn <= 0) {
      return this.getDecreasedDiscount(2);
    }
    return this.getDecreasedDiscount(1);
  }

  getBackMarketDiscount() {
    if (this.expiresIn <= 0) {
      return this.getDecreasedDiscount(4);
    }
    return this.getDecreasedDiscount(2);
  }

  getNewNaturaliaDiscount() {
    if (this.expiresIn <= 0) {
      return this.getIncreasedDiscount(2);
    }
    return this.getIncreasedDiscount(1);
  }

  getNewVintedDiscount() {
    if (this.expiresIn <= 10 && this.expiresIn > 5) {
      return this.getIncreasedDiscount(2);
    } else if (this.expiresIn <= 5 && this.expiresIn > 0) {
      return this.getIncreasedDiscount(3);
    } else if (this.expiresIn <= 0) {
      return 0;
    }
    return this.getIncreasedDiscount(1);
  }

  getIncreasedDiscount(increment) {
    const incrementedDiscount = this.discountInPercent + increment;
    if (incrementedDiscount <= 50) {
      return incrementedDiscount;
    }
    return 50;
  }

  getDecreasedDiscount(increment) {
    const decrementedDiscount = this.discountInPercent - increment;
    if (decrementedDiscount >= 0) {
      return decrementedDiscount;
    }
    return 0;
  }
}

export class Store {
  constructor(discountOffers = []) {
    this.discountOffers = discountOffers;
  }
  updateDiscounts() {
    for (let discountOffer of this.discountOffers) {
      discountOffer.updateDiscount();
      discountOffer.updateExpiresIn();
    }

    return this.discountOffers;
  }
}
