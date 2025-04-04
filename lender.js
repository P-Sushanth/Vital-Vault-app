document.addEventListener("DOMContentLoaded", function () {
    displayUploadedItems();

    // ✅ Debugging: Check if upload form exists
    const uploadForm = document.getElementById("upload-form");
    if (!uploadForm) {
        console.error("Upload form not found!");
        return;
    }

    uploadForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("item-name").value.trim();
        const price = document.getElementById("item-price").value.trim();
        const timing = document.getElementById("item-timing").value.trim();
        const imageInput = document.getElementById("item-image").files[0];

        // ✅ Debugging: Check input values
        console.log("Uploading item:", { name, price, timing, imageInput });

        if (!name || !price || !timing || !imageInput) {
            alert("Please fill in all fields and select an image.");
            return;
        }

        const reader = new FileReader();
        reader.onload = function () {
            const itemData = { name, price, timing, image: reader.result, rented: false, renterInfo: null };

            let items = JSON.parse(localStorage.getItem("items")) || [];
            items.push(itemData);
            localStorage.setItem("items", JSON.stringify(items));

            console.log("Item successfully stored in localStorage:", itemData);

            alert("Item uploaded successfully!");
            displayUploadedItems();

            // ✅ Notify Renter Page to Update
            localStorage.setItem("updateRenter", Date.now().toString());
        };

        reader.readAsDataURL(imageInput);
    });

    // ✅ Fix "Go to Home" Button
    const backHomeButton = document.getElementById("back-home");
    if (backHomeButton) {
        backHomeButton.addEventListener("click", function () {
            window.location.href = "index.html";
        });
    }

    // ✅ Show Notification if Someone Rented an Item
    const rentalNotification = localStorage.getItem("rentalNotification");
    if (rentalNotification) {
        alert(`📢 Notification: ${rentalNotification}`);
        localStorage.removeItem("rentalNotification");
    }
});

// ✅ Fix Display Function for Uploaded Items
function displayUploadedItems() {
    let items = JSON.parse(localStorage.getItem("items")) || [];
    const itemsContainer = document.getElementById("uploaded-items");

    if (!itemsContainer) {
        console.error("Uploaded items container not found!");
        return;
    }

    itemsContainer.innerHTML = "";

    items.forEach((item, index) => {
        const itemDiv = document.createElement("div");
        itemDiv.classList.add("item-card");

        itemDiv.innerHTML = `
            <img src="${item.image}" class="item-img" alt="${item.name}">
            <p class="item-title">${item.name}</p>
            <p class="item-price">₹${item.price}</p>
            <p class="item-timing">${item.timing}</p>
            <p class="renter-info">${item.rented ? `📌 Rented by: ${item.renterInfo.name} (${item.renterInfo.phone})` : "Available"}</p>
            <button class="btn-danger" onclick="deleteItem(${index})">Delete</button>
        `;

        itemsContainer.appendChild(itemDiv);
    });
}

// ✅ Fix Delete Item Function
function deleteItem(index) {
    let items = JSON.parse(localStorage.getItem("items")) || [];
    items.splice(index, 1);
    localStorage.setItem("items", JSON.stringify(items));
    displayUploadedItems();
}