import { prisma } from "../../../../server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const deletedProject = await prisma.project.delete({
    where: {
      id: id as string,
    },
  });
  res.json(deletedProject);
}
