export interface IAuthenStore {
  authInfo: any;
  error: any;
  loginEpic: (credentials: any) => void;
  signUpEpic: (credentials: any) => void;
  logoutEpic: () => void;
  getAuthenUserInfo: () => void;
  checkUserSessionEpic: () => void;
}
