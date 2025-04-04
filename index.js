document.addEventListener("DOMContentLoaded", function () {
    const user = JSON.parse(localStorage.getItem("userDetails"));

    if (user) {
        document.getElementById("welcome-message").textContent = `Hey ${user.name}, what do you want to do today?`;
        document.getElementById("role-selection").style.display = "block";
        document.getElementById("logout-btn").style.display = "block";
        document.getElementById("register-btn").style.display = "none";
    } else {
        document.getElementById("welcome-message").textContent = "Welcome to the lending & renting hub!";
    }

    // ✅ Ensure Logout Button Works
    document.getElementById("logout-btn").addEventListener("click", function () {
        localStorage.removeItem("userDetails");
        alert("Logged out successfully!");
        window.location.href = "register.html";
    });
});