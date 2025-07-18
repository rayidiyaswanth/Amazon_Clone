const orders= {
  orderdetails: [{
      "id": "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
      "orderTime": "2025-08-12T09:13:45.644Z",
      "totalCostCents": 3549,
      "products": [
        {
          "productId": "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          "quantity": 1,
          "estimatedDeliveryTime": "2025-08-15T09:13:45.644Z",
          "variation": null
        },
        {
          "productId": "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
          "quantity": 2,
          "estimatedDeliveryTime": "2025-08-19T09:13:45.644Z",
          "variation": null
        }
      ]
    },
    {
      "id": "b6b6c212-d30e-4d4a-805d-90b52ce6b37d",
      "orderTime": "2025-06-10T09:13:45.644Z",
      "totalCostCents": 4190,
      "products": [
        {
          "productId": "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          "quantity": 2,
          "estimatedDeliveryTime": "2025-06-17T09:13:45.644Z",
          "variation": null
        }
      ]
    }],

  loadFromCart: function() {
    this.orderdetails = JSON.parse(localStorage.getItem('orders'));
    if (!this.orderdetails) {
      this.orderdetails = [];
    }
  },

  addtoorders: function(order) {
    this.orderdetails.unshift(order);
    this.saveCart();
  },

  saveCart: function() {
    localStorage.setItem('orders', JSON.stringify(this.orderdetails));
  },
  
};

export function formatOrderDate(isoDateString) {
  const date = new Date(isoDateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

orders.loadFromCart();
export { orders };


