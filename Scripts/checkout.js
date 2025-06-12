import {cart, addToCart, removeFromCart, updateCartQuantity, saveCart, updateDeliveryOption} from '../data/cart.js';
import {products} from '../data/products.js';
import { FormatMoney } from './utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import {deliveryOptions} from '../data/deliveryoptions.js';

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
  let deliveryOptionid = CartItem.deliveryOptionid;
  let deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionid);
  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
  const formattedDate = deliveryDate.format('dddd, MMMM D');

  cartSummaryHTML += `
  <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
    <div class="delivery-date">
      Delivery date: ${formattedDate}
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
        ${deliveryOptionsHTML(matchingItem, CartItem)}
      </div>
    </div>
  </div>`;
});

function deliveryOptionsHTML(matchingItem, CartItem){
  let deliveryOptionHTML = ``;
  deliveryOptions.forEach((deliveryOption) => {
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'day');
    const formattedDate = deliveryDate.format('dddd, MMMM D');
    const price = deliveryOption.priceCents === 0 ? 'FREE' : `$${FormatMoney(deliveryOption.priceCents)} -`;
    const ischecked = deliveryOption.id === CartItem.deliveryOptionid ;
    deliveryOptionHTML +=
      `
        <div class="delivery-option js-delivery-option"
          data-delivery-option-id="${deliveryOption.id}"
          data-product-id="${matchingItem.id}">
          <input type="radio"
            ${ischecked ? 'checked' : ''}
            class="delivery-option-input"
            name="delivery-option-${matchingItem.id}">
          <div>
            <div class="delivery-option-date">
              ${formattedDate}
            </div>
            <div class="delivery-option-price">
              ${price} Shipping
            </div>
          </div>
        </div>
      `
  });
  return deliveryOptionHTML;
}

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



document.querySelector('.js-cart-summary').addEventListener('click', (event) => {
  if (event.target.classList.contains('js-update-link')) {
    const link = event.target;
    if (link.querySelector('input')) return;
    const productId = link.dataset.productId;
    const currentQuantity = document.querySelector(`.js-cart-item-container-${productId} .quantity-label`).textContent;
    link.innerHTML = `
    <span class="js-update-button-${productId}">
      <input type="number" min="1" max="10" value="${currentQuantity}" style="width:40px; margin-right:5px;" class="js-update-input">
      <span class="js-save-link link-primary">Save</span>
    </span>`;
  }
  
  if (event.target.classList.contains('js-save-link')) {
    const saveBtn = event.target;
    const link = saveBtn.closest('.js-update-link');
    const productId = link.dataset.productId;
    const input = link.querySelector('.js-update-input');
    const newQuantity = parseInt(input.value, 10);
    
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
    
    link.innerHTML = `Update`;
    
    document.querySelector(`.js-cart-item-container-${productId} .quantity-label`).textContent = newQuantity;
    document.querySelector('.js-checkout-cart-quantity').innerHTML = `${updateCartQuantity()} items`;
  }
});

document.querySelectorAll('.js-delivery-option').forEach((element) => {
  element.addEventListener('click', () => {
    const productId = element.dataset.productId;
    const deliveryOptionId = parseInt(element.dataset.deliveryOptionId, 10);
    updateDeliveryOption(productId, deliveryOptionId);

    location.reload();
  });
});
