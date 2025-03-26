const openModalBtn = document.getElementById('openModal');
const registerDialog = document.getElementById('registerDialog');
const registerForm = document.getElementById('registerForm');
const closeDialogBtn = document.getElementById('closeDialog');
const showPasswordBtn = document.getElementById('showPassword');
const passwordInput = document.getElementById('password');

openModalBtn.addEventListener('click', () => {
    registerDialog.showModal();
});

closeDialogBtn.addEventListener('click', () => {
    registerDialog.close();
});

registerDialog.addEventListener('click', (e) => {
    if (e.target === registerDialog) {
        registerDialog.close();
    }
});

function validateField(field) {
    const errorElement = document.getElementById(`${field.id}Error`);
    
    if (!field.validity.valid) {
        field.setAttribute('aria-invalid', 'true');
        
        let errorMessage = 'Ошибка валидации поля';
        
        if (field.validity.valueMissing) {
            errorMessage = 'Это поле обязательно для заполнения';
        } else if (field.validity.typeMismatch && field.type === 'email') {
            errorMessage = 'Введите корректный email адрес';
        } else if (field.validity.tooShort) {
            errorMessage = `Минимальная длина: ${field.minLength} символов`;
        }
        
        errorElement.textContent = errorMessage;
        errorElement.removeAttribute('hidden');
        
        return false;
    } else {
        field.removeAttribute('aria-invalid');
        errorElement.setAttribute('hidden', '');
        errorElement.textContent = '';
        
        return true;
    }
}

const formFields = registerForm.querySelectorAll('input');
formFields.forEach(field => {
    field.addEventListener('blur', () => {
        validateField(field);
    });
    
    field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') {
            validateField(field);
        }
    });
});

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    let isFormValid = true;
    let firstInvalidField = null;
    
    formFields.forEach(field => {
        const isValid = validateField(field);
        
        if (!isValid && !firstInvalidField) {
            firstInvalidField = field;
        }
        
        isFormValid = isFormValid && isValid;
    });
    
    if (isFormValid) {
        const formData = new FormData(registerForm);
        console.log('Форма отправлена:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        
        registerDialog.close();
        
        registerForm.reset();
    } else {
        if (firstInvalidField) {
            firstInvalidField.focus();
        }
    }
});

showPasswordBtn.addEventListener('pointerdown', () => {
    passwordInput.type = 'text';
});

showPasswordBtn.addEventListener('pointerup', () => {
    passwordInput.type = 'password';
});

showPasswordBtn.addEventListener('pointerleave', () => {
    passwordInput.type = 'password';
});