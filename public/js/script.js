console.log('entered in script');

document.addEventListener('DOMContentLoaded', function () {
  const productCards = document.querySelectorAll('.main-content-product-card');
  const categoryCards = document.querySelectorAll(
    '.main-content-categories-card'
  );

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
});
