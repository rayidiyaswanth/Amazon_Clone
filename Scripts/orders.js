import { orders } from "../data/orders-oop.js";
import { renderOrderItemsHeader } from "./checkout/checkoutheader.js";
import { trackingData } from "../data/tracking-data.js";

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
            <div>#${order.orderId}</div>
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
            <button class="track-package-button button-secondary js-track-package-button" data-order-id="${order.orderId}" data-item-id="${item.Id}">
              Track package
            </button>
          </a>
        </div>
      `;
    });
    document.querySelector('.js-orders-container').innerHTML += orderHTML;
    document.querySelector(`.js-order-details-${order.orderId}`).innerHTML += orderdetailsHTML;
  });
    // Add event listeners after all DOM elements are created
  document.querySelectorAll('.js-track-package-button').forEach(button => {
    button.addEventListener('click', () => {
      const orderId = button.dataset.orderId;
      const itemId = button.dataset.itemId;
      let order = orders.orderdetails.find(option => option.orderId === orderId);
      let item = order.orderItems.find(item => item.Id === itemId);
      
      // Store tracking data in localStorage instead of trying to reassign the constant
      const trackingInfo = {
        deliverydate: item.deliverydate,
        productName: item.productName,
        quantity: item.quantity,
        image: item.image,

      };
      localStorage.setItem('currentTrackingItem', JSON.stringify(trackingInfo));
    });
  });
};


renderOrderItemsHeader();
renderOrders();