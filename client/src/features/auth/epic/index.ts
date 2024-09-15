import { create } from 'zustand';
import { IAuthenStore } from './interface';
import { messages } from './messages'
import apiClient from '@/lib/instanceAPI'
import { handleLogout } from '@/lib/utils';

export const useAuthStore = create<IAuthenStore>((set) => ({
  authInfo: null,
  authToken: null,
  error: null,
  loginEpic: async (credentials: any) => {
    let message = messages.loginSuccess;
    try {
      const res = await apiClient.post('/login', credentials);
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
      const res = await apiClient.post('/signup', credentials);
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
      const res = await apiClient.get('/session');
      return res.data;
    } catch (error) {
      return null;
    }
  },
  logoutEpic: async () => {
    try {
      sessionStorage.removeItem('auth');
      set({ authInfo: null });
      handleLogout()
    } catch (error) {
      set({ error });
    }
  },
  getAuthenUserInfo: () => {
    set({ authInfo: JSON.parse(sessionStorage.getItem('auth')) || null });
  },
}));
