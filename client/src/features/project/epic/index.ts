import axios from 'axios';
import { create } from 'zustand';
import { messages } from './messages'
import { IProjectStore } from "@/features/project/epic/interface";
const BASEURL = `http://localhost:${import.meta.env.VITE_BACKEND_PORT}`;

export const useProjectStore = create<IProjectStore>((set) => ({
  projects: [],
  error: null,
  createProjectEpic: async (project: any) => {
    let message = messages.createProjectSuccess
    try {
      const res = await axios.post(`${BASEURL}/project/create`, project, { withCredentials: true });
      if (res.status === 200) {
      }
    } catch (error) {
      message = messages.createProjectFail
      set({ error });
    } finally {
      // triggerNotify(message);
    }
  },
  getAllProjectEpic: async () => {
    try {
      const res = await axios.get(`${BASEURL}/project`, { withCredentials: true });
      if (res.status === 200) {
        set({ projects: res.data })
      }
    } catch (error) {
      set({ error });
    } finally {
      // triggerNotify(message);
    }
  }
}));
