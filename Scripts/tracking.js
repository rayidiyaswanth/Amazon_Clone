import { renderOrderItemsHeader } from "./checkout/checkoutheader.js";

const currentTrackingItem= JSON.parse(localStorage.getItem('currentTrackingItem'));

export function trackPackageButtonClickHandler(currentTrackingItem) {

  document.querySelector('.js-order-tracking').innerHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>

    <div class="delivery-date">
      Arriving on ${currentTrackingItem.deliverydate}
    </div>

    <div class="product-info">
      ${currentTrackingItem.productName}
    </div>

    <div class="product-info">
      Quantity: ${currentTrackingItem.quantity}
    </div>

    <img class="product-image" src="${currentTrackingItem.image}">

    <div class="progress-labels-container">
      <div class="progress-label">
        Preparing
      </div>
      <div class="progress-label current-status">
        Shipped
      </div>
      <div class="progress-label">
        Delivered
      </div>
    </div>

    <div class="progress-bar-container">
      <div class="progress-bar"></div>
    </div>
  `;
};

trackPackageButtonClickHandler(currentTrackingItem);

renderOrderItemsHeader();
