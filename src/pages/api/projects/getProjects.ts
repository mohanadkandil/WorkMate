import { prisma } from "../../../server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const projects = await prisma.project.findMany();
  res.json(projects);
}
