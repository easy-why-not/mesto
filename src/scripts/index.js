import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithImage from "../components/PopupWithImage.js";
import Api from '../components/Api.js';
import PopupWithSubmit from '../components/PopupWithSubmit.js';
import '../pages/index.css';
import { renderLoading, userInfoObj, formValidatorObj } from '../utils/utils.js';


// 1.подключение к серверу
const api = new Api({
  url: 'https://mesto.nomoreparties.co/v1/cohort-18/cards',
  headers: {
    authorization: 'e2315ec0-9d36-47b6-91be-ca15417afdd8',
    'content-type': 'application/json'
  }
});

const userInfo = new UserInfo(userInfoObj);

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
  (data) => {
    renderLoading(true);
    api.addUserApi(data).then((data) => {
      userInfo.setUserInfo(data);
    }).catch((err) => alert(err))
      .finally(() => {
        renderLoading(false);
        popupUserInfo.close();
      })
  }
);

// попап изменение аватара
const popupAvatarEdit = document.querySelector('.popup__avatar-edit');
const popupAddButton = document.querySelector('.profile__edit-avatar');
popupAddButton.addEventListener('click', () => {
  popupAddAvatar.open();
  avatarAddFormValidator.toggleButtonState();
  avatarAddFormValidator.resetError();
});


//Изменение аватара
const popupAddAvatar = new PopupWithForm(popupAvatarEdit,
  (data) => {
    // console.log(data)
    renderLoading(true);
    api.addUserAvatar(data)
      .then((res) => {
        userInfo.setUserInfo(res);
      }).catch((err) => alert(err))
      .finally(() => {
        renderLoading(false);
        popupAddAvatar.close();
      })
  })

popupAddAvatar.setEventListeners();

// Обработчикик открытия попапа  информации
const popupOpenButton = document.querySelector('.profile__edit-button');
popupOpenButton.addEventListener('click', () => {
  profileFormValidator.toggleButtonState();
  profileFormValidator.resetError();
  const userInfoObj = userInfo.getUserInfo();
  nameInput.value = userInfoObj.name;
  jobInput.value = userInfoObj.about;

  popupUserInfo.open();
});

const popupwithsubmitform = document.querySelector('.popup__with-submit');
const popupWithSubmit = new PopupWithSubmit(popupwithsubmitform);

const template = '.template'; //template шаблон
const elementsContainer = '.elements';

//Универсальная функция создания экземпляра класса Card
function newCardRender(item) {
  const card = new Card(item.name, item.link, item.likes, item.owner._id, userId, item._id, template,
    (data) => popupWithImage.open(data),
    () => {
      popupWithSubmit.setSubmitAction(() => {
        api.deleteCards(item._id)
          .then(() => {
            card.handlerDelete();
          })
          .catch((err) => alert(err))
          .finally(() => {
            popupWithSubmit.close();
          })
      });
      popupWithSubmit.open();
    },
    () => {
      if (card.isLiked()) {
        api.dislikeCard(item._id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => alert(err));
      } else {
        api.likeCard(item._id)
          .then((res) => {
            card.setLikes(res.likes);
          })
          .catch((err) => alert(err));
      }
    });
  return card;
}

popupWithSubmit.setEventListeners();

// Экземпляр класса section
const section = new Section((item) => {

  const listItem = newCardRender(item);
  // Возвращаем готовую карточку
  const cardListItem = listItem.render();
  section.renderCards(cardListItem);
}, elementsContainer)

//добавление новой карточки
const popupAddImage = document.querySelector('.popup__add-image');
const popupAdd = new PopupWithForm(popupAddImage,
  (data) => {
    renderLoading(true);
    api.addNewCards(data)
      .then((item) => {
        const card = newCardRender(item);
        const cardAddImage = card.render();
        section.renderCards(cardAddImage);
      })
      .catch((err) => alert(err))
      .finally(() => {
        renderLoading(false);
        popupAdd.close();
      })
  }
);

// //попап добавления картинок
const popupOpenAddImageButton = document.querySelector('.profile__add-button');
popupOpenAddImageButton.addEventListener('click', () => {
  addCardFormValidator.toggleButtonState();
  addCardFormValidator.resetError();
  popupAdd.open();
});
//Обработчик сохранения картинок
popupAdd.setEventListeners();

//Обработчик сохранения введенных значений
popupUserInfo.setEventListeners();
const nameInput = document.querySelector('.popup__input_type_firstname');
const jobInput = document.querySelector('.popup__input_type_career');

//Попап открытия картинки
const popupOpenImage = document.querySelector('.popup__open-card');
const popupWithImage = new PopupWithImage(popupOpenImage);
popupWithImage.setEventListeners();

// Валидация
//выбираем отдельно формы
const profileForm = document.querySelector('.popup__form-info');
const addCardForm = document.querySelector('.popup__form_add-image');
const avatarAddForm = document.querySelector('.popup__form-avatar-edit')

//универсальная функция создания экзепляра класса FormValidator
function createFormValidator(popupForm) {
  return new FormValidator(formValidatorObj, popupForm);
}

// Создаем FormValidator для каждой формы
const profileFormValidator = createFormValidator(profileForm);
const addCardFormValidator = createFormValidator(addCardForm);
const avatarAddFormValidator = createFormValidator(avatarAddForm);
//Валидируем их
profileFormValidator.enableValidation();
addCardFormValidator.enableValidation();
avatarAddFormValidator.enableValidation();







