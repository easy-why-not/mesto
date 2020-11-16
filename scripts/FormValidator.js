export class FormValidator {
  constructor(settings, popupForm) {
    this._popupForm = popupForm;
    this._settings = settings;
    this._input = this._popupForm.querySelector(this._settings.inputSelector);
    this._buttonElement = this._popupForm.querySelector(this._settings.submitButtonSelector);
    this._inputElements = Array.from(this._popupForm.querySelectorAll(this._settings.inputSelector));
  }
  _showError(input) {
    const errorElement = this._popupForm.querySelector(`#${input.id}-${this._settings.errorClass}`);  //получаем значение error из объекта
    errorElement.textContent = input.validationMessage; //Передаем значение ошибки
    input.classList.add(this._settings.inputErrorClass); // отображаем ошибку добавлением класса
  }
  _hideError(input) {
    this._errorElement = this._popupForm.querySelector(`#${input.id}-${this._settings.errorClass}`); //получаем значение error из объекта
    this._errorElement.textContent = ''; // передаем пустое значение ошибки
    input.classList.remove(this._settings.inputErrorClass); // удаляем класс ошибки
  }
  _checkInputValidity(input) {
    if (input.checkValidity()) {
      this._hideError(input);
    }else {
      this._showError(input);
    }
  }
  _toggleButtonState(input) {
    if (input.checkValidity()) {
      this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = false;
    }else {
      this._buttonElement.classList.add(this._settings.inactiveButtonClass);
      this._buttonElement.disabled = true;
    }
  }
  _setEventListeners() {
    this._inputElements.forEach((input) => {
      input.addEventListener('input', () => {
        this._checkInputValidity(input);
        this._toggleButtonState(input);
      });
    });
    this._toggleButtonState(this._popupForm);
  }
  enableValidation() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
