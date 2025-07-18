import { orders, formatOrderDate } from "../data/orders-oop.js";
import { renderOrderItemsHeader } from "./checkout/checkoutheader.js";
import { getproduct,loadProductsfetch } from '../data/products.js';
import { FormatMoney } from "./utils/money.js";

loadProductsfetch().then(() => {
  renderOrders();
  renderOrderItemsHeader();
});
orders.loadFromCart();
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
              <div>${formatOrderDate(order.orderTime)}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${FormatMoney(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>#${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid js-order-details-${order.id}">
        </div>
      </div>
    `;
    order.products.forEach(item => {
      const productnow = getproduct(item.productId);
      orderdetailsHTML += `
        <div class="product-image-container">
          <img src="${productnow.image}" class="product-image">
        </div>

        <div class="product-details">
          <div class="product-name">
            ${productnow.name}
          </div>
          <div class="product-delivery-date">
            Arriving on: ${formatOrderDate(item.estimatedDeliveryTime)}
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
          <button class="track-package-button button-secondary js-track-package-button" data-order-id="${order.id}" data-item-id="${productnow.id}">
            Track package
          </button>
        </div>
      `;
    });
    document.querySelector('.js-orders-container').innerHTML += orderHTML;
    document.querySelector(`.js-order-details-${order.id}`).innerHTML += orderdetailsHTML;
  });
    // Add event listeners after all DOM elements are created
  document.querySelectorAll('.js-track-package-button').forEach(button => {
    button.addEventListener('click', () => {
      const orderId = button.dataset.orderId;
      const itemId = button.dataset.itemId;
      const productnow = getproduct(itemId);
      let order = orders.orderdetails.find(option => option.id === orderId);
      let item = order.products.find(item => item.productId === itemId);
      
      // Store tracking data in localStorage instead of trying to reassign the constant
      const trackingInfo = {
        deliverydate: item.estimatedDeliveryTime,
        productName: productnow.name,
        quantity: item.quantity,
        image: productnow.image,
      };
      localStorage.setItem('currentTrackingItem', JSON.stringify(trackingInfo));
      window.location.href = 'tracking.html';
    });
  });
};

