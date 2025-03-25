// index.js

async function initializePage() {
  // First, fetch all products
  await fetchProducts();

  // Check if we're on the product detail page
  const qtyInput = document.getElementById('qty');
  const increaseBtn = document.getElementById('increase-qty');
  const decreaseBtn = document.getElementById('decrease-qty');

  if (qtyInput && increaseBtn && decreaseBtn) {
    increaseBtn.addEventListener('click', function () {
      let currentQty = parseInt(qtyInput.value);
      qtyInput.value = currentQty + 1;
    });

    decreaseBtn.addEventListener('click', function () {
      let currentQty = parseInt(qtyInput.value);
      if (currentQty > 1) {
        qtyInput.value = currentQty - 1;
      }
    });

    // Size button selection
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach((btn) => {
      btn.addEventListener('click', function () {
        sizeButtons.forEach((b) => b.classList.remove('active'));
        this.classList.add('active');
      });
    });

    // Add to cart button
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    if (addToCartBtn) {
      addToCartBtn.addEventListener('click', function () {
        const productId = getProductIdFromURL();
        const quantity = parseInt(qtyInput.value);
        const size = document.querySelector('.size-btn.active').textContent;

        // Add to cart logic
        alert(
          `Added ${quantity} ${size} ${getProductById(productId).name} to cart!`
        );

        // Update cart count (for demo purposes)
        const cartCount = document.querySelector('.cart-count');
        if (cartCount) {
          cartCount.textContent = parseInt(cartCount.textContent) + quantity;
        }
      });
    }

    // Load product details based on URL
    await loadProductDetails();

    // Load related products
    loadRelatedProducts();
  }
}

// Export the function for reuse
export default initializePage;
