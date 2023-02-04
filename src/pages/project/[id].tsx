import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Trash } from "../../../icons";
import Header from "../../components/Header";
import Timer from "../../components/Timer";
import { fetchProject, fetchTasks, addTask, deleteTask } from "../../services";
import type { IProject } from "../../types";

export default function Project() {
  const router = useRouter();
  const { id } = router.query;

  const [project, setProject] = useState<IProject>();
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);

  const createTask = async () => {
    const task = await addTask(id, taskTitle);
    setTasks([...tasks, task]);
  };

  const remove = async (id: number) => {
    await deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };
  // UseEffect to fetch the project and tasks
  useEffect(() => {
    const fetchProjectAndTasks = async () => {
      const project = await fetchProject(id);
      setProject(project);
      const tasks = await fetchTasks(id);
      setTasks(tasks);
    };
    fetchProjectAndTasks();
  }, []);

  return (
    <>
      <Header />
      <h1 className="text-center text-4xl font-semibold">{project?.title}</h1>
      <div className="mt-10 grid flex-1 grid-cols-12 px-10">
        <div className="col-span-6">
          <div className="flex w-full flex-col justify-center">
            <div className="flex justify-center">
              <button
                onClick={() => createTask()}
                className="w-28 rounded-lg bg-primary py-2 px-4 text-sm font-semibold"
              >
                Create Task
              </button>
            </div>
            <div className="flex flex-col items-center space-y-5 p-10">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex w-2/3 justify-between rounded-md border-2 border-primary p-3"
                >
                  <p className="text-sm font-medium">{task.title}</p>
                  <button onClick={() => remove(task.id)} className="">
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-6">
          <Timer />
        </div>
      </div>
    </>
  );
}
