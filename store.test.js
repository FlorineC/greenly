import { Store, DiscountOffer } from "./store";

describe("Store", () => {
  it("should decrease the discount and expiresIn", () => {
    expect(
      new Store([new DiscountOffer("test", 2, 3)]).updateDiscounts()
    ).toEqual([new DiscountOffer("test", 1, 2)]);
  });

  it("should lowered the discount by 2 each day when the expiration date has passed", () => {
    expect(
      new Store([new DiscountOffer("test", 0, 3)]).updateDiscounts()
    ).toEqual([new DiscountOffer("test", -1, 1)]);
  });

  it("should increase the discount by 1 each day when the partner is Naturalia", () => {
    expect(
      new Store([new DiscountOffer("Naturalia", 2, 3)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Naturalia", 1, 4)]);
  });

  it("should increase the discount by 2 each day when the partner is Naturalia and the expiration date has passed", () => {
    expect(
      new Store([new DiscountOffer("Naturalia", 0, 3)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Naturalia", -1, 5)]);
  });

  it("should never have a discount increase to a value of more than 50", () => {
    expect(
      new Store([new DiscountOffer("Naturalia", 2, 50)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Naturalia", 1, 50)]);
  });

  it("should never have a discount increase to a value of more than 50 when Naturalia is expired", () => {
    expect(
      new Store([new DiscountOffer("Naturalia", 0, 50)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Naturalia", -1, 50)]);
  });

  it("should never have a discount expires when the partner is Ilek", () => {
    expect(
      new Store([new DiscountOffer("Ilek", 2, 50)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Ilek", 2, 50)]);
  });

  it("should never have a discount decreases by 1 each day when the partner is Ilek", () => {
    expect(
      new Store([new DiscountOffer("Ilek", 2, 50)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Ilek", 2, 50)]);
  });

  it("should increase the discount by 1 when the partner is Vinted and the expiration date is > 10", () => {
    expect(
      new Store([new DiscountOffer("Vinted", 11, 3)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Vinted", 10, 4)]);
  });

  it("should increase the discount by 2 when the partner is Vinted and the expiration date is <= 10 and > 5", () => {
    expect(
      new Store([new DiscountOffer("Vinted", 10, 3)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Vinted", 9, 5)]);
  });

  it("should increase the discount by 3 when the partner is Vinted and the expiration date is <=5", () => {
    expect(
      new Store([new DiscountOffer("Vinted", 5, 3)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Vinted", 4, 6)]);
  });

  it("should drop the discount to 0 when the partner is Vinted and the expiration date is <=0", () => {
    expect(
      new Store([new DiscountOffer("Vinted", 0, 3)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Vinted", -1, 0)]);
  });

  it("should never have a discount < 0", () => {
    expect(
      new Store([new DiscountOffer("Vinted", 0, 0)]).updateDiscounts()
    ).toEqual([new DiscountOffer("Vinted", -1, 0)]);
  });

  it("should decrease the discount by 2 when the partner is BackMarket", () => {
    expect(
      new Store([new DiscountOffer("BackMarket", 1, 4)]).updateDiscounts()
    ).toEqual([new DiscountOffer("BackMarket", 0, 2)]);
  });

  it("should decrease the discount by 4 when the partner is BackMarket and the expiration date is <= 0", () => {
    expect(
      new Store([new DiscountOffer("BackMarket", 0, 4)]).updateDiscounts()
    ).toEqual([new DiscountOffer("BackMarket", -1, 0)]);
  });
});
