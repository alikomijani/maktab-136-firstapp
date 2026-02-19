import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema, type LoginData } from "./login.validation";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fakeLoginAction } from "../../redux/slices/authSlice";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export default function LoginForm() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const auth = useAppSelector((state) => state.auth);
  const {
    register, // وصل کردن اینپوت به فرم
    handleSubmit, // هندل کردن ایونت سابمیت هست.
    formState: { errors }, // خطاهای ولیدیشن
    reset, //ریست فرم و یا ست کردن دیفالت ولیو
    control,
  } = useForm<LoginData>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      username: "ali",
      password: "",
    },
  });

  useEffect(() => {
    if (auth.isLogin) {
      navigate("/");
    }
  }, [auth.isLogin]);

  return (
    <form
      noValidate
      onSubmit={handleSubmit((data) => {
        dispatch(fakeLoginAction(data));
      })}
    >
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          id="username"
          type="text"
          placeholder="Username"
          {...register("username")}
        />
        <p className="text-xs italic">{errors.username?.message}</p>
      </div>
      <div className="mb-6">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="password"
        >
          Password
        </label>
        <Controller
          name="password"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <input
                className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
                id="password"
                type="password"
                placeholder="******************"
                value={field.value}
                onChange={field.onChange}
                onBlur={field.onBlur}
                ref={field.ref}
              />
              <p className="text-xs italic">{fieldState.error?.message}</p>
            </>
          )}
        />
      </div>

      <button
        disabled={auth.isLoading}
        className="mx-2 rounded-2xl border px-4 py-2 disabled:text-neutral-400"
        type="submit"
      >
        login
      </button>
      <button
        className="mx-2 rounded-2xl border px-4 py-2"
        type="button"
        onClick={() => reset()}
      >
        reset
      </button>
    </form>
  );
}
// RHF -> React Hook Form
