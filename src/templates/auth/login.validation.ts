import { z } from "zod";

export const LoginFormSchema = z.object({
  username: z.email(),
  password: z.string().min(8, "کلمه عبور باید بیشتر از ۸ کارکتر باشد"),
});

export type LoginData = z.infer<typeof LoginFormSchema>;
