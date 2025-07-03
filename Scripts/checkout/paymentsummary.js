import { cart } from "../../data/cart-oop.js"; 
import { FormatMoney } from "../utils/money.js";
import { getproduct } from "../../data/products.js";
import { delivery, Otoday } from "../../data/deliveryoptions-oop.js";
import {orders} from "../../data/orders-oop.js";
import { renderOrderSummary } from "./ordersumary.js";



export function renderPaymentsumary() {
  let totalItems = 0;
  let totalPrice = 0;
  let shippingCost = 0;
  let taxRate = 0.1;
  let taxAmount = 0;
  let orderTotal = 0;
  let subtotal = 0;
  cart.CartItems.forEach(cartItem => {
    const product = getproduct(cartItem.Id);
    totalItems  += cartItem.quantity;
    totalPrice += (cartItem.quantity * product.priceCents);
    shippingCost += delivery.getdeliveryPrice(cartItem.deliveryOptionid);
    subtotal = totalPrice + shippingCost;
    taxAmount = subtotal * taxRate;
    orderTotal = subtotal + taxAmount;
  });
  let paymentSumaryHTML =`
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${totalItems}):</div>
      <div class="payment-summary-money">$${FormatMoney(totalPrice)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${FormatMoney(shippingCost)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${FormatMoney(subtotal)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${FormatMoney(taxAmount)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${FormatMoney(orderTotal)}</div>
    </div>

    <button class="place-order-button button-primary js-place-order-button text-decoration-none">
      <a href="./orders.html"  style="text-decoration: none; color:#000;">Place your order</a>
      
    </button>
  `;
  document.querySelector('.js-payment-summary').innerHTML = paymentSumaryHTML;

  document.querySelector('.js-place-order-button').addEventListener('click', function() {
    if (orderTotal !== 0) {
      let orderId = crypto.randomUUID();
      orders.orderdetails.unshift({
        orderId: orderId,
        orderdate: Otoday,
        total: FormatMoney(orderTotal),
        orderItems: cart.CartItems.map(cartItem => {
          const product = getproduct(cartItem.Id);
          let deliveryOptionid = cartItem.deliveryOptionid;
          let deliveryOption = delivery.deliveryOptions.find(option => option.id === deliveryOptionid);
          return {
            Id: cartItem.Id,
            quantity: cartItem.quantity,
            deliverydate: delivery.getDeliveryDateorder(deliveryOption.deliveryDays),
            productName: product.name,
            image: product.image,
          };
        })
      });
      orders.saveCart();
      cart.CartItems = [];
      cart.saveCart();
      renderOrderSummary();
      renderPaymentsumary();
    }
  });
};