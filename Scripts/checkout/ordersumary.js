import {cart} from '../../data/cart-oop.js';
import {getproduct} from '../../data/products.js';
import { FormatMoney } from '../utils/money.js';
import { renderPaymentsumary } from './paymentsummary.js';
import {renderCheckoutHeader} from './checkoutheader.js';
import { delivery } from '../../data/deliveryoptions-oop.js';


export function renderOrderSummary() {
  // Make cart available globally for debugging
  window.cart = cart;
  
  cart.updateCartQuantity();
  renderCheckoutHeader();
  let cartSummaryHTML = ``;

  cart.CartItems.forEach(CartItem => {
    const productId = CartItem.productId;
    let matchingItem = getproduct(productId);
    let deliveryOptionid = CartItem.deliveryOptionid;
    let deliveryOption = delivery.deliveryOptions.find(option => option.id === deliveryOptionid);
    const formattedDate = delivery.getDeliveryDate(deliveryOption.deliveryDays);

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
    delivery.deliveryOptions.forEach((deliveryOption) => {
      const formattedDate = delivery.getDeliveryDate(deliveryOption.deliveryDays);
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
        cart.removeFromCart(productId);
        renderOrderSummary();
        renderPaymentsumary();
      });
    });



  document.querySelector('.js-cart-summary').addEventListener('click', (event) => {
    if (event.target.classList.contains('js-update-link')) {
      const link = event.target;
      if (link.querySelector('input')) return;
      const productId = link.dataset.productId;
      const currentQuantity = document.querySelector(`.js-cart-item-container-${productId} .quantity-label`).textContent;
      link.innerHTML = `
        <input type="number" min="1" max="10" value="${currentQuantity}" style="width:40px; margin-right:5px;" class="js-update-input">
        <span class="js-save-link link-primary" data-product-id="${productId}">Save</span>
      `;
    }
    
    if (event.target.classList.contains('js-save-link')) {
      const saveBtn = event.target;
      const productId = saveBtn.dataset.productId;
      if (!productId) {
        console.error('Could not find product ID on save button');
        return;
      }
      const link = saveBtn.parentElement; 
      const input = link.querySelector('.js-update-input');
      if (!input) {
        console.error('Could not find input element');
        return;
      }
      const newQuantity = parseInt(input.value, 10);
      
      if (isNaN(newQuantity) || newQuantity < 1 || newQuantity > 10) {
        alert('Please enter a valid quantity between 1 and 10');
        return;
      }
      
      cart.CartItems.forEach(item => {
        if (item.Id === productId) {
          item.quantity = newQuantity;
        }
      });
      cart.saveCart();
      
      link.innerHTML = `Update`;
      
      document.querySelector(`.js-cart-item-container-${productId} .quantity-label`).textContent = newQuantity;
      renderCheckoutHeader();
      renderPaymentsumary();
    }
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const productId = element.dataset.productId;
      const deliveryOptionId = parseInt(element.dataset.deliveryOptionId, 10);
      cart.updateDeliveryOption(productId, deliveryOptionId);
      renderOrderSummary();
      renderPaymentsumary()
    });
  });
}