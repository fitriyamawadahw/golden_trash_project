// DOM Elements
const loginForm = document.querySelector('.login-form');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const rememberCheckbox = document.querySelector('input[name="remember"]');
const loginBtn = document.querySelector('.login-btn');
const forgotPasswordLink = document.querySelector('.forgot-password');

// Form validation patterns
const validation = {
    username: {
        minLength: 3,
        pattern: /^[a-zA-Z0-9_]+$/,
        message: 'Username minimal 3 karakter, hanya boleh huruf, angka, dan underscore'
    },
    password: {
        minLength: 6,
        message: 'Password minimal 6 karakter'
    }
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Load remembered username if exists
    loadRememberedCredentials();
    if (localStorage.getItem('logoutSuccess')) {
        showNotification("Logout berhasil!", "success");
        localStorage.removeItem('logoutSuccess');
    }
    
    // Add input event listeners for real-time validation
    usernameInput.addEventListener('input', validateUsername);
    passwordInput.addEventListener('input', validatePassword);
    
    // Add forgot password handler
    forgotPasswordLink.addEventListener('click', handleForgotPassword);
    
    // Add remember me functionality
    rememberCheckbox.addEventListener('change', handleRememberMe);
    
    // Add Enter key handlers
    usernameInput.addEventListener('keypress', handleEnterKey);
    passwordInput.addEventListener('keypress', handleEnterKey);
    
    // IMPORTANT: Don't add submit event listener - let Django handle it naturally
});

loginForm.addEventListener('submit', function(e) {
    const validUsername = validateUsername();
    const validPassword = validatePassword();

    if (!validUsername || !validPassword) {
        e.preventDefault(); // mencegah submit jika tidak valid
        return;
    }

    loginBtn.classList.add('loading');
});

// Real-time username validation
function validateUsername() {
    const username = usernameInput.value.trim();
    const isValid = username.length >= validation.username.minLength && 
                   validation.username.pattern.test(username);
    
    updateInputValidation(usernameInput, isValid, validation.username.message);
    return isValid;
}

// Real-time password validation
function validatePassword() {
    const password = passwordInput.value;
    const isValid = password.length >= validation.password.minLength;
    
    updateInputValidation(passwordInput, isValid, validation.password.message);
    return isValid;
}

// Update input validation styling
function updateInputValidation(input, isValid, message) {
    const formGroup = input.parentElement;
    
    // Remove existing validation classes
    formGroup.classList.remove('valid', 'invalid');
    
    // Remove existing error message
    const existingError = formGroup.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    if (input.value.trim() !== '') {
        if (isValid) {
            formGroup.classList.add('valid');
        } else {
            formGroup.classList.add('invalid');
            
            // Add error message
            const errorDiv = document.createElement('div');
            errorDiv.className = 'field-error';
            errorDiv.textContent = message;
            formGroup.appendChild(errorDiv);
        }
    }
}

// Handle Enter key press
function handleEnterKey(e) {
    if (e.key === 'Enter') {
        if (e.target === usernameInput) {
            e.preventDefault();
            passwordInput.focus();
        }
        // Let password field submit naturally on Enter
    }
}

// Handle forgot password
function handleForgotPassword(e) {
    e.preventDefault();
    
    const email = prompt('Masukkan alamat email Anda untuk reset password:');
    
    if (email && isValidEmail(email)) {
        showSuccessMessage('Link reset password telah dikirim ke email Anda');
        console.log('Password reset requested for:', email);
    } else if (email) {
        showErrorMessage('Format email tidak valid');
    }
}

// Email validation helper
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

// Handle remember me functionality
function handleRememberMe() {
    if (rememberCheckbox.checked) {
        console.log('Remember me enabled');
    } else {
        // Clear remembered username
        if (typeof(Storage) !== "undefined") {
            sessionStorage.removeItem('rememberedUsername');
        }
        console.log('Remember me disabled');
    }
}

// Load remembered credentials
function loadRememberedCredentials() {
    if (typeof(Storage) !== "undefined") {
        const rememberedUsername = sessionStorage.getItem('rememberedUsername');
        
        if (rememberedUsername) {
            usernameInput.value = rememberedUsername;
            rememberCheckbox.checked = true;
            passwordInput.focus();
        } else {
            usernameInput.focus();
        }
    } else {
        usernameInput.focus();
    }
}

// Show error message
function showErrorMessage(message) {
    removeExistingMessages();
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.textContent = message;
    
    loginBtn.parentNode.insertBefore(errorDiv, loginBtn);
    
    setTimeout(() => {
        if (errorDiv.parentNode) {
            errorDiv.parentNode.removeChild(errorDiv);
        }
    }, 5000);
}

// Show success message
function showSuccessMessage(message) {
    removeExistingMessages();
    
    const successDiv = document.createElement('div');
    successDiv.className = 'success-message';
    successDiv.textContent = message;
    
    loginBtn.parentNode.insertBefore(successDiv, loginBtn);
    
    setTimeout(() => {
        if (successDiv.parentNode) {
            successDiv.parentNode.removeChild(successDiv);
        }
    }, 3000);
}

// Remove existing messages
function removeExistingMessages() {
    const existingMessages = document.querySelectorAll('.error-message, .success-message');
    existingMessages.forEach(msg => {
        if (msg.parentNode) {
            msg.parentNode.removeChild(msg);
        }
    });
}

// Add some additional CSS classes for validation
const additionalStyles = `
    .form-group.valid input {
        border-color: #4CAF50;
        box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.1);
    }
    
    .form-group.invalid input {
        border-color: #f44336;
        box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
    }
    
    .field-error {
        color: #f44336;
        font-size: 12px;
        margin-top: 5px;
        display: block;
    }
    
    .success-message {
        background: #E8F5E9;
        color: #2E7D32;
        padding: 12px;
        border-radius: 8px;
        margin-bottom: 20px;
        text-align: center;
        font-size: 14px;
        border: 1px solid #C8E6C9;
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);