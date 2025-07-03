const orders= {
  orderdetails:undefined,

  loadFromCart: function() {
    this.orderdetails = JSON.parse(localStorage.getItem('orders'));
    if(!this.orderdetails){
    this.orderdetails = [{
      orderId: "27cba69d-4c3d-4098-b42d-ac7fa62b7664",
      orderdate:"August 12",
      total: 35.49,
      orderItems: [
      {Id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 1,
      deliverydate: "August 15",
      productName: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",},
      {Id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
      quantity: 2,
      deliverydate: "August 19",
      productName: "Adults Plain Cotton T-Shirt - 2 Pack",
      image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg"},]},
      {
      orderId: "b6b6c212-d30e-4d4a-805d-90b52ce6b37d",
      orderdate:"June 10",
      total: 41.90,
      orderItems: [
      {Id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 2,
      deliverydate: "June 17",
      productName: "Intermediate Size Basketball",
      image: "images/products/intermediate-composite-basketball.jpg",},]
      },
    ];}
    },

  saveCart: function() {
  localStorage.setItem('orders', JSON.stringify(this.orderdetails));
  },
};

orders.loadFromCart();
export { orders };