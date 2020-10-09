

let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close');

let nameInput = document.querySelector('.popup__input_type_firstname');
let jobInput = document.querySelector('.popup__input_type_career');
let profileName = document.querySelector('.profile__info-name');
let profileCareer = document.querySelector('.profile__info-text');

console.log({popup, popupOpenButton, popupCloseButton});

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
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileCareer.textContent = jobInput.value;
    popupClose();
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);



//Добавление картинок

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


