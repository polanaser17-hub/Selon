// بيانات المنتجات الخاصة بالسيرش بس - مفصولة تماماً عن كارت.js
const searchProducts = [
    {
        name: "Fuel for builders - Brown",
        price: 899,
        image: "../Images/fuel-for-builders-brown.webp",
        link: "fuelforbuilders-brown.html"
    },
    {
        name: "Ctrl Z - Olive",
        price: 899,
        image: "../Images/ctrlz-olive.webp",
        link: "ctrlz-olive.html"
    },
    {
        name: "That's it - Navi",
        price: 899,
        image: "../Images/thatsit-navi.webp",
        link: "thatsit-navi.html"
    },
    {
        name: "Fuel for builders - Black",
        price: 899,
        image: "../Images/fuelforbuilders-black.webp",
        link: "Fuelforbuilders-black.html"
    },
    {
        name: "Ctrl Z - Blue",
        price: 899,
        image: "../Images/ctrlz-blue.webp",
        link: "ctrlz-blue.html"
    },
];

const searchInput = document.querySelector("#searchInput");
const searchResults = document.querySelector("#searchResults");

if (searchInput) {

    searchInput.addEventListener("input", function () {

        let keyword = searchInput.value.trim().toLowerCase();

        if (keyword === "") {
            searchResults.classList.remove("active");
            searchResults.innerHTML = "";
            return;
        }

        let filtered = searchProducts.filter(function (product) {
            return product.name.toLowerCase().includes(keyword);
        });

        renderResults(filtered);
    });

    // إخفاء النتائج لو دوس بره الإنبوت
    document.addEventListener("click", function (event) {
        if (!event.target.closest(".search-wrapper")) {
            searchResults.classList.remove("active");
        }
    });
}

function renderResults(list) {

    searchResults.innerHTML = "";

    if (list.length === 0) {
        searchResults.innerHTML = `<div class="search-no-result">No products found</div>`;
        searchResults.classList.add("active");
        return;
    }

    list.forEach(function (product) {
        searchResults.innerHTML += `
            <a href="${product.link}" class="search-result-item">
                <img src="${product.image}" alt="${product.name}">
                <div>
                    <div>${product.name}</div>
                    <small>${product.price} EGP</small>
                </div>
            </a>
        `;
    });

    searchResults.classList.add("active");
}