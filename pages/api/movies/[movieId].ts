import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "../../../lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(405).json({ message: "Method not allowed" });
  }

  try {
    await serverAuth(req);
    const { movieId } = req.query as { movieId: string };

    if (typeof movieId !== "string" && !movieId) {
      res.status(400).json({ message: "Bad request" });
      throw new Error("Invalid MovieId");
    }

    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
      throw new Error("Movie not found");
    }

    res.status(200).json(movie);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
