import Popup from './Popup';

export default class PopupWithSubmit extends Popup {
  constructor(popup) {
    super(popup);
    this._PopupWithSubmitForm = this._popup.querySelector('.popup__form');
  }
  setSubmitAction(submitAction) {
    this._handleSubmitCallback = submitAction;
  }
  setEventListeners() {
    this._PopupWithSubmitForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitCallback();
      this.close();

    })
    super.setEventListeners();
  }
}
