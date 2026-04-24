(function () {
    const feedbackForm = document.getElementById("feedback-form");
    const nameInput = document.getElementById("user-name");
    const emailInput = document.getElementById("user-email");
    const messageInput = document.getElementById("user-message");
    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");
    const successMessage = document.getElementById("success-message");
    const messagesList = document.getElementById("messages-list");
    const messagesUl = document.getElementById("messages-ul");
    const submitButton = document.getElementById("submit-button");

    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    function validateName() {
        const value = nameInput.value.trim();
        if (value.length === 0) {
            nameError.textContent = "Будь ласка, введіть ім'я";
            nameInput.classList.add("invalid");
            return false;
        }
        nameError.textContent = "";
        nameInput.classList.remove("invalid");
        return true;
    }

    function validateEmail() {
        const value = emailInput.value.trim();
        if (value.length === 0) {
            emailError.textContent = "Будь ласка, введіть email";
            emailInput.classList.add("invalid");
            return false;
        }
        if (!EMAIL_REGEX.test(value)) {
            emailError.textContent = "Невірний формат email";
            emailInput.classList.add("invalid");
            return false;
        }
        emailError.textContent = "";
        emailInput.classList.remove("invalid");
        return true;
    }

    function validateMessage() {
        const value = messageInput.value.trim();
        if (value.length === 0) {
            messageError.textContent = "Будь ласка, введіть повідомлення";
            messageInput.classList.add("invalid");
            return false;
        }
        messageError.textContent = "";
        messageInput.classList.remove("invalid");
        return true;
    }

    function createMessageCard(name, email, text) {
        const cardItem = document.createElement("li");
        cardItem.classList.add("message-card");

        const authorBlock = document.createElement("div");
        authorBlock.classList.add("message-card-name");
        authorBlock.textContent = name;

        const contactBlock = document.createElement("div");
        contactBlock.classList.add("message-card-email");
        contactBlock.textContent = email;

        const contentBlock = document.createElement("div");
        contentBlock.classList.add("message-card-text");
        contentBlock.textContent = text;

        cardItem.appendChild(authorBlock);
        cardItem.appendChild(contactBlock);
        cardItem.appendChild(contentBlock);

        return cardItem;
    }

    nameInput.addEventListener("input", validateName);
    emailInput.addEventListener("input", validateEmail);
    messageInput.addEventListener("input", validateMessage);

    submitButton.addEventListener("click", function () {
        successMessage.classList.add("hidden");
    });

    feedbackForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isMessageValid = validateMessage();

        if (!isNameValid || !isEmailValid || !isMessageValid) {
            return;
        }

        const name = nameInput.value.trim();
        const email = emailInput.value.trim();
        const text = messageInput.value.trim();

        const card = createMessageCard(name, email, text);
        messagesUl.prepend(card);
        messagesList.classList.add("visible");

        successMessage.classList.remove("hidden");

        feedbackForm.reset();
    });
})();
