const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxFU6aomYTNvGsLpGoWE5LHxRK-KWDp0d7fxwO3J_OL13VJRemk4UJ1LN4NarWWI2ia/exec";

const completeOrder = document.querySelector("#completeOrder");
const successOverlay = document.querySelector("#orderSuccessOverlay");
const closeSuccessBtn = document.querySelector("#closeSuccessOverlay");

closeSuccessBtn.addEventListener("click", function () {
    window.location.href = "/index.html";
});

completeOrder.addEventListener("click", async function () {
    const email = document.querySelector("#email").value.trim();
    const firstName = document.querySelector("#firstname").value.trim();
    const lastName = document.querySelector("#lastname").value.trim();
    const address = document.querySelector("#address").value.trim();
    const apartment = document.querySelector("#details").value.trim();
    const city = document.querySelector("#city").value.trim();
    const governorate = document.querySelector("#government").value;
    const postalCode = document.querySelector("#postalcode").value.trim();
    const phone = document.querySelector("#phone").value.trim();

    const paymentInput = document.querySelector(
        'input[name="payment"]:checked'
    );

    if (!firstName || !lastName || !email || !phone || !address) {
        alert("من فضلك املأ كل البيانات المطلوبة");
        return;
    }

    if (!paymentInput) {
        alert("من فضلك اختر وسيلة الدفع");
        return;
    }

    const cartProducts =
        JSON.parse(localStorage.getItem("cartproduct")) || [];

    if (cartProducts.length === 0) {
        alert("السلة فارغة");
        return;
    }

    // لا نرسل السعر أو الإجمالي نهائيًا.
    // Apps Script هو الذي يحدد السعر الحقيقي من product ID.
    const payload = {
        customer: {
            name: `${firstName} ${lastName}`,
            email: email,
            phone: phone,
            address: `${address}${apartment ? ` - ${apartment}` : ""}`,
            city: `${city}${governorate ? `, ${governorate}` : ""}`,
            postalCode: postalCode,
            payment: paymentInput.value
        },
        items: cartProducts.map(function (product) {
            return {
                id: Number(product.id),
                size: product.size,
                quantity: Number(product.quantity)
            };
        })
    };

    completeOrder.disabled = true;
    completeOrder.textContent = "Your order is being sent....";

    try {
        await fetch(APPS_SCRIPT_URL, {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "text/plain;charset=utf-8"
            },
            body: JSON.stringify(payload)
        });

        localStorage.removeItem("cartproduct");
        successOverlay.classList.add("active");

    } catch (error) {
        console.error(error);
        alert("تعذر إرسال الطلب. حاول مرة أخرى.");
    } finally {
        completeOrder.disabled = false;
        completeOrder.textContent = "إرسال الطلب";
    }
});

