document.getElementById("register-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const gitamRegex = /^[a-zA-Z0-9._%+-]+@(gitam\.in|student\.gitam\.edu)$/;

    if (!gitamRegex.test(email)) {
        document.getElementById("error-message").textContent = "Only GITAM students can register!";
        return;
    }

    const phone = document.getElementById("phone").value.trim();
    if (!/^\d{10}$/.test(phone)) {
        document.getElementById("error-message").textContent = "Phone number must be 10 digits!";
        return;
    }

    const userDetails = {
        name: document.getElementById("name").value,
        email,
        address: document.getElementById("address").value,
        phone,
        regdNo: document.getElementById("regdNo").value,
        branch: document.getElementById("branch").value,
        school: document.getElementById("school").value,
    };

    localStorage.setItem("userDetails", JSON.stringify(userDetails));

    alert("Registration successful! Redirecting to home...");
    window.location.href = "index.html";
});