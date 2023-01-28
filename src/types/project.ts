import type { ITask } from "./task";

export interface IProject {
  userId: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  tasks: ITask[];
}
