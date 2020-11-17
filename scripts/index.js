import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';
import { popupOpen, popupClose, handlerOverlayClose, popupOpenCard } from './utils.js'

const popupInfo = document.querySelector('.popup__info');
const popupOpenButton = document.querySelector('.profile__edit-button');
const popupCloseButton = document.querySelector('.popup__close-info');

const nameInput = document.querySelector('.popup__input_type_firstname');
const jobInput = document.querySelector('.popup__input_type_career');
const profileName = document.querySelector('.profile__info-name');
const profileCareer = document.querySelector('.profile__info-text');

// Попап добавление картинок
const popupAddImage = document.querySelector('.popup__add-image');
const popupOpenAddImageButton = document.querySelector('.profile__add-button');
const popupCloseAdd = document.querySelector('.popup__close-add-image');
const popupFormAddImage = document.querySelector('.popup__form_add-image')

// Переменные template блока
const elements = document.querySelector('.elements');
// const saveImageButton = document.querySelector('.popup__save-image-button');
const inputName = document.querySelector('.popup__input_type_name');
const inputLink = document.querySelector('.popup__input_type_link');


// // Находим форму в DOM
const formElementInfo = document.querySelector('form');

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

// Обработчики

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (event) {
  event.preventDefault(); //отменяем отправку формы
  profileName.textContent = nameInput.value;
  profileCareer.textContent = jobInput.value;
  popupClose(popupInfo);
};

// Обработчик открытия попапа изменения информации
popupOpenButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCareer.textContent;
  popupOpen(popupInfo);
});

// Обработчик открытия попапа добавления изображения
popupOpenAddImageButton.addEventListener('click', function (){
  popupOpen(popupAddImage);
});


//Обработчики закрытия по клику на оверлей
popupInfo.addEventListener('click', handlerOverlayClose);
popupAddImage.addEventListener('click', handlerOverlayClose);
popupOpenCard.addEventListener('click', handlerOverlayClose);

// Обработчик закрытия попапа информации
popupCloseButton.addEventListener('click', function (){
  popupClose(popupInfo);
});

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElementInfo.addEventListener('submit', formSubmitHandler);


// Обработчик закрытия попапа добавления изображения
popupCloseAdd.addEventListener('click', function (){
  popupClose(popupAddImage);
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

  // Возвращаем готовую карточку
  return listItem.render();
};

const saveImage = () => {
  popupFormAddImage.addEventListener('submit', (event) => {
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


