export interface IProjectStore {
  projects: any[],
  error: any;
  createProjectEpic: (project: any) => void;
  getAllProjectEpic: () => void;
}
