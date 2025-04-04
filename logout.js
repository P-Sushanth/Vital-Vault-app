document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("logout-btn").addEventListener("click", function () {
        localStorage.removeItem("userEmail");
        window.location.href = "login.html";
    });
});