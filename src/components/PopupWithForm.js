import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popup, handlerSubmitForm) {
    super(popup);
    this._handlerSubmitForm = handlerSubmitForm;
    this.form = this._popup.querySelector('.popup__form');
    // this._buttonSubmit = this.form.querySelector('.popup__submit');

  }

  // renderLoading(isLoading) {
  //   if (isLoading) {
  //     this._buttonSubmit.textContent = 'Сохранить...'
  //   }else {
  //     this._buttonSubmit.textContent = 'Сохранить'
  //   }
  // }

  _getInputValues() {
    this._inputs = this._popup.querySelectorAll('.popup__input');
    this._formValues = {};
    this._inputs.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setEventListeners() {
    this.form.addEventListener('submit', () => {
      const inputData = this._getInputValues();
      this._handlerSubmitForm(inputData);

      // this.close();
    });
    super.setEventListeners();
  }

  close() {
    this.form.reset();
    super.close();
  }
}