import { Dialog } from "@headlessui/react";
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
  const [isOpen, setIsOpen] = useState(false);

  const [project, setProject] = useState<IProject>();
  const [taskTitle, setTaskTitle] = useState("");
  const [tasks, setTasks] = useState<any[]>([]);

  const createTask = async () => {
    const task = await addTask(id, taskTitle);
    setTasks([...tasks, task]);
    setTaskTitle("");
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
      <div className="grid min-h-screen flex-1 grid-cols-12 bg-[#004643] px-10">
        <div className="col-span-6 my-10">
          <h1 className="mb-10 text-center text-4xl font-semibold">
            {project?.title}
          </h1>
          <div className="flex w-full flex-col justify-center">
            <div className="flex justify-center">
              <button
                onClick={() => setIsOpen(true)}
                className="w-28 rounded-lg bg-[#f9bc60] py-2 px-4 text-sm font-semibold text-[#001e1d]"
              >
                Create Task
              </button>
              <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50"
              >
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                  <Dialog.Panel className="mx-auto flex max-w-sm flex-col items-center justify-center space-y-8 rounded-lg bg-white px-10 py-10">
                    <input
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                      className="w-full rounded-md border border-gray-400 p-2 sm:w-80"
                      placeholder="Task name"
                    />
                    <div>
                      <button
                        onClick={() =>
                          createTask().then(() => setIsOpen(false))
                        }
                        className="rounded-lg bg-primary py-2 px-4 text-sm font-medium"
                      >
                        Create
                      </button>
                    </div>
                  </Dialog.Panel>
                </div>
              </Dialog>
            </div>
            <div className="flex flex-col items-center space-y-5 p-10">
              {tasks.map((task) => (
                <div
                  key={task.id}
                  className="flex w-2/3 justify-between rounded-md border-2 border-[#f9bc60] p-3 text-white"
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
        <div className="col-span-6 my-10">
          <Timer />
        </div>
      </div>
    </>
  );
}
