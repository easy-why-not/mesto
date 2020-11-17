import { popupOpen, popupClose, popupText, popupImage, popupOpenCard, popupCloseCard } from './utils.js'

export class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._template = document.querySelector(templateSelector).content.querySelector('.card');

  }
  // Метод удаление карточки
  _handlerDelete() {
    this._content.remove();
  }
  // Метод добавления и удаления лайка
  _handlerLike() {
    this._cardButton.classList.toggle('card__button-like');
  }
  //Открытие попапа
  _handlerOpenPopupImage() {
    popupText.textContent = this._name;
    popupImage.src = this._link;
    popupImage.alt = this._name;
    popupOpen(popupOpenCard);
  }
  // Закрытие попапа
  _handlerClosePopupImage() {
    popupClose(popupOpenCard);

  }

  render () {
    this._content = this._template.cloneNode(true);

    //находим кнопку лайк
    this._cardButton = this._content.querySelector('.card__button');

    //Передаем ссылку, имя и alt карточки из массива
    this._cardImage = this._content.querySelector('.card__image');
    this._content
      .querySelector('.card__title').innerText = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;

    //Обработчик удаления карточки
    this._content
      .querySelector('.card__del').addEventListener('click', () => this._handlerDelete());

    //Обработчик кнопки лайк
    this._cardButton.addEventListener('click', () => this._handlerLike());


    this._cardImage.addEventListener('click', () => this._handlerOpenPopupImage())
    popupCloseCard.addEventListener('click', () => this._handlerClosePopupImage())
    return this._content;
  }
}

