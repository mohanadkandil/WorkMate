import { prisma } from "../../../../../server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { completed, id } = req.body;
  const task = await prisma.task.update({
    where: {
      id,
    },
    data: {
      completed,
    },
  });
  res.json(task);
}
