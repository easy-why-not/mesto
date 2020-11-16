import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

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

const popupImage = document.querySelector('.popup__image');
const popupText = document.querySelector('.popup__text');

// Попап открытия картинок
const  popupOpenCard = document.querySelector('.popup__open-card');
const  popupCloseCard = document.querySelector('.popup__close-card');

// Переменные template блока
const elements = document.querySelector('.elements');
const saveImageButton = document.querySelector('.popup__save-image-button');
const inputName = document.querySelector('.popup__input_type_name');
const inputLink = document.querySelector('.popup__input_type_link');


// // Находим форму в DOM
const formElement = document.querySelector('form');

//Массив карточек
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

//Функции

// Универсальная функция открытия попапа
const popupOpen = function (popups) {
  popups.classList.add('popup_is-opened');

  //обработчик закрытия попапа по esc
  document.addEventListener('keydown', escClose);
};

// Универсальная функция закрытия попапа
const popupClose = function (popup) {
  popup.classList.remove('popup_is-opened');

  //снимаем обработчик закрытия попапа по esc
  document.removeEventListener('keydown', escClose);
};

// Закрытие по клику
const handlerOverlayClose = function (event) {
  const popupTarget = event.target.closest('.popup');
  if (event.target === popupTarget) {
    popupClose(popupTarget);
  }
};

//закрытие попапа esc
const escClose = function (evt) {
  if (evt.key === 'Escape') {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    popupClose(popupIsOpened);
  }
};


// Обработчики

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (event) {
  event.preventDefault(); //отменяем отправку формы
  profileName.textContent = nameInput.value;
  profileCareer.textContent = jobInput.value;
  popupClose(popup);
};

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


//Обработчики закрытия по клику на оверлей
popup.addEventListener('click', handlerOverlayClose);
popupAddImage.addEventListener('click', handlerOverlayClose);
popupOpenCard.addEventListener('click', handlerOverlayClose);

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

// Обработчик закрытия попапа изображения
popupCloseCard.addEventListener('click', function (){
  popupClose(popupOpenCard);
});

// Логика
// Функция добавления крточки в начало
const elementsPrepend = function (card) {
  elements.prepend(...card);
};
// Функция создания массива карточек которая получает карточку из getItems
const renderCards = () =>  {
  const items = initialCards.map(element => getItems(element));
  elementsPrepend(items);
};

const template = '.template';

const getItems = (data) => {
  const listItem = new Card(data.name, data.link, template);
  const cardElement = listItem.render();

  // Открытие картинки
  const templateImage = cardElement.querySelector('.card__image');
  templateImage.addEventListener('click', function () {
    popupText.textContent = data.name;
    popupImage.src = data.link;
    popupImage.alt = data.name;

    // Открываем попап изображения универсальной функцией
    popupOpen(popupOpenCard);
  });

  // Возвращаем готовую карточку
  return cardElement;
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


// Валидация
const popupForm = document.querySelector('.popup__form')
const formElements = Array.from(document.querySelectorAll('.popup__form'));

formElements.forEach(popupForm => {
  const formValidator = new FormValidator({
    formSelector: 'form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit-invalid',
    inputErrorClass: 'popup__input_state-invalid',
    errorClass: 'error'
  }, popupForm);

  formValidator.enableValidation();
});


