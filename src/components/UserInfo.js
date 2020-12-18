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
    if (profileObject.name) {
      this._name.textContent = profileObject.name;
    }

    if (profileObject.about) {
      this._career.textContent = profileObject.about;
    }

    if(profileObject.avatar) {
      this._avatar.src = profileObject.avatar;
    }
  }
}
