import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import serverAuth from "@/lib/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method !== "POST" && req.method !== "DELETE") {
      res.status(405).json({ message: "Method not allowed" });
    }

    const { currentUser } = await serverAuth(req);
    const { movieId } = JSON.parse(req.body);

    const existingFavorite = await prismadb.movie.findUnique({
      where: {
        id: `${movieId}`,
      },
    });

    if (!existingFavorite) {
      res.status(404).json({ message: "Movie not found" });
      throw new Error("Movie not found");
    }

    if (req.method === "POST") {
      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoritesIds: {
            push: movieId,
          },
        },
      });

      if (!user) {
        res.status(404).json({ message: "User not found" });
        throw new Error("User not found");
      }

      return res.status(200).json(user.favoritesIds);
    }

    if (req.method === "DELETE") {
      const clearedFavorites = currentUser.favoritesIds.filter(
        (id) => id !== movieId
      );

      const user = await prismadb.user.update({
        where: {
          email: currentUser.email || "",
        },
        data: {
          favoritesIds: clearedFavorites,
        },
      });

      if (!user) {
        res.status(404).json({ message: "User not found" });
        throw new Error("User not found");
      }

      return res.status(200).json(user.favoritesIds);
    }

    return res.status(500).json({ message: "Something went wrong" });
  } catch (err) {
    res.status(400).json({ message: `${err}` });
  }
}
