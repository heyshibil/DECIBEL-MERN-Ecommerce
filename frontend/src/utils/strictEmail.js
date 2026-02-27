import { z } from "zod";

export const strictEmail = z
  .string()
  .trim()
  .toLowerCase()
  .min(1, { message: "Email is required" })
  .email({ message: "Invalid email format" })
  .refine((email) => !email.includes(".."), {
    message: "Email cannot contain consecutive dots",
  });
