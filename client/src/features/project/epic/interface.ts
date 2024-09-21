export interface IProjectStore {
  projects: any[],
  error: any;
  createProjectEpic: (project: any) => void;
  getAllProjectEpic: () => void;
  deleteProjectEpic: (id: string) => void;
  joinProjectEpic: (project: any) => void;
}
