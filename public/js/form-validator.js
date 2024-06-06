document.addEventListener("DOMContentLoaded", function() {
    const form = document.querySelector(".contact-form form");
    const nameInput = document.getElementById("name-form");
    const emailInput = document.getElementById("email-form");
    const messageInput = document.getElementById("message-form");
    const submitButton = form.querySelector("button[type='submit']");

    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateInput() {
        let valid = true;

        if (!nameRegex.test(nameInput.value.trim())) {
            valid = false;
        }

        if (!emailRegex.test(emailInput.value.trim())) {
            valid = false;
        }

        if (messageInput.value.trim() === "") {
            valid = false;
        }

        return valid;
    }

    function toggleSubmitButton() {
        if (validateInput()) {
            submitButton.disabled = false;
            submitButton.classList.remove("disabled");
        } else {
            submitButton.disabled = true;
            submitButton.classList.add("disabled");
        }
    }

    nameInput.addEventListener("input", toggleSubmitButton);
    emailInput.addEventListener("input", toggleSubmitButton);
    messageInput.addEventListener("input", toggleSubmitButton);

    toggleSubmitButton();

    form.addEventListener("submit", function(event) {
        if (!validateInput()) {
            event.preventDefault();
        }
    });
});
