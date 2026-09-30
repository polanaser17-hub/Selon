let cartproduct = JSON.parse(localStorage.getItem("cartproduct")) || [];


const detailscontainer = document.querySelector("#detailscontainer");
const totalprice = document.querySelector("#totalprice");
const btndel = document.querySelector("#btndel")
const checkoutbtn = document.querySelector("#checkoutbtn")
if (btndel) {
    btndel.addEventListener("click", function () {
        cartproduct = [];
        localStorage.removeItem("cartproduct");
        displaycartdetails()
    })
}

function displaycartdetails() {

    detailscontainer.innerHTML = "";

    if (cartproduct.length === 0) {
        detailscontainer.innerHTML = `
        <div class="text-center py-5">
            <h4>No products in cart</h4>
            <p class="text-muted">Your cart is currently empty.</p>
        </div>

    `;
        if (totalprice) totalprice.innerHTML = 0;

        if (btndel) btndel.classList.add("d-none");
        if (checkoutbtn) checkoutbtn.classList.add("d-none");
        return;
    }

    let total = 0;

    cartproduct.forEach(function (product) {

        // سعر المنتج × الكمية
        let producttotal = product.price * product.quantity;

        // إضافة سعر المنتج للإجمالي
        total += producttotal;

        detailscontainer.innerHTML += `
        <div class="d-flex align-items-center gap-4 border-bottom py-3">

            <img src="${product.image}"
                 alt="${product.name}"
                 style="width: 100px; height: 100px; object-fit: contain;">

            <div class="flex-grow-1">

                <h5>${product.name}</h5>

                <p class="mb-1">
                Item total : ${producttotal} EGP
                </p>
<p class="mb-1">
    Size: ${product.size}
</p>
                <p class="mb-0">
                    Quantity: ${product.quantity}
                </p>

            </div>

        </div>
    `;

    });

    if (totalprice) totalprice.innerHTML = total;

}

displaycartdetails();
