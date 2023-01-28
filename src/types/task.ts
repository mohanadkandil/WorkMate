export interface ITask {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  projectId: number;
  completed: boolean;
}
