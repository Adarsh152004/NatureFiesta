document.addEventListener('DOMContentLoaded', function () {
  const productCards = document.querySelectorAll('.main-content-product-card');
  const categoryCards = document.querySelectorAll(
    '.main-content-categories-card'
  );
  const cart = document.querySelector('.main-bar-cart');

  productCards.forEach((card) => {
    card.addEventListener('click', function () {
      const productId = this.getAttribute('data-id'); // Get the product ID
      window.location.href = `/product/${productId}`; // Redirect to the product page
    });
  });

  categoryCards.forEach((card) => {
    card.addEventListener('click', function () {
      const categoryId = this.getAttribute('data-id');
      window.location.href = `/categories/${categoryId}`;
    });
  });

  cart.addEventListener('click', function () {
    const cartId = this.getAttribute('data-id');
    window.location.href = '/cart';
  });

  cart.addEventListener('mouseenter', function () {
    this.style.cursor = 'pointer'; // Change cursor to pointer on hover
  });
});
