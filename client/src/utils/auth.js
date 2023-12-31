import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    try {
      if (this.loggedIn) {
        return decode(this.getToken());
      }
    } catch (err) {
      console.error(err)
    }

  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  empLogged() {
    if (this.loggedIn()) {
      const state = this.getProfile().data
      if (!state.firstName) {
        return true
      }
    }
    return false
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    // Saves user token to localStorage
    localStorage.setItem('id_token', idToken);

    window.location.assign('/');
  }

  logout() {

    localStorage.removeItem('id_token');

    window.location.assign('/');
  }
}

const authService = new AuthService(); 

export default authService; 