import { orders } from "../data/orders-oop.js";
import { renderOrderItems } from "./checkout/checkoutheader.js";

export function renderOrders() {
  // Clear existing content
  document.querySelector('.js-orders-container').innerHTML = '';
  
  orders.orderdetails.forEach(order => {
    let orderdetailsHTML = '';
    const orderHTML = `
      <div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${order.orderdate}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${order.total}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.orderId}</div>
          </div>
        </div>
        <div class="order-details-grid js-order-details-${order.orderId}">
        </div>
      </div>
    `;
    order.orderItems.forEach(item => {
      orderdetailsHTML += `
        <div class="product-image-container">
          <img src="${item.image}" class="product-image">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${item.productName}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${item.deliverydate}
          </div>
          <div class="product-quantity">
            Quantity: ${item.quantity}
          </div>
          <button class="buy-again-button button-primary">
            <img class="buy-again-icon" src="images/icons/buy-again.png">
            <span class="buy-again-message">Buy it again</span>
          </button>
        </div>

        <div class="product-actions">
          <a href="tracking.html">
            <button class="track-package-button button-secondary">
              Track package
            </button>
          </a>
        </div>
      `;
    });
    document.querySelector('.js-orders-container').innerHTML += orderHTML;
    document.querySelector(`.js-order-details-${order.orderId}`).innerHTML += orderdetailsHTML;
  });
}
renderOrderItems();
renderOrders();