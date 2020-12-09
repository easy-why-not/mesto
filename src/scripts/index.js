import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from "../components/PopupWithImage.js";
import '../pages/index.css';

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

function newCardRender (item) {
  return new Card(item.name, item.link, template, (data) => popupWithImage.open(data));
}

// Рендеринг карточек из массива
const template = '.template';
const elementsContainer = '.elements';
const section = new Section({
  initialCards: initialCards,
  renderer: (item) => {
    const listItem = newCardRender(item);
    // Возвращаем готовую карточку
    const cardListItem = listItem.render();
    section.renderCards(cardListItem);
  }
}, elementsContainer)
section.rendererCards();

//Попап добавления карточки
const popupAddImage = document.querySelector('.popup__add-image');
const popupAdd = new PopupWithForm(popupAddImage,
  (item) => {
    const card = newCardRender(item);
    const cardAddImage = card.render();
    section.renderCards(cardAddImage);
  }
);

//попап добавления картинок
const popupOpenAddImageButton = document.querySelector('.profile__add-button');
popupOpenAddImageButton.addEventListener('click', () => {
  addCardFormValidator.toggleButtonState();
  popupAdd.open()
});
//Обработчик сохранения картинок
popupAdd.setEventListeners();

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

//Обработчик сохранения введенных значений
popupUserInfo.setEventListeners();
const nameInput = document.querySelector('.popup__input_type_firstname');
const jobInput = document.querySelector('.popup__input_type_career');

//Обработчикик открытия попапа  информации
const popupOpenButton = document.querySelector('.profile__edit-button');
popupOpenButton.addEventListener('click', () => {
  profileFormValidator.toggleButtonState();
  const userInfoObj = userInfo.getUserInfo();
  nameInput.value = userInfoObj.name;
  jobInput.value = userInfoObj.text;
  popupUserInfo.open();
});


//Попап открытия картинки
const popupOpenImage = document.querySelector('.popup__open-card');
export const popupWithImage = new PopupWithImage(popupOpenImage);
popupWithImage.setEventListeners();


// Валидация

//выбираем отдельно формы
const profileForm = document.querySelector('.popup__form-info');
const addCardForm = document.querySelector('.popup__form_add-image');

//универсальная функция создания экзепляра класса FormValidator
function createFormValidator (popupForm) {
  return  new FormValidator({
    formSelector: 'form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit-invalid',
    inputErrorClass: 'popup__input_state-invalid',
    errorClass: 'error'
  }, popupForm);
}
// Создаем FormValidator для каждой формы
const profileFormValidator = createFormValidator(profileForm);
const addCardFormValidator = createFormValidator(addCardForm);
//Валидируем их
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();




// const formElements = Array.from(document.querySelectorAll('.popup__form'));
//
// formElements.forEach(popupForm => {
//   const formValidator = new FormValidator({
//     formSelector: 'form',
//     inputSelector: '.popup__input',
//     submitButtonSelector: '.popup__submit',
//     inactiveButtonClass: 'popup__submit-invalid',
//     inputErrorClass: 'popup__input_state-invalid',
//     errorClass: 'error'
//   }, popupForm);
//
//   formValidator.enableValidation();
// });


