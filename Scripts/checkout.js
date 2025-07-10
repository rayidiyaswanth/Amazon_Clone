import { renderOrderSummary } from "./checkout/ordersumary.js";
import { renderPaymentsumary} from "./checkout/paymentsummary.js";
import { loadProducts } from "../data/products.js";


loadProducts(() => {
  renderOrderSummary();
  renderPaymentsumary();
});