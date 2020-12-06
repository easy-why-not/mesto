export default class Section {
  constructor({initialCards, renderer}, containerSelector) {
    this._initialCards = initialCards;
    this.renderer = renderer; // функция которую будем передавать параметром в создании экземпляра класса
    this._container = document.querySelector(containerSelector);
  }
  //метод в котором проходим по объекту с данными для карточки и записываем ич значение в параметр item для передачи его в параметр конструктора renderer
  rendererCards() {
    this._initialCards.forEach(item => {
      this.renderer(item);
    })
  }
  // метод для отрисовки карточки и добавление карточки в начало списка
  renderCards(items) {
    this._container.append(items)
  };
}
