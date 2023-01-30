import { prisma } from "../../../../server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const tasks = await prisma.task.findMany({
    where: {
      projectId: String(id),
    },
  });
  res.json(tasks);
}
