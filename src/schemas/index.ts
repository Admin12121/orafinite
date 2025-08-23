import * as z from "zod";

// Email optional: allow "", convert to undefined
const optionalEmail = z
  .union([z.string().email({ message: "Invalid email" }), z.literal("")])
  .transform((v) => (v === "" ? undefined : v))
  .optional();

export const LoginSchema = z.object({
  email: optionalEmail
});

export const RegisterSchema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters long" }),
  store: z.string().min(3, { message: "Store name must be at least 3 characters long" }),
  phone: z.string().min(10, { message: "Phone number must be at least 10 digits long" }),
  email: optionalEmail
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
