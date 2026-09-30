function saveddata() {
    let saveddata = localStorage.setItem("cartproduct", JSON.stringify(cartproduct))

}

function loaddata() {
    let data = localStorage.getItem("cartproduct")
    if (data) {
        cartproduct = JSON.parse(data)
    }
    displaydata()
}

let products = [
    {
        id: 1,
        name: "Fuel for builders - Brown",
        price: 899,
        image: "../Images/fuel-for-builders-brown.webp"
    },

    {
        id: 2,
        name: "Ctrl Z - Olive",
        price: 899,
        image: "../Images/ctrlz-olive.webp"
    },

    {
        id: 3,
        name: "That's it - Navi",
        price: 899,
        image: "../Images/thatsit-navi.webp"
    },
    {
        id: 4,
        name: "Fuel for builder - black",
        price: 899,
        image: "../Images/fuelforbuilders-black.webp"
    },
    {
        id: 5,
        name: "Ctrl Z Hoodie - Blue",
        price: 899,
        image: "../Images/ctrlz-blue.webp"
    },
];

let cartproduct = []
let selectedSize = "M";
let selectedQuantity = 1;
const minusBtn = document.querySelector("#minusBtn");
const plusBtn = document.querySelector("#plusBtn");
const quantityText = document.querySelector("#quantity");
const sizeOptions = document.querySelectorAll(".size-option");
const selectedSizeText = document.querySelector("#selectedSize");

if (plusBtn) {
    plusBtn.addEventListener("click", function () {
        selectedQuantity++;
        quantityText.innerText = selectedQuantity;
    });
}

if (minusBtn) {
    minusBtn.addEventListener("click", function () {
        if (selectedQuantity > 1) {
            selectedQuantity--;
            quantityText.innerText = selectedQuantity;
        }
    });
}

sizeOptions.forEach(function (button) {
    button.addEventListener("click", function () {
        sizeOptions.forEach(function (btn) {
            btn.classList.remove("active");
        });
        button.classList.add("active");
        selectedSize = button.innerText;
        selectedSizeText.innerText = selectedSize;
    });
});

const cart = document.querySelector("#btnadd");
const taskcontainer = document.querySelector("#taskcontainer");

if (cart) {
    cart.addEventListener("click", function () {

        let id = cart.dataset.id;

        let product = products.find(function (product) {
            return product.id == id;
        });
        let existproduct = cartproduct.find(function (item) {
            return item.id == product.id && item.size == selectedSize;
        });

        if (existproduct) {
            existproduct.quantity += selectedQuantity;
        } else {
            let cartitem = {
                ...product,
                size: selectedSize,
                quantity: selectedQuantity
            };
            cartproduct.push(cartitem);
        }

        displaydata();
        saveddata();
    });
}

if (taskcontainer) {
    taskcontainer.addEventListener("click", function (event) {

        if (event.target.closest(".btndel")) {
            let button = event.target.closest(".btndel");
            let id = button.dataset.id;
            let size = button.dataset.size;

            cartproduct = cartproduct.filter(function (product) {
                return !(product.id == id && product.size == size);
            });
            displaydata();
            saveddata();
        }

        if (event.target.closest(".btnplus")) {
            let button = event.target.closest(".btnplus");
            let id = button.dataset.id;
            let size = button.dataset.size;

            let product = cartproduct.find(function (product) {
                return product.id == id && product.size == size;
            });
            product.quantity++;
            displaydata();
            saveddata();
        }

        if (event.target.closest(".btnminus")) {
            let button = event.target.closest(".btnminus");
            let id = button.dataset.id;
            let size = button.dataset.size;

            let product = cartproduct.find(function (product) {
                return product.id == id && product.size == size;
            });
            if (product.quantity > 1) {
                product.quantity--;
            }
            displaydata();
            saveddata();
        }
    });
}

function displaydata() {
    taskcontainer.innerHTML = "";

    if (cartproduct.length === 0) {
        taskcontainer.innerHTML = `
            <div class="empty-cart text-center py-5">
                <i class="fa-solid fa-bag-shopping mb-3" style="font-size: 40px; color:#ccc;"></i>
                <p class="mb-0 text-secondary">No products in your cart</p>
            </div>
        `;
        return;
    }

    cartproduct.map(function (product) {
        taskcontainer.innerHTML += `
        <div class="cart-product mb-4">

            <div class="d-flex gap-3">

                <img src="${product.image}"
                     alt="${product.name}"
                     style="width: 80px; height: 80px; object-fit: contain;">

                <div class="flex-grow-1">

                    <h6 class="mb-2">${product.name}</h6>

                    <p class="mb-1">${product.price} EGP</p>
                    <p class="mb-1">Size: ${product.size}</p>

                    <div class="d-flex align-items-center gap-2">

                        <button class="btn btnminus btn-sm btn-outline-secondary" data-id="${product.id}" data-size="${product.size}">
                            -
                        </button>

                        <span>${product.quantity}</span>

                        <button class="btn btn-sm btnplus btn-outline-secondary" data-id="${product.id}" data-size="${product.size}">
                            +
                        </button>

                    </div>

                </div>

                <button class="btn btn-sm btndel text-danger" data-id="${product.id}" data-size="${product.size}">
                    <i class="fa-solid fa-trash"></i>
                </button>

            </div>
            <hr class="mt-4 ">

    `;
    })
    taskcontainer.innerHTML += `
       <div class="align-items-start" >
        <a href="cartdetails.html">
            <button class="btn btn-cart btn-dark w-100">
                Cart details
            </button>
        </a>
  <a href="checkout.html">
           <button class="btn btn-cart btn-primary w-100 mt-2">
            Check out
        </button>
        </a>
       </div>
    `;
}
loaddata()