import { create } from 'zustand';
import { messages } from './messages'
import { IProjectStore } from "@/features/project/epic/interface";
import { handleLogout } from '@/lib/utils';
import apiClient from '@/lib/instanceAPI'

export const useProjectStore = create<IProjectStore>((set, get) => ({
  projects: [],
  error: null,
  createProjectEpic: async (project: any) => {
    // let message = messages.createProjectSuccess
    try {
      const projects = get().projects
      if (!projects.some(item => item.name === project.name)) {
        const res = await apiClient.post('/project/create', project)
        if (res.status === 200) {
          set({ projects: [...get().projects, res.data] })
        }
      }
      else {
        alert('Project existed')
      }
    } catch (error) {
      if (error.response.status == 401) {
        handleLogout()
      }
      set({ error });
    } finally {
      // triggerNotify(message);
    }
  },
  getAllProjectEpic: async () => {
    try {
      const res = await apiClient.get(`/project`)
      if (res.status === 200) {
        set({ projects: res.data })
      }
    } catch (error) {
      if (error.response.status == 401) {
        handleLogout()
      }
      set({ error });
    } finally {
      // triggerNotify(message);
    }
  },
  deleteProjectEpic: async (id: string) => {
    try {
      const res = await apiClient.delete(`/project/${id}`)
      if (res.status === 204) {
        set({ projects: get().projects.filter(project => project.id !== id) })
      }
    } catch (error) {
      if (error.response.status == 401) {
        handleLogout()
      }
      set({ error });
    } finally {
      // triggerNotify(message);
    }
  }
}));
