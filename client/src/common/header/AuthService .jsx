// Example: AuthService.js (a service to manage authentication)
class AuthService {
    static getToken() {
      return localStorage.getItem('token');
    }
  
    static setToken(token) {
      localStorage.setItem('token', token);
    }
  
    static removeToken() {
      localStorage.removeItem('token');
    }
  
    static isLoggedIn() {
      return !!this.getToken();
    }
  }
  
  export default AuthService;
  