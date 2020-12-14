export default class Card {
  constructor(name, link, likes, ownerId, userId, cardId, templateSelector, handleCardClick, popupSubmitdeleteCard, handleLikeClick) {
    this._name = name;
    this._link = link;
    this._likes = likes;
    console.log(this._likes)
    this._ownerId = ownerId;
    this._userId = userId;
    this._cardId = cardId;
    // console.log(this._likes)
    this._template = document.querySelector(templateSelector).content.querySelector('.card'); //разметка карточки
    this.handleCardClick = handleCardClick;
    this.popupSubmitdeleteCard = popupSubmitdeleteCard;
    this.handleLikeClick = handleLikeClick;
  }

  // Метод удаление карточки
  handlerDelete() {
    this._content.remove();
  }


  // Метод добавления и удаления лайка
  // _handlerLike() {
  //   if (this._cardButton.classList.contains('card__button-like')) {
  //     this._likes.length ++;
  //     this._content.
  //     querySelector('.card__number-likes').innerText =this._likes.length;
  //   }else {
  //     this._likes.length --;
  //     this._content.
  //     querySelector('.card__number-likes').innerText =this._likes.length;
  //   }
  // }

  setLikes(likes) {
    this._likes = likes;
    console.log(this._likes)
    this._content.
    querySelector('.card__number-likes').textContent = this._likes.length;
    if(this.isLiked()) {
      this._cardButton.classList.add('card__button-like');
    } else  {
      this._cardButton.classList.remove('card__button-like');
    }
  }

  isLiked() {
    return this._likes.some((item) =>
      item._id === this._userId);
  }




  // метод клонирования карточки и передачи ей значений ссылки и имени из объекта
  render() {
    this._content = this._template.cloneNode(true); // клонируем шаблон для карточки

    if (this._userId !== this._ownerId) {
      this._content.querySelector('.card__del').classList.remove('card__del-active')
    }else {
      this._content.querySelector('.card__del').classList.add('card__del-active')
    }

    //находим кнопку лайк
    this._cardButton = this._content.querySelector('.card__button'); // кнопка лайк в этом шаблоне

    this._cardButton.addEventListener('click', () => this.handleLikeClick());





    this._cardImage = this._content.querySelector('.card__image'); // картинка в шаблоне
    this._content
      .querySelector('.card__title').innerText = this._name; //передаем клонированной карточке значение названия из объекта
    this._cardImage.src = this._link; // передаем клонированной карточке ссылку из объекта
    this._cardImage.alt = this._name; // передаем альт
    //выводим лайки
    this._content.
      querySelector('.card__number-likes').innerText =this._likes.length;

    //Обработчик удаления карточки
    this._content
      .querySelector('.card__del').addEventListener('click', () => this.popupSubmitdeleteCard());

    //Обработчик кнопки лайк
    // this._cardButton.addEventListener('click', () => this._handlerLike());

    //Обработчик открытия картинки
    this._cardImage.addEventListener('click', () => this.handleCardClick({name: this._name, link: this._link, alt: this._name}));

    //Возвращаем готовую клонированную карточку
    return this._content;
  }
}

