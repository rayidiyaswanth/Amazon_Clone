import {cart, addToCart, removeFromCart, updateCartQuantity, saveCart} from '../data/cart.js';
import {products} from '../data/products.js';
import { FormatMoney } from './utils/money.js';

updateCartQuantity();
document.querySelector('.js-checkout-cart-quantity').innerHTML = `${updateCartQuantity()} items`;

let matchingItem;
let cartSummaryHTML = ``;

cart.forEach(CartItem => {
  const productId = CartItem.Id;
  products.forEach(product => {
    if (product.id === productId) {
      matchingItem = product;
    }
  });
  cartSummaryHTML += `
  <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src="${matchingItem.image}">

      <div class="cart-item-details">
        <div class="product-name">
          ${matchingItem.name}
        </div>
        <div class="product-price">
          $${FormatMoney(matchingItem.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label">${CartItem.quantity}</span>
          </span>
          <span data-product-id="${matchingItem.id}" class="update-quantity-link link-primary js-update-link">
            Update 
          </span>
          <span data-product-id="${matchingItem.id}" class="delete-quantity-link link-primary js-delete-link">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`;
});


document.querySelector('.js-cart-summary').innerHTML = cartSummaryHTML;

document.querySelectorAll('.js-delete-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      const cartItemContainer = document.querySelector(`.js-cart-item-container-${productId}`);
      removeFromCart(productId);
      cartItemContainer.remove();
      updateCartQuantity();
      document.querySelector('.js-checkout-cart-quantity').innerHTML = `${updateCartQuantity()} items`;
    });
  });



document.querySelectorAll('.js-update-link')
  .forEach((link) => {
    link.addEventListener('click', () => {
      // Prevent multiple input fields
      if (link.querySelector('input')) return;
      const productId = link.dataset.productId;
      const currentQuantity = document.querySelector(`.js-cart-item-container-${productId} .quantity-label`).textContent;
      
      link.innerHTML = `
        <input type="number" min="1" max="10" value="${currentQuantity}" style="width:40px; margin-right:5px;" class="js-update-input">
        <span class="js-save-link link-primary">Save</span>
      `;
      

      const input = link.querySelector('.js-update-input');
      const saveBtn = link.querySelector('.js-save-link');

      saveBtn.addEventListener('click', () => {
        const newQuantity = parseInt(input.value, 10);
        
        // Validate input
        if (isNaN(newQuantity) || newQuantity < 1 || newQuantity > 10) {
          alert('Please enter a valid quantity between 1 and 10');
          return;
        }

        cart.forEach(item => {
          if (item.Id === productId) {
            item.quantity = newQuantity;
          }
        });
        saveCart();

        
        document.querySelector(`.js-cart-item-container-${productId} .quantity-label`).textContent = newQuantity;
        document.querySelector('.js-checkout-cart-quantity').innerHTML = `${updateCartQuantity()} items`;
      });
    });
  });
