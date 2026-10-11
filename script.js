// Reusable function to display messages
const showMessage = (message, color) => {
    const messageElement = document.getElementById("message");

    if (messageElement) {
        messageElement.innerText = message;
        messageElement.style.color = color;
    }
};

// Reusable function to validate email
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

// Reusable function to get saved users
const getUsers = () => {
    return JSON.parse(localStorage.getItem("users")) || [];
};

// Registration form
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const password = document.getElementById("password").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;

        // Validate empty fields
        if (!name || !email || !password || !confirmPassword) {
            showMessage("Please fill in all fields.", "red");
            return;
        }

        // Validate email
        if (!isValidEmail(email)) {
            showMessage("Please enter a valid email.", "red");
            return;
        }

        // Validate password length
        if (password.length < 8) {
            showMessage("Password must contain at least 8 characters.", "red");
            return;
        }

        // Confirm password
        if (password !== confirmPassword) {
            showMessage("Passwords do not match.", "red");
            return;
        }

        // Check existing user
        const users = getUsers();

        const existingUser = users.find((user) => {
            return user.email === email;
        });

        if (existingUser) {
            showMessage("Email is already registered.", "red");
            return;
        }

        // Save user information
        users.push({
            name: name,
            email: email,
            password: password
        });

        localStorage.setItem("users", JSON.stringify(users));

        showMessage("Registration successful! Go to Login.", "green");

        registerForm.reset();
    });
}

// Login form
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const email = document.getElementById("loginEmail")
            .value.trim().toLowerCase();

        const password = document.getElementById("loginPassword").value;

        // Validate empty fields
        if (!email || !password) {
            showMessage("Please enter email and password.", "red");
            return;
        }

        // Validate email
        if (!isValidEmail(email)) {
            showMessage("Please enter a valid email.", "red");
            return;
        }

        // Find registered user
        const users = getUsers();

        const user = users.find((savedUser) => {
            return savedUser.email === email &&
                   savedUser.password === password;
        });

        if (user) {
            showMessage("Login successful! Welcome, " + user.name, "green");
        } else {
            showMessage("Invalid email or password.", "red");
        }
    });
}