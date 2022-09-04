function Customer (
  {
    name = "Vãng lai",
    phone = "",
    address = "",
    pricePay = 0,
    priceBack = 0,
  }
) {
  this.name = name
  this.phone = phone
  this.address = address
  this.pricePay = pricePay
  this.priceBack = priceBack
}

export default Customer