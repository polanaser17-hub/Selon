// بيانات المنتجات الخاصة بالسيرش بس - مفصولة تماماً عن كارت.js
const searchProducts = [
    {
        name: "Fuel for builders - Beige",
        price: 730,
        image: "Images/Fuelfordevelopers-hoodie.png",
        link: "pages/fuelforbuilders-brown.html"
    },
    {
        name: "That's it - Green",
        price: 730,
        image: "Images/Thats it. Hoodie green.png",
        link: "pages/ctrlz-olive.html"
    },
    {
        name: "Ctrl Z - Dark Grey",
        price: 730,
        image: "Images/CntlZ Hoodie.png",
        link: "pages/thatsit-navi.html"
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