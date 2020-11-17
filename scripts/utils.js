export const popupImage = document.querySelector('.popup__image');
export const popupText = document.querySelector('.popup__text');
export const  popupOpenCard = document.querySelector('.popup__open-card');
export const  popupCloseCard = document.querySelector('.popup__close-card');

// Универсальная функция открытия попапа
export const popupOpen = function (popups) {
  popups.classList.add('popup_is-opened');

  //обработчик закрытия попапа по esc
  document.addEventListener('keydown', escClose);
};

// Универсальная функция закрытия попапа
export const popupClose = function (popup) {
  popup.classList.remove('popup_is-opened');

  //снимаем обработчик закрытия попапа по esc
  document.removeEventListener('keydown', escClose);
};

// Закрытие по клику
export const handlerOverlayClose = function (event) {
  const popupTarget = event.target.closest('.popup');
  if (event.target === popupTarget) {
    popupClose(popupTarget);
  }
};

//закрытие попапа esc
export const escClose = function (evt) {
  if (evt.key === 'Escape') {
    const popupIsOpened = document.querySelector('.popup_is-opened');
    popupClose(popupIsOpened);
  }
};
