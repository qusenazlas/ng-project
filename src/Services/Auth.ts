import axios from 'axios';
import TokenService from './TokenService';

// HTML-ENDPOINT: https://learn-backend-production-7c08.up.railway.app/

//HTTP Methods:  GET: เอาไว้ขอข้อมูล, POST: สร้างข้อมูลใหม่, DELETE: ลบข้อมูล, PATCH: เอาไว้แก้ไข, PUT: เอาไว้แก้ไขเหมือนกั แต่ไม่ค่อยมีคนใช้

export default class Auth {
  tokenService = new TokenService();
  async login(username: string, password: string) {
    const userData = { username: username, password: password };
    const response = await axios.post(
      'https://learn-backend-production-7c08.up.railway.app/login',
      userData
    );
    if (response.data?.accessToken) {
      this.tokenService.setToken(response.data?.accessToken);
    }

    return response.data;
  }

  async changePassword(
    username: string,
    password: string,
    oldPassword: string
  ) {
    const token = this.tokenService.getToken();
    const response = await axios.patch(
      'https://learn-backend-production-7c08.up.railway.app/user/change-password',
      { username: username, password: password, oldPassword: oldPassword },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  }

  async logout() {
    const token = this.tokenService.getToken();

    const response = await axios.post(
      'https://learn-backend-production-7c08.up.railway.app/logout',
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    this.tokenService.deleteToken();

    return response.data;
  }

  checkUserIsLoggedIn() {
    return this.tokenService.getToken() !== null;
  }

  async register(username: string, password: string) {
    const userData = { username: username, password: password };
    const response = await axios.post(
      'https://learn-backend-production-7c08.up.railway.app/register',
      userData
    );
    return response.data;
  }
}
