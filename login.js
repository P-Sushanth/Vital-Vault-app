document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const gitamRegex = /^[a-zA-Z0-9._%+-]+@(gitam\.in|student\.gitam\.edu)$/;

    if (!gitamRegex.test(email)) {
        document.getElementById("error-message").textContent = "Only GITAM students can access!";
        return;
    }

    localStorage.setItem("userEmail", email);
    window.location.href = "index.html";
});