import { Request, Response } from "express";
import { User, users } from "../models/admin";

export const loginUser = (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Find user with matching email
  const user = users.find((user) => user.email === email);

  // If user is found and password matches, return success message
  if (user && user.password === password) {
    res.json({ message: "correct input Login successful" });
  } else {
    // If user is not found or password is incorrect, return error message
    res.status(401).json({ message: "Invalid email or password" });
  }
};
