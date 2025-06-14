import { cart } from "../../data/cart.js"; 
import { FormatMoney } from "../utils/money.js";
import { getproduct } from "../../data/products.js";
import { getdeliveryPrice } from "../../data/deliveryoptions.js";


export function renderPaymentsumary() {
  let totalItems = 0;
  let totalPrice = 0;
  let shippingCost = 0;
  let taxRate = 0.1;
  let taxAmount = 0;
  let orderTotal = 0;
  let subtotal = 0;
  cart.forEach(cartItem => {
    const product = getproduct(cartItem.Id);
    totalItems  += cartItem.quantity;
    totalPrice += (cartItem.quantity * product.priceCents);
    shippingCost += getdeliveryPrice(cartItem.deliveryOptionid);
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

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;
  document.querySelector('.js-payment-summary').innerHTML = paymentSumaryHTML;

}