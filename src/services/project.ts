export const fetchProject = async (id: string) => {
  const response = await fetch(`/api/project/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const project = await response.json();
  return project;
};

export const addTask = async (id: string, taskTitle: string) => {
  console.log("🚀 ~ file: project.ts:13 ~ addTask ~ id", id);
  const response = await fetch(`/api/project/task/create/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: taskTitle,
      projectId: id,
    }),
  });
  const task = await response.json();
  return task;
};

export const deleteTask = async (id: number) => {
  const deletedProject = await fetch(`/api/project/task/delete/${id}`, {
    method: "DELETE",
  });
  return deletedProject;
};

export const fetchTasks = async (id: string) => {
  const response = await fetch(`/api/project/tasks/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const tasks = await response.json();
  return tasks;
};
