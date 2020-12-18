export default class Card {
  constructor(name, link, likes, ownerId, userId, cardId, templateSelector, handleCardClick, popupSubmitdeleteCard, handleLikeClick) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._ownerId = ownerId;
    this._userId = userId;
    this._cardId = cardId;
    this._template = document.querySelector(templateSelector).content.querySelector('.card');
    this.handleCardClick = handleCardClick;
    this.popupSubmitdeleteCard = popupSubmitdeleteCard;
    this.handleLikeClick = handleLikeClick;
  }

  // Метод удаление карточки
  handlerDelete() {
    this._content.remove();
  }

  setLikes(likes) {
    this._likes = likes;
    if(this.isLiked()) {
      this._cardButton.classList.add('card__button-like');
      this._cardNumberLikes.textContent = this._likes.length;
    } else  {
      this._cardButton.classList.remove('card__button-like');
      this._cardNumberLikes.textContent = this._likes.length;
    }
  }

  isLiked() {
    return this._likes.some((item) =>
      item._id === this._userId);
  }

  _setEventListeners() {
    this._cardButton.addEventListener('click', () => this.handleLikeClick());

    //Обработчик удаления карточки
    this._cardDel.addEventListener('click', () => this.popupSubmitdeleteCard());

    //Обработчик открытия картинки
    this._cardImage.addEventListener('click', () => this.handleCardClick({name: this._name, link: this._link, alt: this._name}));
  }

  // метод клонирования карточки и передачи ей значений ссылки и имени из объекта
  render() {
    this._content = this._template.cloneNode(true);// клонируем шаблон для карточки

    this._cardNumberLikes = this._content.querySelector('.card__number-likes');
    this._cardDel = this._content.querySelector('.card__del');

    if (this._userId !== this._ownerId) {
      this._cardDel.classList.remove('card__del-active')
    }else {
      this._cardDel.classList.add('card__del-active')
    }

    //находим кнопку лайк
    this._cardButton = this._content.querySelector('.card__button'); // кнопка лайк в этом шаблоне

    //выводим лайки
    this._cardNumberLikes.textContent = this._likes.length;

    this.setLikes(this._likes);

    this._cardImage = this._content.querySelector('.card__image'); // картинка в шаблоне
    this._content
      .querySelector('.card__title').innerText = this._name; //передаем клонированной карточке значение названия из объекта
    this._cardImage.src = this._link; // передаем клонированной карточке ссылку из объекта
    this._cardImage.alt = this._name; // передаем альт

    this._setEventListeners();

    //Возвращаем готовую клонированную карточку
    return this._content;
  }
}

