import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from "../components/PopupWithImage.js";
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import '../pages/index.css';

// 1.подключение к серверу
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-18/cards',
  headers: {
    authorization: 'e2315ec0-9d36-47b6-91be-ca15417afdd8',
    'content-type': 'application/json'
  }
});


// попап информация о пользователе
const userInfo = new UserInfo({
  profileName: '.profile__info-name',
  profileCareer: '.profile__info-text'
});


// //Промис элл
let userId = null;

const getAllCardsConst = api.getAllCards();
const getUserIdConst = api.getUserApi();
const promiseAll = [getAllCardsConst, getUserIdConst];
// Отрисовка всех карточек
// Редактирование профиля
Promise.all(promiseAll)
  .then(([allCards, userData]) => {
    userId = userData._id;

    section.rendererCards(allCards);

    userInfo.setUserInfo(userData);

  })
  .catch((err) => alert(err));


// Попап информации о пользовате
const popupInfo = document.querySelector('.popup__info');
const popupUserInfo = new PopupWithForm(popupInfo,
  (profileObject) => {
    api.addUserApi(profileObject).then((data) => {
      userInfo.setUserInfo(data);
    }).catch((err) => alert(err));

  }
);

// Обработчикик открытия попапа  информации
const popupOpenButton = document.querySelector('.profile__edit-button');
popupOpenButton.addEventListener('click', () => {
  profileFormValidator.toggleButtonState();
  const userInfoObj = userInfo.getUserInfo();
  nameInput.value = userInfoObj.name;
  jobInput.value = userInfoObj.about;
  popupUserInfo.open();
});

const popupwithsubmitform = document.querySelector('.popup__with-submit');
const popupWithSubmit = new PopupWithSubmit(popupwithsubmitform);


//
//
const template = '.template'; //template шаблон
const elementsContainer = '.elements';
//Универсальная функция создания экземпляра класса Card
function newCardRender (item) {
  const card = new Card(item.name, item.link, item.likes, item.owner._id, userId, item._id, template,
    (data) => popupWithImage.open(data),
    () => {
    popupWithSubmit.setSubmitAction(() => {
      api.deleteCards(item._id)
        .then(() => {
          card.handlerDelete();

        }).catch((err) => alert(err));

    });
    popupWithSubmit.open();

    },
    () => {
      if (card.isLiked()) {
        api.dislikeCard(item._id)
          .then((res) => {
            card.setLikes(res);
          })
      } else {
        api.likeCard(item._id)
          .then(() => {
            card.setLikes();
          })
      }
    });
  return card;
}
popupWithSubmit.setEventListeners();

// Экземпляр класса section
const section = new Section( (item) => {

  const listItem = newCardRender(item);
  // Возвращаем готовую карточку
  const cardListItem = listItem.render();
  section.renderCards(cardListItem);
}, elementsContainer)
//



//
//
//
//
//добавление новой карточки
const popupAddImage = document.querySelector('.popup__add-image');
const popupAdd = new PopupWithForm(popupAddImage,
  (data) => {
    api.addNewCards(data)
      .then((item) => {
        const card = newCardRender(item);
        const cardAddImage = card.render();
        section.renderCards(cardAddImage);
    })
      .catch((err) => alert(err));
  }
);


// //попап добавления картинок
const popupOpenAddImageButton = document.querySelector('.profile__add-button');
popupOpenAddImageButton.addEventListener('click', () => {
  addCardFormValidator.toggleButtonState();
  popupAdd.open()
});
//Обработчик сохранения картинок
popupAdd.setEventListeners();



//Обработчик сохранения введенных значений
popupUserInfo.setEventListeners();
const nameInput = document.querySelector('.popup__input_type_firstname');
const jobInput = document.querySelector('.popup__input_type_career');



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







