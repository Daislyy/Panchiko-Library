// Variabel global untuk menyimpan data produk
let allProducts = [];

async function ambilData() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    allProducts = data; // Simpan data produk ke variabel global
    displayProducts(data);
  } catch (error) {
    console.log("Data Error", error);
  }
}

function displayProducts(products) {
  const container = document.getElementById("data-product");
  container.innerHTML = ""; // Kosongkan container sebelum menampilkan hasil baru
  container.className =
    "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6";

  products.forEach((post) => {
    const postElement = document.createElement("div");
    postElement.className =
      "bg-white p-4 rounded-lg shadow hover:shadow-md transition cursor-pointer";
    postElement.onclick = () => lihatDetail(post.id);

    postElement.innerHTML = `
      <div class="border p-4 rounded-lg bg-white">
        <img src="${post.image}" alt="${post.title}" 
             class="w-50 h-40 object-contain mb-4 mx-auto">
      </div>
      <div class="mt-2">
        <h3 class="text-md font-extrabold font-serif text-gray-800 line-clamp-2 mb-1 merriweather">${post.title}</h3>
        <h3 class="text-md font-medium font-serif text-gray-800 line-clamp-2 mb-1 truncate">${post.description}</h3>
        <p class="text-green text-lg font-semibold py-1 text-green-700">$${post.price}</p>
        <p class="text-yellow-300 text-lg mb-2">★★★★★</p>
        <button class="mt-2 bg-[#263034] text-white px-4 py-2 rounded">Add to Cart</button>
      </div>
    `;

    container.appendChild(postElement);

    const addToCartBtn = postElement.querySelector("button");
    addToCartBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      tambahKeCart(post);
    });
  });
}

function searchProducts() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();

  if (searchTerm.trim() === "") {
    // Jika search kosong, tampilkan semua produk
    displayProducts(allProducts);
    return;
  }

  const filteredProducts = allProducts.filter(
    (product) =>
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
  );

  displayProducts(filteredProducts);
}

// Fungsi-fungsi lainnya tetap sama
function lihatDetail(id) {
  window.location.href = `detailproduk.html?id=${id}`;
}

function tambahKeCart(produk) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const index = cart.findIndex((item) => item.id === produk.id);

  if (index !== -1) {
    cart[index].quantity += 1;
  } else {
    cart.push({
      id: produk.id,
      title: produk.title,
      price: produk.price,
      quantity: 1,
      image: produk.image,
      color: "Default",
      package: "Standard",
    });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Produk ditambahkan ke keranjang!");
}

// Panggil fungsi ambilData saat halaman dimuat
document.addEventListener("DOMContentLoaded", ambilData);
