import { renderOrderSummary } from "./checkout/ordersumary.js";
import { renderPaymentsumary} from "./checkout/paymentsummary.js";
import { loadProductsfetch } from "../data/products.js";



loadProductsfetch().then(() => {
  renderOrderSummary();
  renderPaymentsumary();
})