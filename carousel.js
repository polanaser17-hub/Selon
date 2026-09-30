
    const bestSellerTrack = document.getElementById("bestSellerTrack");
    const bestSellerNext = document.getElementById("bestSellerNext");
    const bestSellerPrev = document.getElementById("bestSellerPrev");

    let bestSellerPosition = 0;


    function getVisibleCards() {

        if (window.innerWidth <= 575) {
            return 1;
        }

        if (window.innerWidth <= 991) {
            return 2;
        }

        return 4;
    }


    function updateBestSeller() {

        const cards = document.querySelectorAll(".best-seller-card");

        const visibleCards = getVisibleCards();

        const maxPosition = cards.length - visibleCards;

        bestSellerTrack.style.transform =
            `translateX(-${bestSellerPosition * (100 / visibleCards)}%)`;


        // Disable left arrow at beginning
        bestSellerPrev.disabled = bestSellerPosition === 0;

        // Disable right arrow at end
        bestSellerNext.disabled = bestSellerPosition >= maxPosition;
    }


    bestSellerNext.addEventListener("click", function () {

        const cards = document.querySelectorAll(".best-seller-card");
        const visibleCards = getVisibleCards();
        const maxPosition = cards.length - visibleCards;

        if (bestSellerPosition < maxPosition) {
            bestSellerPosition++;
            updateBestSeller();
        }

    });


    bestSellerPrev.addEventListener("click", function () {

        if (bestSellerPosition > 0) {
            bestSellerPosition--;
            updateBestSeller();
        }

    });


    window.addEventListener("resize", function () {
        bestSellerPosition = 0;
        updateBestSeller();
    });


    updateBestSeller();
