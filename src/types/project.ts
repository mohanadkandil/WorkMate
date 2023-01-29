import type { ITask } from "./task";

export interface IProject {
  id: number;
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  tasks: ITask[] | null;
}
