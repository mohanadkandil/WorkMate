import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Header from "../../components/Header";
import type { IProject } from "../../types";

export default function Project() {
  const router = useRouter();
  const { id } = router.query;

  const [project, setProject] = useState<IProject>();
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);

  const getProject = async () => {
    const response = await fetch(`/api/project/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const project = await response.json();
    return project;
  };

  const addTask = async () => {
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
    setTasks([...tasks, task]);
  };

  const getTasks = async () => {
    const response = await fetch(`/api/project/tasks/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const tasks = await response.json();
    console.log("🚀 ~ file: [id].tsx:49 ~ getTasks ~ tasks", tasks);
    return tasks;
  };

  useEffect(() => {
    const fetchProject = async () => {
      const project = await getProject();
      setProject(project);
    };
    fetchProject();
  }, [id]);

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks();
      setTasks(tasks);
    };
    fetchTasks();
  }, []);

  return (
    <>
      <Header />
      <div className="flex w-full flex-col justify-center">
        <h1 className="text-center text-4xl font-semibold">{project?.title}</h1>
        <input
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          className="bg-red-600"
        />
        <button onClick={() => addTask()}>Add</button>
        {tasks.map((task) => (
          <div key={task.id}>{task.title}</div>
        ))}
      </div>
    </>
  );
}
