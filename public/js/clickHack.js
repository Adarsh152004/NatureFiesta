export function setupEventListeners() {
  document.addEventListener('DOMContentLoaded', function () {
    const productCards = document.querySelectorAll(
      '.main-content-product-card'
    );
    const categoryCards = document.querySelectorAll(
      '.main-content-categories-card'
    );
    const addCart = document.querySelectorAll(
      '.main-content-product-card_addcart'
    );

    const cart = document.querySelector('.main-bar-cart');

    productCards.forEach((card) => {
      card.addEventListener('click', function (e) {
        if (
          e.target.tagName.toLowerCase() !== 'button' &&
          !e.target.closest('button')
        ) {
          const productId = this.getAttribute('data-id');
          window.location.href = `/product/${productId}`;
        }
      });
    });

    categoryCards.forEach((card) => {
      card.addEventListener('click', function () {
        const categoryId = this.getAttribute('data-id');
        window.location.href = `/categories/${categoryId}`;
      });
    });

    addCart.forEach((add) => {
      add.addEventListener('click', function () {
        const productSlug = this.getAttribute('data-slug');
        console.log('add is working : ' + productSlug);
      });
    });

    cart.addEventListener('click', function () {
      window.location.href = '/cart';
    });

    cart.addEventListener('mouseenter', function () {
      this.style.cursor = 'pointer'; // Change cursor to pointer on hover
    });
  });
}
