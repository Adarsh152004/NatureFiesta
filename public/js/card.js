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

let products = [];

function changeImage(element) {
  document.getElementById('main-product-image').src = element.src;

  const smallImages = document.querySelectorAll('.small-image-box');
  smallImages.forEach((img) => {
    img.classList.remove('active');
  });
  element.parentElement.classList.add('active');
}

async function fetchProducts() {
  try {
    const response = await fetch('/api/products');
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    products = await response.json();
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
}

async function fetchProductById(id) {
  try {
    const response = await fetch(`/api/product/${id}`);
    if (!response.ok) {
      throw new Error('Failed to fetch product');
    }
    const product = await response.json();
    return product;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
}

document.addEventListener('DOMContentLoaded', async function () {
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
});

// Get product ID from URL
function getProductIdFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return parseInt(urlParams.get('id')) || 1; // Default to 1 if no ID found
}

// Get product by ID
function getProductById(id) {
  return products.find((product) => product.id === id) || products[0];
}

// Load product details on the single product page
async function loadProductDetails() {
  const productId = getProductIdFromURL();
  let product;

  // Try to fetch the specific product by ID first
  const fetchedProduct = await fetchProductById(productId);
  if (fetchedProduct) {
    product = fetchedProduct;
  } else {
    // Fall back to the products array if API call fails
    product = getProductById(productId);
  }

  if (product) {
    // Update product name, price, description
    document.getElementById('product-name').textContent = product.name;
    document.getElementById('product-price').textContent =
      `Rs. ${product.price}`;
    document.getElementById('product-description').textContent =
      product.description;

    // Update main image and thumbnails
    const mainImage = document.getElementById('main-product-image');
    if (mainImage) {
      mainImage.src = product.images[0];
    }

    // Update small images
    const smallImages = document.querySelectorAll('.small-image');
    smallImages.forEach((img, index) => {
      if (product.images[index]) {
        img.src = product.images[index];
      }
    });

    // Update rating
    const ratingCount = document.querySelector('.rating-count');
    if (ratingCount) {
      ratingCount.textContent = `(${product.rating}/5)`;
    }
  }
}

// Load related products
function loadRelatedProducts() {
  const currentProductId = getProductIdFromURL();
  const relatedProductsContainer = document.querySelector(
    '.related-products .main-content-products'
  );

  if (relatedProductsContainer) {
    // Clear container
    relatedProductsContainer.innerHTML = '';

    // Filter products to exclude current product
    const relatedProducts = products.filter(
      (product) => product.id !== currentProductId
    );

    // Create product cards
    relatedProducts.forEach((product) => {
      const productCard = document.createElement('div');
      productCard.className = 'main-content-product-card';

      productCard.innerHTML = `
        <a href="sproduct.html?id=${product.id}">
          <img
            class="main-content-product-card_img"
            src="${product.images[0]}"
            alt="${product.name}"
          />
        </a>
        <p class="main-content-product-card_name">${product.name}</p>
        <p class="main-content-product-card_quantity">${product.quantity}</p>
        <div class="main-content-product-card_footer">
          <p class="main-content-product-card_price">${product.price} RS</p>
          <a href="#" class="main-content-product-card_addcart">
            <i class="fa-solid fa-plus"></i>
          </a>
        </div>
      `;

      relatedProductsContainer.appendChild(productCard);
    });
  }
}
