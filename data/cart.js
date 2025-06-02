export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
  cart = [  
  {Id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2,},
  {Id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1,}];
}

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
  saveCart();
}

export function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

export function removeFromCart(productId) {
  cart.forEach((CartItem) => {
    if (CartItem.Id === productId) {
      cart.splice(cart.indexOf(CartItem), 1);
    }
  });
  saveCart();
}

export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach(CartItem => {
    cartQuantity += CartItem.quantity;
  });
  return cartQuantity;
}