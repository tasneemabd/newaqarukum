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


    static logout() {
      // Your logout logic here
      // For example, clearing local storage or sending a logout request to the server
      localStorage.removeItem('token');
    }
  
  
  }// AuthService.js




 

  

  
  export default AuthService;
  