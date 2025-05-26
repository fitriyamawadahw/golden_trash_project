// DOM Elements
const registerForm = document.querySelector('.register-form');
const firstNameInput = document.getElementById('first_name');
const lastNameInput = document.getElementById('last_name');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm_password');
const termsCheckbox = document.querySelector('input[name="terms"]');
const registerBtn = document.querySelector('.register-btn');

// Form validation patterns
const validation = {
    firstName: {
        minLength: 2,
        pattern: /^[a-zA-Z\s]+$/,
        message: 'First name minimal 2 karakter, hanya boleh huruf dan spasi'
    },
    lastName: {
        minLength: 2,
        pattern: /^[a-zA-Z\s]+$/,
        message: 'Last name minimal 2 karakter, hanya boleh huruf dan spasi'
    },
    username: {
        minLength: 3,
        pattern: /^[a-zA-Z0-9_]+$/,
        message: 'Username minimal 3 karakter, hanya boleh huruf, angka, dan underscore'
    },
    email: {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: 'Format email tidak valid'
    },
    password: {
        minLength: 8,
        message: 'Password minimal 8 karakter'
    }
};

// Password strength criteria
const passwordCriteria = {
    length: /.{8,}/,
    lowercase: /[a-z]/,
    uppercase: /[A-Z]/,
    number: /\d/,
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Add input event listeners for real-time validation
    firstNameInput.addEventListener('input', validateFirstName);
    lastNameInput.addEventListener('input', validateLastName);
    usernameInput.addEventListener('input', validateUsername);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', function() {
        validatePassword();
        updatePasswordStrength();
        if (confirmPasswordInput.value) {
            validateConfirmPassword();
        }
    });
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);
    
    // Add Enter key handlers
    const inputs = [firstNameInput, lastNameInput, usernameInput, emailInput, passwordInput, confirmPasswordInput];
    inputs.forEach((input, index) => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                if (index < inputs.length - 1) {
                    inputs[index + 1].focus();
                } else {
                    registerBtn.click();
                }
            }
        });
    });
    
    // Focus first input
    firstNameInput.focus();

    // Check for success message from Django messages
    checkForSuccessMessage();
});

// Check for Django success messages and show notification
function checkForSuccessMessage() {
    // Check if there's a success message in Django messages
    const messagesContainer = document.querySelector('.messages');
    if (messagesContainer) {
        const successMessage = messagesContainer.querySelector('.success');
        if (successMessage) {
            showNotification('Registrasi berhasil! Silakan login.', 'success');
            // Hide the Django message container since we're showing our custom notification
            messagesContainer.style.display = 'none';
        }
        
        const errorMessage = messagesContainer.querySelector('.error');
        if (errorMessage) {
            showNotification(errorMessage.textContent, 'error');
            messagesContainer.style.display = 'none';
        }
    }
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove any existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${getNotificationIcon(type)}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification with animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    // Auto hide after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.classList.remove('show');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 300);
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch(type) {
        case 'success':
            return '✓';
        case 'error':
            return '✕';
        case 'warning':
            return '⚠';
        default:
            return 'ℹ';
    }
}

// Form submission handler
registerForm.addEventListener('submit', function(e) {
    const validFirstName = validateFirstName();
    const validLastName = validateLastName();
    const validUsername = validateUsername();
    const validEmail = validateEmail();
    const validPassword = validatePassword();
    const validConfirmPassword = validateConfirmPassword();
    const termsAccepted = validateTerms();

    if (!validFirstName || !validLastName || !validUsername || !validEmail || 
        !validPassword || !validConfirmPassword || !termsAccepted) {
        e.preventDefault();
        showNotification('Mohon perbaiki semua kesalahan sebelum melanjutkan', 'error');
        return;
    }

    registerBtn.classList.add('loading');
});

// Validation functions
function validateFirstName() {
    const firstName = firstNameInput.value.trim();
    const isValid = firstName.length >= validation.firstName.minLength && 
                   validation.firstName.pattern.test(firstName);
    
    updateInputValidation(firstNameInput, isValid, validation.firstName.message);
    return isValid;
}

function validateLastName() {
    const lastName = lastNameInput.value.trim();
    const isValid = lastName.length >= validation.lastName.minLength && 
                   validation.lastName.pattern.test(lastName);
    
    updateInputValidation(lastNameInput, isValid, validation.lastName.message);
    return isValid;
}

function validateUsername() {
    const username = usernameInput.value.trim();
    const isValid = username.length >= validation.username.minLength && 
                   validation.username.pattern.test(username);
    
    updateInputValidation(usernameInput, isValid, validation.username.message);
    return isValid;
}

function validateEmail() {
    const email = emailInput.value.trim();
    const isValid = validation.email.pattern.test(email);
    
    updateInputValidation(emailInput, isValid, validation.email.message);
    return isValid;
}

function validatePassword() {
    const password = passwordInput.value;
    const isValid = password.length >= validation.password.minLength;
    
    updateInputValidation(passwordInput, isValid, validation.password.message);
    return isValid;
}

function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const isValid = confirmPassword === password && confirmPassword.length > 0;
    
    const message = confirmPassword.length === 0 ? 'Konfirmasi password diperlukan' : 'Password tidak cocok';
    updateInputValidation(confirmPasswordInput, isValid, message);
    return isValid;
}

function validateTerms() {
    const isValid = termsCheckbox.checked;
    
    if (!isValid) {
        showNotification('Anda harus menyetujui Terms of Service dan Privacy Policy', 'warning');
    }
    
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

// Password strength checker
function updatePasswordStrength() {
    const password = passwordInput.value;
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    const formGroup = passwordInput.parentElement;
    
    // Remove existing strength classes
    formGroup.classList.remove('strength-weak', 'strength-medium', 'strength-strong');
    
    if (password.length === 0) {
        strengthText.textContent = 'Password strength';
        return;
    }
    
    let score = 0;
    let feedback = [];
    
    // Check criteria
    if (passwordCriteria.length.test(password)) score++;
    else feedback.push('minimal 8 karakter');
    
    if (passwordCriteria.lowercase.test(password)) score++;
    else feedback.push('huruf kecil');
    
    if (passwordCriteria.uppercase.test(password)) score++;
    else feedback.push('huruf besar');
    
    if (passwordCriteria.number.test(password)) score++;
    else feedback.push('angka');
    
    if (passwordCriteria.special.test(password)) score++;
    else feedback.push('karakter khusus');
    
    // Update strength display
    if (score <= 2) {
        formGroup.classList.add('strength-weak');
        strengthText.textContent = 'Lemah - Perlu: ' + feedback.slice(0, 2).join(', ');
    } else if (score <= 3) {
        formGroup.classList.add('strength-medium');
        strengthText.textContent = 'Sedang - Perlu: ' + feedback.slice(0, 1).join(', ');
    } else {
        formGroup.classList.add('strength-strong');
        strengthText.textContent = 'Kuat';
    }
}

// Show error message (legacy function, now using notification)
function showErrorMessage(message) {
    showNotification(message, 'error');
}

// Remove existing messages (legacy function)
function removeExistingMessages() {
    const existingError = document.querySelector('.error-message');
    const existingSuccess = document.querySelector('.success-message');
    
    if (existingError) existingError.remove();
    if (existingSuccess) existingSuccess.remove();
}