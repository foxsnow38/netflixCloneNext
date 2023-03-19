import bcrypt from "bcrypt";
import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();
  const { name, password, email } = req.body;
  try {
    const existingUser = await prismadb.user.findFirst({
      where: { email: email },
    });
    if (existingUser) {
      return res.status(422).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await prismadb.user.create({
      data: {
        email,
        hashedPassword,
        name,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(200).json({ message: "User created" });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}
