import axios from 'axios';
import { create } from 'zustand';
import { IAuthenStore } from './interface';
import { messages } from './messages'
const BASEURL = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}`;

export const useAuthStore = create<IAuthenStore>((set) => ({
  authInfo: null,
  authToken: null,
  error: null,
  loginEpic: async (credentials: any) => {
    let message = messages.loginSuccess;
    try {
      const res = await axios.post(`${BASEURL}/login`, credentials, { withCredentials: true });
      if (res.status === 200) {
        const userInfo = JSON.stringify(res.data)
        sessionStorage.setItem('auth', userInfo);
        set({ authInfo: userInfo });
        window.location.href = '/'
      }
    } catch (error) {
      message = messages.loginFail;
      set({ error });
    } finally {
      // triggerNotify(message);
    }
  },
  signUpEpic: async (credentials: any) => {
    let message = messages.signUpSuccess;
    try {
      const res = await axios.post(`${BASEURL}/signup`, credentials, { withCredentials: true });
      if (res.status === 200) {
        const userInfo = JSON.stringify(res.data)
        sessionStorage.setItem('auth', userInfo);
        set({ authInfo: userInfo });
        window.location.href = '/'
      }
    } catch (error) {
      message = messages.signUpFail;
      set({ error });
    }
    finally {
      // triggerNotify(message);
    }
  },
  checkUserSessionEpic: async () => {
    try {
      const res = await axios.get(`${BASEURL}/session`, { withCredentials: true });
      return res.data;
    } catch (error) {
      return null;
    }
  },
  logoutEpic: async () => {
    await axios.post(`${BASEURL}/logout`, { withCredentials: true });
    sessionStorage.removeItem('auth');
    set({ authInfo: null });
    window.location.href = '/login';
  },
  getAuthenUserInfo: () => {
    set({ authInfo: JSON.parse(sessionStorage.getItem('auth')) || null });
  },
}));
