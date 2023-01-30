import { prisma } from "../../../../../server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, projectId } = req.body;
  const task = await prisma.task.create({
    data: {
      title,
      projectId,
    },
  });
  res.json(task);
}
