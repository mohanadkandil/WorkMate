import { prisma } from "../../../server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function Project(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const project = await prisma.project.findUnique({
    where: {
      id: String(id),
    },
  });
  res.json(project);
}
