import { z } from "zod";

const RegisterDataSchema = z
  .object({
    username: z
      .string()
      .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
      .refine((username) => !username.includes(" "), {
        message: "نام کاربری نباید شامل فاصله باشد",
      })
      .refine(
        async (username) => {
          // Simulate an async check, e.g., checking username availability
          const takenUsernames = ["admin", "user", "test"];
          return !takenUsernames.includes(username);
        },
        {
          message: "نام کاربری قبلا گرفته شده است",
        },
      ),
    firstName: z.string().min(1, "نام نمی‌تواند خالی باشد"),
    lastName: z.string().min(1, "نام خانوادگی نمی‌تواند خالی باشد"),
    mobile: z
      .string()
      .regex(/^09[0-9]{9}$/, "شماره موبایل باید با 09 شروع شود و 11 رقم باشد"),
    password: z
      .string()
      .min(8, "کلمه عبور باید حداقل ۸ کاراکتر باشد")
      .max(32, "کلمه عبور نباید بیشتر از ۳۲ کاراکتر باشد")
      .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
      .regex(/[0-9]/, "Password must contain at least one number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character",
      ),
    email: z.email("ایمیل وارد شده معتبر نیست"),
    password2: z.string(),
  })
  .refine((data) => data.password === data.password2, {
    message: "کلمه‌های عبور مطابقت ندارند",
    path: ["password2"],
  });

export type RegisterData = z.infer<typeof RegisterDataSchema>;

export default RegisterDataSchema;
