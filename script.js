// ссылки на DOM элементы
const openModalBtn = document.getElementById('openModal');
const registerDialog = document.getElementById('registerDialog');
const registerForm = document.getElementById('registerForm');
const closeDialogBtn = document.getElementById('closeDialog');
const showPasswordBtn = document.getElementById('showPassword');
const passwordInput = document.getElementById('password');

// Обработчик события для открытия модального окна при нажатии на кнопку "Регистрация"
openModalBtn.addEventListener('click', () => {
    registerDialog.showModal();
});

// Обработчик события для закрытия модального окна при нажатии на кнопку "Закрыть"
closeDialogBtn.addEventListener('click', () => {
    registerDialog.close();
});

// Закрытие модального окна при клике вне его области
registerDialog.addEventListener('click', (e) => {
    // Проверяем, был ли клик выполнен непосредственно на dialog
    // (а не на его дочерних элементах)
    if (e.target === registerDialog) {
        registerDialog.close();
    }
});

// Функция валидации поля формы
function validateField(field) {
    // Получаем элемент для отображения ошибки
    const errorElement = document.getElementById(`${field.id}Error`);
    
    // Проверяем валидность поля
    if (!field.validity.valid) {
        // Устанавливаем атрибут aria-invalid="true" для невалидного поля
        field.setAttribute('aria-invalid', 'true');
        
        // Определяем текст ошибки в зависимости от типа невалидности
        let errorMessage = 'Ошибка валидации поля';
        
        if (field.validity.valueMissing) {
            errorMessage = 'Это поле обязательно для заполнения';
        } else if (field.validity.typeMismatch && field.type === 'email') {
            errorMessage = 'Введите корректный email адрес';
        } else if (field.validity.tooShort) {
            errorMessage = `Минимальная длина: ${field.minLength} символов`;
        }
        
        // Отображаем сообщение об ошибке
        errorElement.textContent = errorMessage;
        errorElement.removeAttribute('hidden');
        
        return false;
    } else {
        // Сбрасываем состояние поля на валидное
        field.removeAttribute('aria-invalid');
        errorElement.setAttribute('hidden', '');
        errorElement.textContent = '';
        
        return true;
    }
}

// Добавляем обработчики событий blur для всех полей формы
const formFields = registerForm.querySelectorAll('input');
formFields.forEach(field => {
    field.addEventListener('blur', () => {
        validateField(field);
    });
    
    // Также добавим обработчик input, чтобы обновлять статус валидации при вводе
    field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') {
            validateField(field);
        }
    });
});

// Обработка события отправки формы
registerForm.addEventListener('submit', (e) => {
    // Предотвращаем стандартное поведение отправки формы
    e.preventDefault();
    
    // Флаг для отслеживания валидности всей формы
    let isFormValid = true;
    let firstInvalidField = null;
    
    // Проверяем валидность каждого поля
    formFields.forEach(field => {
        const isValid = validateField(field);
        
        if (!isValid && !firstInvalidField) {
            firstInvalidField = field;
        }
        
        isFormValid = isFormValid && isValid;
    });
    
    // Если форма валидна, собираем данные и выводим в консоль
    if (isFormValid) {
        const formData = new FormData(registerForm);
        console.log('Форма отправлена:');
        for (let [key, value] of formData.entries()) {
            console.log(`${key}: ${value}`);
        }
        
        // Можно добавить здесь закрытие модального окна после успешной отправки
        registerDialog.close();
        
        // И сброс формы
        registerForm.reset();
    } else {
        // Если форма невалидна, фокусируемся на первом поле с ошибкой
        if (firstInvalidField) {
            firstInvalidField.focus();
        }
    }
});

// Обработчик события показа пароля (pointerdown - нажатие)
showPasswordBtn.addEventListener('pointerdown', () => {
    passwordInput.type = 'text';
});

// Обработчик события скрытия пароля (pointerup - отпускание)
showPasswordBtn.addEventListener('pointerup', () => {
    passwordInput.type = 'password';
});

// Предотвращаем случай, когда пользователь уводит указатель с кнопки
// при зажатой клавише, что может оставить пароль видимым
showPasswordBtn.addEventListener('pointerleave', () => {
    passwordInput.type = 'password';
});


/*

// Получаем ссылки на DOM элементы
const openModalBtn = document.getElementById('openModal');
const registerDialog = document.getElementById('registerDialog');
const registerForm = document.getElementById('registerForm');
const closeDialogBtn = document.getElementById('closeDialog');
const showPasswordBtn = document.getElementById('showPassword');
const passwordInput = document.getElementById('password');

// Открытие модального окна при нажатии на кнопку "Регистрация"
openModalBtn.addEventListener('click', () => {
    registerDialog.showModal();
});

// Закрытие модального окна при нажатии на кнопку "Закрыть"
closeDialogBtn.addEventListener('click', (e) => {
    e.stopPropagation(); // Предотвращаем всплытие события
    registerDialog.close();
});

// Закрытие модального окна при клике вне его области
registerDialog.addEventListener('click', (e) => {
    if (e.target === registerDialog) {
        registerDialog.close();
    }
}, true); // Добавляем обработчик на фазе погружения

// Функция валидации поля формы
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

        // Добавляем стилизацию ошибок
        field.classList.add('input-error');
        field.labels[0].classList.add('label-error'); 

        return false;
    } else {
        field.removeAttribute('aria-invalid');
        errorElement.setAttribute('hidden', '');
        errorElement.textContent = '';

        // Убираем стилизацию ошибок
        field.classList.remove('input-error');
        field.labels[0].classList.remove('label-error'); 

        return true;
    }
}

// Обработчики событий blur и input
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

// Обработка события отправки формы
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

// Показ и скрытие пароля
showPasswordBtn.addEventListener('pointerdown', () => {
    passwordInput.type = 'text';
});

showPasswordBtn.addEventListener('pointerup', () => {
    passwordInput.type = 'password';
});

showPasswordBtn.addEventListener('pointerleave', () => {
    passwordInput.type = 'password';
});

*/