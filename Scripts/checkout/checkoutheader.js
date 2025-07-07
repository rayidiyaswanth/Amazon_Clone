import { cart } from "../../data/cart-oop.js";

export function renderCheckoutHeader() {
  document.querySelector('.js-checkout-cart-quantity').innerHTML = `${cart.updateCartQuantity()} items`;
}

export function renderOrderItemsHeader() {
  document.querySelector('.js-checkout-cart-quantity').innerHTML = `${cart.updateCartQuantity()}`;
}