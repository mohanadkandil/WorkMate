import { prisma } from "../../../../../server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const task = await prisma.task.delete({
    where: {
      id,
    },
  });
  res.json(task);
}
