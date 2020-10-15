

let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close');

let nameInput = document.querySelector('.popup__input_type_firstname');
let jobInput = document.querySelector('.popup__input_type_career');
let profileName = document.querySelector('.profile__info-name');
let profileCareer = document.querySelector('.profile__info-text');


const popupOpen = function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileCareer.textContent;
  popup.classList.add('popup_is-opened');
}

const popupClose = function () {
  popup.classList.remove('popup_is-opened');
}

popupOpenButton.addEventListener('click', popupOpen)
popupCloseButton.addEventListener('click', popupClose)



// Находим форму в DOM
let formElement = document.querySelector('form')

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (event) {
    event.preventDefault(); //отменяем отправку формы
    profileName.textContent = nameInput.value;
    profileCareer.textContent = jobInput.value;
    popupClose();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);



// Попап добавление картинок

let popupAddImage = document.querySelector('.popup__add-image');
let popupOpenAddImageButton = document.querySelector('.profile__add-button');
let popupCloseAdd = document.querySelector('.popup__close-add-image');

const popupAddOpen = function () {
  popupAddImage.classList.add('popup_is-opened');
};
const popupAddClose = function () {
  popupAddImage.classList.remove('popup_is-opened');
};

popupOpenAddImageButton.addEventListener('click', popupAddOpen)
popupCloseAdd.addEventListener('click', popupAddClose)


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


const elements = document.querySelector('.elements');
const saveImageButton = document.querySelector('.popup__save-image-button');
const inputName = document.querySelector('.popup__input_type_name');
const inputLink = document.querySelector('.popup__input_type_link');
const template = document.querySelector('.template');



const renderCards = () =>  {
  const items = initialCards.map(element => getItems(element));

  elements.prepend(...items)
};
// Удаление карточки
const handlerDelete = (event) => {
  event.target.closest('.card').remove();
};
// Кнопка лайк
const handlerLike = (event) => {
  event.target.closest('.card__button').classList.toggle('card__button-like');
};


const  popupOpenCard = document.querySelector('.popup__open-card');
const  popupCloseCard = document.querySelector('.popup__close-card');


const handlerOpenCard = function () {
  popupOpenCard.classList.add('popup_is-opened');
};

const  handlerCloseCard = function (event) {
  popupOpenCard.classList.remove('popup_is-opened');
};


const getItems = (data) => {
  const card = template.content.cloneNode(true);

  card.querySelector('.card__title').innerText = data.name;
  card.querySelector('.card__image').src = data.link;

  const cardTitle = card.querySelector('.card__title');
  console.log(cardTitle)

  const popupImage = document.querySelector('.popup__image');
  const popupText = document.querySelector('.popup__text');

  const templateImage = card.querySelector('.card__image');


  const cardDel = card.querySelector('.card__del');
  const buttonLike = card.querySelector('.card__button');

  popupCloseCard.addEventListener('click', handlerCloseCard);
  templateImage.addEventListener('click', function () {
    popupText.textContent = data.name;
    popupImage.src = data.link;

    handlerOpenCard();
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
    elements.prepend(item);
    inputName.value = '';
    inputLink.value = '';
    popupAddClose();

  });

};

renderCards();
saveImage();

