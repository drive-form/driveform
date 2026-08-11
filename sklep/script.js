const products = [
  {
    id: 1,
    name: "Zestaw Detailingu Premium",
    category: "detailing",
    categoryName: "Detailing",
    price: 149,
    oldPrice: 179,
    tag: "Bestseller",
    image: "https://images.unsplash.com/photo-1607860108855-64acf2078ed9?auto=format&fit=crop&w=900&q=90"
  },
  {
    id: 2,
    name: "Uchwyt Magnetyczny Pro",
    category: "wnetrze",
    categoryName: "Wnętrze",
    price: 89,
    oldPrice: null,
    tag: "Nowość",
    image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=900&q=90"
  },
  {
    id: 3,
    name: "LED Interior Kit",
    category: "oswietlenie",
    categoryName: "Oświetlenie",
    price: 119,
    oldPrice: null,
    tag: "Popularne",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=900&q=90"
  },
  {
    id: 4,
    name: "Zapach DRIVEFORM No. 01",
    category: "akcesoria",
    categoryName: "Akcesoria",
    price: 39,
    oldPrice: null,
    tag: null,
    image: "https://images.unsplash.com/photo-1612277795421-9bc7706a4a34?auto=format&fit=crop&w=900&q=90"
  },
  {
    id: 5,
    name: "Ręcznik do Osuszania XL",
    category: "detailing",
    categoryName: "Detailing",
    price: 59,
    oldPrice: null,
    tag: null,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=90"
  },
  {
    id: 6,
    name: "Organizer do Bagażnika",
    category: "wnetrze",
    categoryName: "Wnętrze",
    price: 99,
    oldPrice: 129,
    tag: "Promocja",
    image: "https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=900&q=90"
  },
  {
    id: 7,
    name: "Latarka Warsztatowa LED",
    category: "oswietlenie",
    categoryName: "Oświetlenie",
    price: 79,
    oldPrice: null,
    tag: null,
    image: "https://images.unsplash.com/photo-1502489597346-dad15683d4c2?auto=format&fit=crop&w=900&q=90"
  },
  {
    id: 8,
    name: "Zestaw Mikrofibr DRIVEFORM",
    category: "akcesoria",
    categoryName: "Akcesoria",
    price: 45,
    oldPrice: null,
    tag: null,
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=90"
  }
];

const productsGrid = document.getElementById("productsGrid");
const productsCount = document.getElementById("productsCount");
const filters = document.querySelectorAll(".filter");

const menuButton = document.getElementById("menuButton");
const menu = document.getElementById("menu");

const searchButton = document.getElementById("searchButton");
const searchBar = document.getElementById("searchBar");
const closeSearch = document.getElementById("closeSearch");
const searchInput = document.getElementById("searchInput");

const cartButton = document.getElementById("cartButton");
const closeCart = document.getElementById("closeCart");
const cart = document.getElementById("cart");
const cartOverlay = document.getElementById("cartOverlay");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");
const deliveryProgress = document.getElementById("deliveryProgress");
const checkoutButton = document.getElementById("checkoutButton");

const newsletterForm = document.getElementById("newsletterForm");
const newsletterMessage = document.getElementById("newsletterMessage");

let activeFilter = "all";
let basket = [];

/* PRODUKTY */

function displayProducts() {
  const searchValue = searchInput.value.toLowerCase().trim();

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      activeFilter === "all" || product.category === activeFilter;

    const matchesSearch =
      product.name.toLowerCase().includes(searchValue) ||
      product.categoryName.toLowerCase().includes(searchValue);

    return matchesCategory && matchesSearch;
  });

  productsGrid.innerHTML = "";

  filteredProducts.forEach((product) => {
    productsGrid.innerHTML += `
      <article class="product-card">
        <div class="product-image">
          ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
          <img src="${product.image}" alt="${product.name}">
        </div>

        <div class="product-info">
          <span class="product-category">${product.categoryName}</span>
          <h3>${product.name}</h3>

          <div class="product-price">
            <strong>${product.price} zł</strong>
            ${product.oldPrice ? `<span>${product.oldPrice} zł</span>` : ""}
          </div>

          <button class="add-button" data-id="${product.id}">
            Dodaj do koszyka
          </button>
        </div>
      </article>
    `;
  });

  productsCount.textContent = `${filteredProducts.length} produktów`;

  document.querySelectorAll(".add-button").forEach((button) => {
    button.addEventListener("click", () => {
      const productId = Number(button.dataset.id);
      addToCart(productId);
    });
  });
}

