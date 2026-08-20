let cart = JSON.parse(localStorage.getItem("cart")) || [];


function loginUser(event) {

    event.preventDefault();

    let email =
        document.getElementById("loginEmail").value;

    let password =
        document.getElementById("loginPassword").value;


    let correctEmail =
        "akshatanagpure200@gmail.com";

    let correctPassword =
        "1234";


    if (
        email === correctEmail &&
        password === correctPassword
    ) {

        localStorage.setItem(
            "loggedIn",
            "true"
        );

        alert("Login successful!");

        window.location.href =
            "home.html";

    } else {

        alert(
            "Invalid email or password!"
        );

    }

}


function logoutUser() {

    localStorage.removeItem("loggedIn");

    window.location.href =
        "login.html";

}


function toggleMenu() {

    let menu =
        document.getElementById("navMenu");

    let icon =
        document.getElementById("menuIcon");


    menu.classList.toggle("show");


    if (menu.classList.contains("show")) {

        icon.classList.remove("fa-bars");

        icon.classList.add("fa-times");

    } else {

        icon.classList.remove("fa-times");

        icon.classList.add("fa-bars");

    }

}


function updateCartCount() {

    let count = 0;


    cart.forEach(function(item) {

        count += item.quantity;

    });


    let cartCount =
        document.getElementById("cartCount");


    if (cartCount) {

        cartCount.innerText = count;

    }

}


function addToCart(button) {

    let card =
        button.parentElement;


    let name =
        card.querySelector("h3").innerText;


    let price =
        parseInt(
            card.querySelector("span")
            .innerText
            .replace("₹", "")
        );


    let image =
        card.querySelector("img")
        .getAttribute("src");


    let existingItem =
        cart.find(function(item) {

            return item.name === name;

        });


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            image: image,

            quantity: 1

        });

    }


    saveCart();


    alert(
        name + " added to cart!"
    );

}


function addDeal(name, price, image) {

    let existingItem =
        cart.find(function(item) {

            return item.name === name;

        });


    if (existingItem) {

        existingItem.quantity++;

    } else {

        cart.push({

            name: name,

            price: price,

            image: image,

            quantity: 1

        });

    }


    saveCart();


    alert(
        name + " added to cart!"
    );

}


function saveCart() {

    localStorage.setItem(
        "cart",
        JSON.stringify(cart)
    );


    updateCartCount();

}


function displayCart() {

    let container =
        document.getElementById(
            "cartContainer"
        );


    if (!container) {

        return;

    }


    container.innerHTML = "";


    if (cart.length === 0) {

        container.innerHTML = `

            <div class="empty-cart">

                <i class="fa fa-shopping-cart"></i>

                <h2>
                    Your cart is empty
                </h2>

                <a href="menu.html">
                    Browse Menu
                </a>

            </div>

        `;


        updateTotal();

        return;

    }


    cart.forEach(function(item, index) {

        let itemTotal =
            item.price * item.quantity;


        container.innerHTML += `

            <div class="cart-item">

                <img
                    src="${item.image}"
                    alt="${item.name}"
                >


                <div class="cart-item-info">

                    <h3>
                        ${item.name}
                    </h3>

                    <p>
                        ₹${item.price}
                    </p>

                </div>


                <div class="qty-box">

                    <button
                        onclick="decreaseQuantity(${index})">
                        -
                    </button>


                    <span>
                        ${item.quantity}
                    </span>


                    <button
                        onclick="increaseQuantity(${index})">
                        +
                    </button>

                </div>


                <strong>
                    ₹${itemTotal}
                </strong>


                <button
                    class="remove"
                    onclick="removeItem(${index})">

                    Remove

                </button>

            </div>

        `;

    });


    updateTotal();

}


function increaseQuantity(index) {

    cart[index].quantity++;

    saveCart();

    displayCart();

}


function decreaseQuantity(index) {

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    saveCart();

    displayCart();

}


function removeItem(index) {

    cart.splice(index, 1);

    saveCart();

    displayCart();

}


function updateTotal() {

    let total = 0;


    cart.forEach(function(item) {

        total +=
            item.price * item.quantity;

    });


    let totalElement =
        document.getElementById("total");


    if (totalElement) {

        totalElement.innerText =
            "Total: ₹" + total;

    }

}


function checkout() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty!"
        );

        return;

    }


    alert(
        "Order placed successfully!"
    );


    localStorage.removeItem("cart");


    cart = [];


    updateCartCount();

    displayCart();

}


function filterCategory(category) {

    let cards =
        document.querySelectorAll(".card");


    cards.forEach(function(card) {

        let cardCategory =
            card.getAttribute(
                "data-category"
            );


        if (
            category === "All" ||
            cardCategory === category
        ) {

            card.style.display = "block";

        } else {

            card.style.display = "none";

        }

    });

}


function searchFood() {

    let input =
        document.getElementById(
            "searchInput"
        );


    if (!input) {

        return;

    }


    let search =
        input.value.toLowerCase();


    let cards =
        document.querySelectorAll(".card");


    cards.forEach(function(card) {

        let name =
            card.querySelector("h3")
            .innerText
            .toLowerCase();


        if (
            name.includes(search)
        ) {

            card.style.display =
                "block";

        } else {

            card.style.display =
                "none";

        }

    });

}


document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateCartCount();

        displayCart();

    }
);