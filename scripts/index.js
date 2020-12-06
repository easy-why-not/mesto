import Card from './Card.js';
import FormValidator from './FormValidator.js';
import Section from "./Section.js";
// import Popup from './Popup.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';


// const  popupOpenCard = document.querySelector('.popup__open-card');
// const  popupCloseCard = document.querySelector('.popup__close-card');


// const popupCloseButton = document.querySelector('.popup__close-info');




// Попап добавление картинок


// const popupCloseAdd = document.querySelector('.popup__close-add-image');
// const popupFormAddImage = document.querySelector('.popup__form_add-image')

// Переменные template блока
// export const elements = document.querySelector('.elements');
// const inputName = document.querySelector('.popup__input_type_name');
// const inputLink = document.querySelector('.popup__input_type_link');




//Массив карточек
export const initialCards = [
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


//
// // Обработчик закрытия попапа картинки
// popupCloseCard.addEventListener('click', function () {
//   close();
// });



// // Обработчик открытия попапа изменения информации
// popupOpenButton.addEventListener('click', function () {
//   nameInput.value = profileName.textContent;
//   jobInput.value = profileCareer.textContent;
//   open();
// });

// // Обработчик открытия попапа добавления изображения
// popupOpenAddImageButton.addEventListener('click', function (){
//   open();
// });


// //Обработчики закрытия по клику на оверлей
// popupInfo.addEventListener('click', handlerOverlayClose);
// popupAddImage.addEventListener('click', handlerOverlayClose);
// popupOpenCard.addEventListener('click', handlerOverlayClose);

// Обработчик закрытия попапа информации
// popupCloseButton.addEventListener('click', function (){
//   close();
// });
//
//
// // Обработчик закрытия попапа добавления изображения
// popupCloseAdd.addEventListener('click', function (){
//   close();
// });


// Логика


// const getItems = (data) => {
//   const listItem = new Card(data.name, data.link, template);
//
//   // Возвращаем готовую карточку
//   return listItem.render();
// };
//
// const saveImage = () => {
//   popupFormAddImage.addEventListener('submit', (event) => {
//     event.preventDefault()
//     const item = getItems({
//       name: inputName.value,
//       link: inputLink.value
//     })
//     elements.prepend(item);
//     inputName.value = '';
//     inputLink.value = '';
//     popupClose(popupAddImage);
//   });
// };
// renderCards();

// saveImage();

// Рендеринг карточек из массива
const template = '.template';
const elementsContainer = '.elements';
const section = new Section({
  initialCards: initialCards,
  renderer: (item) => {
    const listItem = new Card(item.name, item.link, template);
    // Возвращаем готовую карточку
    const cardListItem = listItem.render();
    section.renderCards(cardListItem);
  }
}, elementsContainer)

section.rendererCards();

//Попап
// const popup = '.popup';
// const popupItems = Array.from(document.querySelectorAll(popup)); // сохраняем в переменную все попапы
// popupItems.forEach(popupItem => {
//   const newPopup = new Popup(popupItem);
//   newPopup.setEventListeners();
// });

//Попап открытия картинки
const popupCard = document.querySelector('.popup__open-card');
const popupOpenImage = new PopupWithImage(popupCard);



//Попап добавления карточки
const popupAddImage = document.querySelector('.popup__add-image');
const popupAdd = new PopupWithForm(popupAddImage,
  (data) => {
    const card = new Card(data.name, data.link, template);
    const cardAddImage = card.render();
    // popupAdd.renderCards(cardAddImage);
  }
);

// попап информация о пользователе
const userInfo = new UserInfo({
  profileName: '.profile__info-name',
  profileCareer: '.profile__info-text'
});

// Попап информации о пользовате
const popupInfo = document.querySelector('.popup__info');
const popupUserInfo = new PopupWithForm(popupInfo,
  (profileObject) => {
    userInfo.setUserInfo(profileObject);
  }
);

//Попап открытия картинки
// const popupOpenCard = document.querySelector('.popup__open-card');
// const popupFullSizeImage = new PopupWithImage(popupOpenCard);

popupUserInfo.setEventListeners();
popupAdd.setEventListeners();

const nameInput = document.querySelector('.popup__input_type_firstname');
const jobInput = document.querySelector('.popup__input_type_career');

//Обработчикик открытия попапа  информации
const popupOpenButton = document.querySelector('.profile__edit-button');
popupOpenButton.addEventListener('click', function () {
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().text;
  popupUserInfo.open();
});

//Обработчик сохранения введенных значений
const formElementInfo = document.querySelector('.popup__form-info');
const profileName = document.querySelector('.profile__info-name');
const profileCareer = document.querySelector('.profile__info-text');
formElementInfo.addEventListener('submit', function (event) {
  event.preventDefault();
  profileName.textContent = nameInput.value; // Это не правильно, я думаю
  profileCareer.textContent = jobInput.value; // и это тоже
  popupUserInfo.close();
})


//попап добавления картинок
const popupOpenAddImageButton = document.querySelector('.profile__add-button');
popupOpenAddImageButton.addEventListener('click', () => popupAdd.open());



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


