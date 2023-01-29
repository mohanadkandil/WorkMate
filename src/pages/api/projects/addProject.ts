/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../server/db";
import type { IProject } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { title, userId }: Pick<IProject, "title" | "userId"> = req.body;

  const result = await prisma.project.create({
    data: {
      title,
      userId,
    },
  });

  res.json(result);
}
