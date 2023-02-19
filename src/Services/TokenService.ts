export default class TokenService {
  localStorageInstance: Storage;

  constructor() {
    this.localStorageInstance = localStorage;
  }

  getToken() {
    return this.localStorageInstance.getItem('accessToken');
  }

  setToken(val: string) {
    this.localStorageInstance.setItem('accessToken', val);
  }
}