filters.forEach((filter) => {
  filter.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("active"));
    filter.classList.add("active");

    activeFilter = filter.dataset.filter;
    displayProducts();
  });
});

document.querySelectorAll("[data-filter-link]").forEach((link) => {
  link.addEventListener("click", () => {
    const category = link.dataset.filterLink;

    filters.forEach((filter) => {
      filter.classList.toggle("active", filter.dataset.filter === category);
    });

    activeFilter = category;
    displayProducts();
  });
});

/* MENU MOBILNE */

menuButton.addEventListener("click", () => {
  menu.classList.toggle("active");
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menu.classList.remove("active");
  });
});

/* WYSZUKIWARKA */

searchButton.addEventListener("click", () => {
  searchBar.classList.add("open");
  searchInput.focus();
});

closeSearch.addEventListener("click", () => {
  searchBar.classList.remove("open");
  searchInput.value = "";
  displayProducts();
});

searchInput.addEventListener("input", displayProducts);

/* KOSZYK */

function openCart() {
  cart.classList.add("open");
  cartOverlay.classList.add("open");
}

function hideCart() {
  cart.classList.remove("open");
  cartOverlay.classList.remove("open");
}

cartButton.addEventListener("click", openCart);
closeCart.addEventListener("click", hideCart);
cartOverlay.addEventListener("click", hideCart);

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  const foundItem = basket.find((item) => item.id === productId);

  if (foundItem) {
    foundItem.quantity += 1;
  } else {
    basket.push({ ...product, quantity: 1 });
  }

  updateCart();
  openCart();
}

function updateCart() {
  const quantity = basket.reduce((sum, item) => sum + item.quantity, 0);
  const total = basket.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  cartCount.textContent = quantity;
  cartTotal.textContent = `${total} zł`;

  const progress = Math.min((total / 199) * 100, 100);
  deliveryProgress.style.width = `${progress}%`;

  if (basket.length === 0) {
    cartItems.innerHTML = `<p class="empty-cart">Twój koszyk jest pusty.</p>`;
    return;
  }

  cartItems.innerHTML = "";

  basket.forEach((item) => {
    cartItems.innerHTML += `
      <div class="cart-item">
        <div>
          <h4>${item.name} × ${item.quantity}</h4>
          <p>${item.price * item.quantity} zł</p>
        </div>

        <button class="remove-button" data-id="${item.id}" aria-label="Usuń produkt">
          ×
        </button>
      </div>
    `;
  });

  document.querySelectorAll(".remove-button").forEach((button) => {
    button.addEventListener("click", () => {
      removeFromCart(Number(button.dataset.id));
    });
  });
}

function removeFromCart(productId) {
  const item = basket.find((product) => product.id === productId);

  if (item.quantity > 1) {
    item.quantity -= 1;
  } else {
    basket = basket.filter((product) => product.id !== productId);
  }

  updateCart();
}

checkoutButton.addEventListener("click", () => {
  if (basket.length === 0) {
    alert("Twój koszyk jest pusty.");
    return;
  }

  alert(
    "To jest wersja demonstracyjna. Aby przyjmować prawdziwe płatności, trzeba podłączyć np. Stripe, Przelewy24 lub system WooCommerce."
  );
});

/* NEWSLETTER */

newsletterForm.addEventListener("submit", (event) => {
  event.preventDefault();

  newsletterMessage.textContent =
    "Dziękujemy! Kod rabatowy -10% został wysłany demonstracyjnie.";

  newsletterForm.reset();
});

displayProducts();