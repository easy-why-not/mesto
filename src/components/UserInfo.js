export default class UserInfo {
  constructor({profileName, profileCareer}) {
    this._name = document.querySelector(profileName);
    this._career = document.querySelector(profileCareer);
  }
  // подставляет данные в попап информации
  getUserInfo() {
    const objUserInfo = {};
    objUserInfo.name= this._name.textContent;
    objUserInfo.about = this._career.textContent;
    return objUserInfo;

  }
  // добавляет введенные данные на страницу
  setUserInfo(profileObject) {
    this._name.textContent = profileObject.name;
    this._career.textContent = profileObject.about;
  }
}
