import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";

import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { currentUser } = await serverAuth(req);
    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser.favoritesIds,
        },
      },
    });

    if (!favoriteMovies) {
      res.status(404).json({ message: "Movies not found" });
      throw new Error("Movies not found");
    }

    return res.status(200).json(favoriteMovies);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
}
