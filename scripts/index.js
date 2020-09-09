//Если кто-то будет это читать
//При открытом попапе нажатие на клавишу “Enter” или кнопку «Сохранить» изменяет на странице информацию о пользователе.
//Я так не умею - я все облазил, но не нашел как это сделать

let popup = document.querySelector('.popup');
let popupOpenButton = document.querySelector('.profile__open-popup');
let popupCloseButton = document.querySelector('.popup__close');

let nameInput = document.querySelector('.popup__input_type_name');
let jobInput = document.querySelector('.popup__input_type_career');
let profileName = document.querySelector('.profile__info-name');
let profileCareer = document.querySelector('.profile__info-text');

console.log({popup, popupOpenButton, popupCloseButton});

let popupToggle = function () {
  popup.classList.toggle('popup_is-opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileCareer.textContent;
}

popupOpenButton.addEventListener('click', popupToggle)
popupCloseButton.addEventListener('click', popupToggle)


// Находим форму в DOM
let formElement = document.querySelector('form')

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (event) {
    event.preventDefault();
    profileName.textContent = nameInput.value;
    profileCareer.textContent = jobInput.value;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener('submit', formSubmitHandler);
