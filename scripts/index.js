

const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close');

const nameInput = document.querySelector('.popup__input_type_firstname');
const jobInput = document.querySelector('.popup__input_type_career');
const profileName = document.querySelector('.profile__info-name');
const profileCareer = document.querySelector('.profile__info-text');

// Попап добавление картинок
const popupAddImage = document.querySelector('.popup__add-image');
const popupOpenAddImageButton = document.querySelector('.profile__add-button');
const popupCloseAdd = document.querySelector('.popup__close-add-image');

// Попап открытия картинок
const  popupOpenCard = document.querySelector('.popup__open-card');
const  popupCloseCard = document.querySelector('.popup__close-card');

// Переменные template блока
const elements = document.querySelector('.elements');
const saveImageButton = document.querySelector('.popup__save-image-button');
const inputName = document.querySelector('.popup__input_type_name');
const inputLink = document.querySelector('.popup__input_type_link');
const template = document.querySelector('.template');

// Находим форму в DOM
let formElement = document.querySelector('form')

// Универсальная функция открытия попапа
const popupOpen = function (popup) {
  popup.classList.add('popup_is-opened');
};

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (event) {
  event.preventDefault(); //отменяем отправку формы
  profileName.textContent = nameInput.value;
  profileCareer.textContent = jobInput.value;
  popupClose(popup);
}

// Обработчик открытия попапа изменения информации
popupOpenButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCareer.textContent;
  popupOpen(popup);
});


// Обработчик открытия попапа добавления изображения
popupOpenAddImageButton.addEventListener('click', function (){
  popupOpen(popupAddImage);
});

// Универсальная функция закрытия попапа
const popupClose = function (popup) {
  popup.classList.remove('popup_is-opened');
};

// Обработчик закрытия попапа информации
popupCloseButton.addEventListener('click', function (){
  popupClose(popup);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);


// Обработчик закрытия попапа добавления изображения
popupCloseAdd.addEventListener('click', function (){
  popupClose(popupAddImage);
});

// Удаление карточки
const handlerDelete = (event) => {
  event.target.closest('.card').remove();
};

// Кнопка лайк
const handlerLike = (event) => {
  event.target.closest('.card__button').classList.toggle('card__button-like');
};

// Добавление картинок
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];
const elementsPrepend = function (a) {
  elements.prepend(...a);
};

const renderCards = () =>  {
  const items = initialCards.map(element => getItems(element));

  elementsPrepend(items);
};

const getItems = (data) => {
  const card = template.content.cloneNode(true);

  const popupImage = document.querySelector('.popup__image');
  const popupText = document.querySelector('.popup__text');
  const templateImage = card.querySelector('.card__image');
  const cardDel = card.querySelector('.card__del');
  const buttonLike = card.querySelector('.card__button');

  card.querySelector('.card__title').innerText = data.name;
  card.querySelector('.card__image').src = data.link;

  templateImage.addEventListener('click', function () {
    popupText.textContent = data.name;
    popupImage.src = data.link;

    // Открываем попап изображения универсальной функцией
    popupOpen(popupOpenCard);
  });

  // Закрываем попап изображения универсальной функцией
  popupCloseCard.addEventListener('click', function (){
    popupClose(popupOpenCard);
  });

  cardDel.addEventListener('click', handlerDelete);

  buttonLike.addEventListener('click', handlerLike);

  return card;

};

const saveImage = () => {
  saveImageButton.addEventListener('click', (event) => {
    event.preventDefault()
    const item = getItems({
      name: inputName.value,
      link: inputLink.value

    })
    elementsPrepend([item]);

    inputName.value = '';
    inputLink.value = '';
    popupClose(popupAddImage);

  });
};


renderCards();
saveImage();

