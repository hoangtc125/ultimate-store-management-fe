function Product (
  {
    name,
    nickname,
    priceIn,
    brand,
    quantity,
    priceOut,
    images,
  }
) {
  this.name = name;
  this.nickname = nickname;
  this.priceIn = priceIn;
  this.brand = brand;
  this.quantity = quantity;
  this.priceOut = priceOut;
  this.images = images;
}

function ProductResponse (
  {
    name,
    nickname,
    priceIn,
    brand,
    quantity,
    priceOut,
    images,
    is_disabled,
    id,
  }
) {
  this.name = name;
  this.nickname = nickname;
  this.priceIn = priceIn;
  this.brand = brand;
  this.quantity = quantity;
  this.priceOut = priceOut;
  this.images = images;
  this.is_disabled = is_disabled;
  this.id = id;
}

export { Product, ProductResponse} 