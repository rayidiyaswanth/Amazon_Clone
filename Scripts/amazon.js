import {cart} from '../data/cart.js';

products.forEach(product => {
  const html = `
  <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${(product.priceCents / 100).toFixed(2)}
          </div>

          <div class="product-quantity-container js-product-quantity">
            <select>
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" 
            data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
  `;
  
document.querySelector('.js-products').innerHTML += html; ;
});

document.querySelectorAll('.js-add-to-cart').forEach(button => {
  button.addEventListener('click', event => {
    const productId = button.dataset.productId;
    const quantity = Number(button.parentElement.querySelector('.js-product-quantity select').value);
    let machingItem;
    cart.forEach(item => {
      if (item.Id === productId) {
        machingItem = item;
      }
    });

    if (machingItem) {
      machingItem.quantity+= quantity;
    } 
    else{
      cart.push({
        Id: productId,
        quantity: quantity,
      });
    }

    let cartQuantity = 0;
    cart.forEach(item => {
      cartQuantity += item.quantity;
    });
    document.querySelector('.js-cart-quantity').innerHTML = cartQuantity;
    const addedToCartElem = button.parentElement.querySelector('.added-to-cart');
    addedToCartElem.classList.add('visible');

    if (addedToCartElem.hideTimeoutId) {
      clearTimeout(addedToCartElem.hideTimeoutId);
    }
    addedToCartElem.hideTimeoutId = setTimeout(() => {
      addedToCartElem.classList.remove('visible');
      addedToCartElem.hideTimeoutId = null;
    }, 2000);
  })
});