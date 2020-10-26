/*const obj = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__submit',
  inactiveButtonClass: 'popup__submit-invalid',
  inputErrorClass: 'popup__input_state-invalid',
  errorClass: 'error'
};*/




function showError (formElement, input) {
  const errorElement = formElement.querySelector(`#${input.id}-error`);
  errorElement.textContent = input.validationMessage;
  input.classList.add('popup__input_state-invalid');
};

function hideError (formElement, input) {
  const errorElement = formElement.querySelector(`#${input.id}-error`);
  errorElement.textContent = '';
  input.classList.remove('popup__input_state-invalid');
};

function checkInputValidity (formElement, input)  {
  if (input.checkValidity()) {
    hideError(formElement,input);
  }else {
    showError(formElement, input);
  }
};

function toggleButtonState (formElement, buttonElement) {
  if (formElement.checkValidity()) {
    buttonElement.classList.remove('popup__submit-invalid');
    buttonElement.disabled = false;
  }else {
    buttonElement.classList.add('popup__submit-invalid');
    buttonElement.disabled = true;
  }

};

function setEventListeners (formElement) {
 const inputElements = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__submit');

  inputElements.forEach((input) => {
    input.addEventListener('input', (evt) => {
      checkInputValidity(formElement, evt.target);
      toggleButtonState(formElement, buttonElement);
      });
  });
  toggleButtonState(formElement, buttonElement);
};

function enableValidation() {
  const formElements = Array.from(document.querySelectorAll('.popup__form'));

  formElements.forEach(form => {
    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(form);
  });
};



enableValidation();

