export const cart = [];

export function addToCart(productId, quantity) {
  let machingItem;
  cart.forEach(CartItem => {
    if (CartItem.Id === productId) {
      machingItem = CartItem;
    }
  });

  if (machingItem) {
    machingItem.quantity+= quantity;
  } 
  else{
    cart.push({
      Id: productId,
      quantity: quantity,
    });
  }
}