const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit-invalid',
  inputErrorClass: 'popup__input_state-invalid',
  errorClass: 'error'
};



//Функция показа ошибки валидации
function showError (formElement, input) {
  const errorElement = formElement.querySelector(`#${input.id}-${obj.errorClass}`);  //получаем значение error из объекта
  errorElement.textContent = input.validationMessage; //Передаем значение ошибки
  input.classList.add(obj.inputErrorClass); // отображаем ошибку добавлением класса
};

// Функция скрытия ошибки валидации
function hideError (formElement, input) {
  const errorElement = formElement.querySelector(`#${input.id}-${obj.errorClass}`); //получаем значение error из объекта
  errorElement.textContent = ''; // передаем пустое значение ошибки
  input.classList.remove(obj.inputErrorClass); // удаляем класс ошибки
};

// условия показа ошибки
function checkInputValidity (formElement, input)  {
  if (input.checkValidity()) {
    hideError(formElement,input);
  }else {
    showError(formElement, input);
  }
};

// делаем кнопку не активной при ошибке валидации
function toggleButtonState (formElement, buttonElement) {
  if (formElement.checkValidity()) {
    buttonElement.classList.remove(obj.inactiveButtonClass);
    buttonElement.disabled = false;
  }else {
    buttonElement.classList.add(obj.inactiveButtonClass);
    buttonElement.disabled = true;
  }

};


function setEventListeners (formElement) {
 const inputElements = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);

  inputElements.forEach((input) => {
    input.addEventListener('input', (evt) => {
      checkInputValidity(formElement, evt.target);
      toggleButtonState(formElement, buttonElement);
      });
  });
  toggleButtonState(formElement, buttonElement);
};

// получаем все формы и отменяем стандартное поведение браузера
function enableValidation() {
  const formElements = Array.from(document.querySelectorAll(obj.formSelector));

  formElements.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form);
  });
};



enableValidation(obj);

