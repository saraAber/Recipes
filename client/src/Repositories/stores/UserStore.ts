import { makeAutoObservable } from "mobx";

class UserStore {
  currentUser: any = null;

  constructor() {
    makeAutoObservable(this);
    this.loadUserFromStorage();
  }

  setCurrentUser(user: any) {
    this.currentUser = user;
    localStorage.setItem('user', JSON.stringify(user));
  }

  clearCurrentUser() {
    this.currentUser = null;
    localStorage.removeItem('user');
  }

  logout() {
    this.clearCurrentUser();
  }

  loadUserFromStorage() {
    try {
      const stored = localStorage.getItem('user');
      if (stored) {
        this.currentUser = JSON.parse(stored);
      }
    } catch (error) {
      console.error("שגיאה בטעינת המשתמש מה-localStorage", error);
      this.currentUser = null;
    }
  }
}

export default new UserStore();