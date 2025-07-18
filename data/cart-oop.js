function Cart(localstoragekey){
  const cart = {
    CartItems:undefined,

    loadFromCart: function() {
      this.CartItems = JSON.parse(localStorage.getItem(localstoragekey));
      if(!this.CartItems){
      this.CartItems = [  
      {productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 2,
      deliveryOptionid: 1,},
      {productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
      deliveryOptionid: 2,},];
      }
    },

    saveCart: function() {
    localStorage.setItem(localstoragekey, JSON.stringify(this.CartItems));
    },

    getcartproduct: function(productId) {
      let machingItem;
      this.CartItems.forEach(function(CartItem) {
        if (CartItem.productId === productId) {
          machingItem = CartItem;
        }
      });
      return machingItem;     
    },

    addToCart: function(productId, quantity) {
      let machingItem = this.getcartproduct(productId);

      if (machingItem) {
        machingItem.quantity+= quantity;
      } 
      else{
        this.CartItems.push({
          productId: productId,
          quantity: quantity,
          deliveryOptionid: 1,
        });
      }
      this.saveCart();
    },

    removeFromCart: function(productId) {
      this.CartItems.forEach((CartItem) => {
        if (CartItem.productId === productId) {
          this.CartItems.splice(this.CartItems.indexOf(CartItem), 1);
        }
      });
      this.saveCart();
    },
    
    updateCartQuantity: function() {
      let cartQuantity = 0;
      this.CartItems.forEach(CartItem => {
        cartQuantity += CartItem.quantity;
      });
      return cartQuantity;
    },

    updateDeliveryOption: function(productId, deliveryOptionid) {
      let machingItem = this.getcartproduct(productId);
    
      machingItem.deliveryOptionid = deliveryOptionid;
      this.saveCart();
    },

  };
  return cart;
};

const cart = Cart('cart-oop');

cart.loadFromCart();

export { cart };