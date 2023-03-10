import { Dialog } from "@headlessui/react";
import React, { useState, useEffect } from "react";
import Header from "../../components/Header";
import { Trash } from "../../../icons";
import type { IProject } from "../../types";
import Link from "next/link";

export default function Projects() {
  const [isOpen, setIsOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [projects, setProjects] = useState<IProject[]>([]);

  const createProject = async () => {
    const response = await fetch("/api/project/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: "cldg0m2ch0000vlxkdm0ss5ml",
        title: projectName,
      }),
    });
    const project = await response.json();
    setProjects([...projects, project]);
    setProjectName("");
  };

  const getProjects = async (): Promise<IProject[]> => {
    const response = await fetch("/api/projects/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const projects = await response.json();
    return projects;
  };

  const deleteProject = async (id: number): Promise<void> => {
    await fetch(`/api/project/delete/${id}`, {
      method: "DELETE",
    });
    setProjects(projects.filter((project) => project.id !== id));
  };

  useEffect(() => {
    const fetchProjects = async () => {
      const projects = await getProjects();
      setProjects(projects);
    };
    fetchProjects();
  }, []);

  return (
    <>
      <Header />
      <div className="flex min-h-screen flex-col space-y-8 bg-[#004643]">
        <div className="my-10 flex justify-center">
          <button
            className="rounded-md bg-[#f9bc60] px-3.5 py-2 text-lg font-semibold text-[#001e1d]"
            onClick={() => setIsOpen(true)}
          >
            New Project
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
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  className="w-full rounded-md border border-gray-400 p-2 sm:w-80"
                  placeholder="Project name"
                />
                <div>
                  <button
                    onClick={() => createProject().then(() => setIsOpen(false))}
                    className="rounded-lg bg-primary py-2 px-4 text-sm font-medium"
                  >
                    Create
                  </button>
                </div>
              </Dialog.Panel>
            </div>
          </Dialog>
        </div>
        <ul className="flex flex-col items-center space-y-8">
          {projects.map((project) => (
            <li key={project.id}>
              <div className="z-0 flex w-[700px] items-center justify-between rounded-xl bg-[#fffffe] p-8">
                <Link
                  href={`/project/${project.id}`}
                  className="flex w-full justify-between"
                >
                  <div className="flex">
                    <div className="mr-16 flex flex-col">
                      <span className="text-2xl font-medium">
                        {project.title}
                      </span>
                      <span className="text-sm font-medium text-gray-400">
                        {project.tasks?.length} Tasks completed
                      </span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="relative h-4 w-[240px] rounded-lg bg-[#D9D9D9]">
                        <div className="absolute left-0 h-full rounded-lg bg-primary"></div>
                      </div>
                      <span className="text-xl font-medium">0%</span>
                    </div>
                  </div>
                </Link>
                <div className="z-10 flex">
                  <button onClick={() => deleteProject(project.id)}>
                    <Trash className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
