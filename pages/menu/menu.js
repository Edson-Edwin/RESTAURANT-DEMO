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

/* ADD TO CART */
function addToCart(id) {
    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        const item = menuItems.find(item => item.id === id);
        cart.push({ ...item, quantity: 1 });
    }

    updateCart();
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
    item.quantity += amount;

    if (item.quantity <= 0) {
        cart = cart.filter(i => i.id !== id);
    }

    updateCart();
}

displayItems(menuItems);
// Checkout button click
document.querySelector(".checkout-btn").addEventListener("click", () => {
    if (cart.length === 0) {
        alert("Your cart is empty!");
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
