/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";
import type { IProject } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, createdAt, updatedAt, userId, tasks }: IProject = req.body;

  const result = await prisma.project.create({
    data: {
      title,
      createdAt,
      updatedAt,
      userId,
      tasks,
    },
  });

  res.json(result);
}
