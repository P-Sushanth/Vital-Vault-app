document.addEventListener("DOMContentLoaded", function () {
    displayAvailableItems();

    // ✅ Auto-refresh Renter Page when new items are added
    window.addEventListener("storage", function (event) {
        if (event.key === "updateRenter") {
            displayAvailableItems();
        }
    });

    // ✅ Fix "Go to Home" Button
    const backHomeButton = document.getElementById("back-home");
    if (backHomeButton) {
        backHomeButton.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }
});

// ✅ Fix Display Function for Renter Page
function displayAvailableItems() {
    let items = JSON.parse(localStorage.getItem("items")) || [];
    const itemsList = document.getElementById("available-items");

    if (!itemsList) return; // Prevent errors if the element is missing
    itemsList.innerHTML = "";

    items.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item");

        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" width="150">
            <p><strong>${item.name}</strong></p>
            <p>Price: ₹${item.price}</p>
            <p>Timing: ${item.timing}</p>
            <button class="rent-btn" data-index="${index}" ${item.rented ? "disabled" : ""}>
                ${item.rented ? "Rented Out" : "Rent Now"}
            </button>
        `;

        itemsList.appendChild(itemDiv);
    });

    // ✅ Attach event listeners to "Rent Now" buttons dynamically
    document.querySelectorAll(".rent-btn").forEach(button => {
        button.addEventListener("click", function () {
            rentItem(button.dataset.index);
        });
    });
}

// ✅ Fix Rent Item Function
function rentItem(index) {
    let items = JSON.parse(localStorage.getItem("items")) || [];
    let user = JSON.parse(localStorage.getItem("userDetails"));

    if (!user) {
        alert("You need to be logged in to rent an item.");
        return;
    }

    if (!items[index].rented) {
        items[index].rented = true;
        items[index].renterInfo = {
            name: user.name,
            email: user.email,
            phone: user.phone,
        };
        localStorage.setItem("items", JSON.stringify(items));

        // ✅ Notify the Lender
        localStorage.setItem("rentalNotification", `Item: ${items[index].name} rented by ${user.name} (Email: ${user.email}, Phone: ${user.phone})`);

        alert("Item booked successfully! The lender will be notified.");
        displayAvailableItems();
    }
}