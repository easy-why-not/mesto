export default class UserInfo {
  constructor({profileName, profileCareer, profileAvatar}) {
    this._name = document.querySelector(profileName);
    this._career = document.querySelector(profileCareer);
    this._avatar = document.querySelector(profileAvatar);
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
    this._avatar.src = profileObject.avatar
  }

  setUserImage(profileObject) {
    this._avatar.src = profileObject;
  }
}
