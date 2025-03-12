// ссылки на DOM элементы
const openModalBtn = document.getElementById('openModal');
const registerDialog = document.getElementById('registerDialog');
const registerForm = document.getElementById('registerForm');
const closeDialogBtn = document.getElementById('closeDialog');
const showPasswordBtn = document.getElementById('showPassword');
const passwordInput = document.getElementById('password');

//открытие модального окна при нажатии на кнопку "Регистрация"
openModalBtn.addEventListener('click', () => {
    registerDialog.showModal();
});

// закрытие модального окна при нажатии на кнопку "Закрыть"
closeDialogBtn.addEventListener('click', () => {
    registerDialog.close();
});

//закрытие модального окна при клике вне его области
registerDialog.addEventListener('click', (e) => {
    //был ли клик выполнен непосредственно на dialog
    //а не на его дочерних элементах
    if (e.target === registerDialog) {
        registerDialog.close();
    }
});

// валидации поля формы
function validateField(field) {
    // элемент для отображения ошибки
    const errorElement = document.getElementById(`${field.id}Error`);
    
    // проверка валидность поля
    if (!field.validity.valid) {
        // установка атрибута aria-invalid="true" для невалидного поля
        field.setAttribute('aria-invalid', 'true');
        
        // текст ошибки в зависимости от типа невалидности
        let errorMessage = 'Ошибка валидации поля';
        
        if (field.validity.valueMissing) {
            errorMessage = 'Это поле обязательно для заполнения';
        } else if (field.validity.typeMismatch && field.type === 'email') {
            errorMessage = 'Введите корректный email адрес';
        } else if (field.validity.tooShort) {
            errorMessage = `Минимальная длина: ${field.minLength} символов`;
        }
        
        // отображение сообщение об ошибке
        errorElement.textContent = errorMessage;
        errorElement.removeAttribute('hidden');
        
        return false;
    } else {
        // сброс состояние поля на валидное
        field.removeAttribute('aria-invalid');
        errorElement.setAttribute('hidden', '');
        errorElement.textContent = '';
        
        return true;
    }
}

//добавление обработчикв событий blur для всех полей формы
const formFields = registerForm.querySelectorAll('input');
formFields.forEach(field => {
    field.addEventListener('blur', () => {
        validateField(field);
    });
    
    //  обработчик input для обновления статуса валидации при вводе
    field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') {
            validateField(field);
        }
    });
});

// события отправки формы
registerForm.addEventListener('submit', (e) => {
    //предотвращение стандартного поведение отправки формы
    e.preventDefault();
    
    //отслеживание валидности всей формы
    let isFormValid = true;
    let firstInvalidField = null;
    
    //проверка валидность каждого поля
    formFields.forEach(field => {
        const isValid = validateField(field);
        
        if (!isValid && !firstInvalidField) {
            firstInvalidField = field;
        }
        
        isFormValid = isFormValid && isValid;
    });
    
    // еслии форма валидна то собираем данные и выводим в консоль
    if (isFormValid) {
        const formData = new FormData(registerForm);
        console.log('Форма отправлена:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        
        // закрытие модального окна
        registerDialog.close();
        
        //сброс формы Возможно убрать
        registerForm.reset();
    } else {
        //фокусируемся на первом поле с ошибкой если что-то не то
        if (firstInvalidField) {
            firstInvalidField.focus();
        }
    }
});

//показа пароля (pointerdown - нажатие)
showPasswordBtn.addEventListener('pointerdown', () => {
    passwordInput.type = 'text';
});

// скрытия пароля (pointerup - отпускание)
showPasswordBtn.addEventListener('pointerup', () => {
    passwordInput.type = 'password';
});

//на всякий случай если будет зажата кнопка и пароль будет видимым
showPasswordBtn.addEventListener('pointerleave', () => {
    passwordInput.type = 'password';
});