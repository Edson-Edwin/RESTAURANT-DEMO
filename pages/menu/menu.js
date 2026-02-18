const menuItems = [
    { id: 1, name: "Chicken Biriyani", price: 100, category: "Main", image: "../../assets/biriyani.png" },
    { id: 2, name: "Kerala Sadhya", price: 60, category: "Main", image: "https://as1.ftcdn.net/v2/jpg/17/26/41/18/1000_F_1726411898_uZs3xYKqEL0OLxG0QgtDwz8Vf33ipbtH.jpg" },
    { id: 3, name: "Chicken Mandhi", price: 180, category: "Main", image: "https://imgs.search.brave.com/yjbnUYQv8OdL1XfFDfh8dDvw8z7T11SFHQ52UFeq1Hc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzE0LzM5LzU5LzM5/LzM2MF9GXzE0Mzk1/OTM5MjBfWmJaYVEy/TEN0dlhUODJQYjl2/d1Vuc0xNSmQ1V2ZR/ZWMuanBn" },
    { id: 4, name: "Alfahm Mandhi", price: 200, category: "Main", image: "https://imgs.search.brave.com/mPhgLLlgswa7YQwzPf81fDlp0MFiZf5fswUYNIeokog/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zb29m/aW1hbmRpLmNvbS9p/bWFnZXMvZ2xyOC5q/cGc" },
    { id: 5, name: "Margarita", price: 8, category: "fried", image: "images/drink1.jpg" },
    { id: 6, name: "Mexican Mojito", price: 9, category: "drinks", image: "images/drink2.jpg" }
];

let cart = [];

const itemsContainer = document.getElementById("items-container");
const cartContainer = document.getElementById("cart-items");
const grandTotal = document.getElementById("grand-total");
/* DISPLAY ITEMS */
function displayItems(items) {
    itemsContainer.innerHTML = "";
    items.forEach(item => {
        itemsContainer.innerHTML += `
            <div class="item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-content">
                    <h3>${item.name}</h3>
                    <p class="price">₹${item.price}</p>
                    <button class="add-btn" onclick="addToCart(${item.id})">Add to Cart</button>
                </div>
            </div>
        `;
    });
}

function filterItems(category) {
    document.querySelectorAll(".categories li")
        .forEach(li => li.classList.remove("active"));

    event.target.classList.add("active");

    if (category === "all") {
        displayItems(menuItems);
    } else {
        displayItems(menuItems.filter(item => item.category === category));
    }
}

/* Simple toast popup with icon */
function showToast(message, type = "success") {
    const toast = document.getElementById("toast");
    if (!toast) return;

    const icon = type === "error" ? "✕" : "✓";

    // Set content with icon + message
    toast.innerHTML = `<span class="toast-icon">${icon}</span><span class="toast-message">${message}</span>`;

    // Apply color style
    toast.classList.remove("toast-success", "toast-error");
    if (type === "error") {
        toast.classList.add("toast-error");
    } else {
        toast.classList.add("toast-success");
    }

    toast.classList.add("show");

    clearTimeout(showToast._timeoutId);
    showToast._timeoutId = setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

/* ADD TO CART */
function addToCart(id) {
    const menuItem = menuItems.find(item => item.id === id);
    if (!menuItem) return;

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({ ...menuItem, quantity: 1 });
    }

    updateCart();
    showToast(`${menuItem.name} added to cart`, "success");
}

/* UPDATE CART */
function updateCart() {
    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        cartContainer.innerHTML += `
            <div class="cart-item">
                <div>
                    <strong>${item.name}</strong>
                    <p style="color:#f4b860; font-size:14px;">
                        ₹${item.price} × ${item.quantity} = ₹${itemTotal}
                    </p>
                </div>

                <div class="qty-controls">
                    <button onclick="changeQty(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQty(${item.id}, 1)">+</button>
                </div>
            </div>
        `;
    });

    grandTotal.innerText = total;
}


function changeQty(id, amount) {
    const item = cart.find(item => item.id === id);
    if (!item) return;

    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
        updateCart();
        showToast(`${item.name} removed from cart`, "error");
    } else {
        updateCart();
    }
}

displayItems(menuItems);
// Checkout button click
document.querySelector(".checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        showToast("Your cart is empty!", "error");
        return;
    }

    document.getElementById("confirmModal").style.display = "flex";
});

function closeModal() {
    document.getElementById("confirmModal").style.display = "none";
}

function confirmOrder() {
    closeModal();
    document.getElementById("successScreen").style.display = "flex";
    cart = [];
    updateCart();
}

function closeSuccess() {
    document.getElementById("successScreen").style.display = "none";
}
function openCart() {
    document.getElementById("cartSection").classList.add("active");
    document.getElementById("drawerOverlay").classList.add("active");
}

function closeCart() {
    document.getElementById("cartSection").classList.remove("active");
    document.getElementById("drawerOverlay").classList.remove("active");
}
