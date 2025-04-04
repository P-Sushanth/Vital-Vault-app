window.onload = function () {
    const user = JSON.parse(localStorage.getItem("userDetails"));
    if (!user) {
        alert("You need to register first!");
        window.location.href = "register.html";
    }
};