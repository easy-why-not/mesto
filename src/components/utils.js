export function renderLoading(isLoading) {
  const popup = document.querySelector('.popup_is-opened');
  console.log(popup)
  const buttonSubmit = popup.querySelector('.popup__submit');
  console.log(buttonSubmit)
  if (isLoading) {
    buttonSubmit.textContent = 'Сохранить...';
  }else {
    buttonSubmit.textContent = 'Сохранить';
  }
}
