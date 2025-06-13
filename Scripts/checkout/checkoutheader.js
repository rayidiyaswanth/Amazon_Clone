import { updateCartQuantity } from "../../data/cart.js";

export function renderCheckoutHeader() {
  document.querySelector('.js-checkout-cart-quantity').innerHTML = `${updateCartQuantity()} items`;
}