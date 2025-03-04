document.addEventListener("DOMContentLoaded", function() {
    function generateCaptcha() {
        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        return Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
    }

    const captchaCode = generateCaptcha();
    document.querySelector(".captcha-code").innerText = captchaCode;

    document.querySelector(".sign-in-btn").addEventListener("click", function(event) {
        event.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const userCaptcha = document.getElementById("captcha-input").value;

        if (username === "Anilesh" && password === "601004" && userCaptcha === captchaCode) {
            window.location.href = "Home Page/index.html";
        } else {
            document.getElementById("error-message").innerText = "Invalid login details or Captcha.";
        }
    });
});
