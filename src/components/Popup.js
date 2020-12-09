export default class Popup {
  constructor(popup) {
    this._popup = popup;
    this._popupClose = this._popup.querySelector('.popup__close'); // кнока закрытия попапа
  }

  open() {
    this._popup.classList.add('popup_is-opened');
    //обработчик закрытия попапа по esc
    document.addEventListener('keydown', this._handleEscClose.bind(this));
  }

  close() {
    this._popup.classList.remove('popup_is-opened');
    //  снимаем обработчик закрытия попапа по esc
    document.removeEventListener('keydown', this._handleEscClose.bind(this));
  }
  // клик на esc = закрывкм попап
  _handleEscClose(event) {
    if (event.key === 'Escape') {
      this.close();
    }
  }

  // Закрытие по клику
  _handlerOverlayClose(event) {
    const popupTarget = event.target.closest('.popup');
    if (event.target === popupTarget) {
      this.close(popupTarget);
    }
  };

  setEventListeners() {
    this._popup.addEventListener('click', this._handlerOverlayClose.bind(this)); //обработчик клика по оверлею
    this._popupClose.addEventListener('click', this.close.bind(this)); // обработчик клика по крестику
  }
}
