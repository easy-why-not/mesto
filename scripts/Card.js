import PopupWithImage from './PopupWithImage.js';
export default class Card {
  constructor(name, link, templateSelector, handleCardClick) {
    this._name = name;
    this._link = link;
    this._template = document.querySelector(templateSelector).content.querySelector('.card'); //разметка карточки

  }
  //открытие карточки по клику
  handleCardClick() {
    open(data)
  }

  // Метод удаление карточки
  _handlerDelete() {
    this._content.remove();
  }

  // Метод добавления и удаления лайка
  _handlerLike() {
    this._cardButton.classList.toggle('card__button-like');
  }
  // метод клонирования карточки и передачи ей значений ссылки и имени из объекта
  render() {
    this._content = this._template.cloneNode(true); // клонируем шаблон для карточки

    //находим кнопку лайк
    this._cardButton = this._content.querySelector('.card__button'); // кнопка лайк в этом шаблоне

    this._cardImage = this._content.querySelector('.card__image'); // картинка в шаблоне
    this._content
      .querySelector('.card__title').innerText = this._name; //передаем клонированной карточке значение названия из объекта
    this._cardImage.src = this._link; // передаем клонированной карточке ссылку из объекта
    this._cardImage.alt = this._name; // передаем альт

    //Обработчик удаления карточки
    this._content
      .querySelector('.card__del').addEventListener('click', () => this._handlerDelete());

    //Обработчик кнопки лайк
    this._cardButton.addEventListener('click', () => this._handlerLike());

    //Возвращаем готовую клонированную карточку
    return this._content;
  }
}

