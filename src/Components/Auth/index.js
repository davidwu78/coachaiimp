class Auth {
  static signOut() {
    window.location.href = `${process.env.REACT_APP_ROOT}/logout`;
  }
  static setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = `; expires=${date.toUTCString()}`;
    }
    document.cookie = `${name}=${value || ''}${expires}; path=/`;
  }
  static getCookie(cname) {
    const name = `${cname}=`;
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }
  static getToken() {
    const idToken = Auth.getCookie('id_token');
    if (idToken === '') {
      return null;
    }
    return idToken;
  }
  static getRole() {
    const role = Auth.getCookie('role');
    if (role === '') {
      return null;
    }
    return role;
  }
  static getCurrentGroup() {
    const currentUser = Auth.getCookie('current_group');
    if (currentUser === '') {
      return null;
    }
    return currentUser;
  }
  static getCurrentGroupLevel() {
    const currentGroupLevel = Auth.getCookie('current_group_level');
    if (currentGroupLevel === '') {
      return null;
    }
    return currentGroupLevel;
  }
  static getRoleId() {
    const roleId = Auth.getCookie('role_id');
    if (roleId === '') {
      return null;
    }
    return roleId;
  }
  static clientId() {
    return '147805167060-fcorubkm4v6h2r0i58mdi49b8fs91qr2.apps.googleusercontent.com';
  }
}

export default Auth;
