import { useForm, Controller } from "react-hook-form";
type LoginData = {
  username: string;
  password: string;
  password2: string;
};
export default function LoginForm() {
  const {
    register, // وصل کردن اینپوت به فرم
    handleSubmit, // هندل کردن ایونت سابمیت هست.
    formState: { errors }, // خطاهای ولیدیشن
    watch, // گرفتن مقدار یه اینپوت
    reset, //ریست فرم و یا ست کردن دیفالت ولیو
    setValue, // ست کردن ولیو استفاده میشه
    getValues, // خوندن همه مقادیر فرم استفاده میشه
    control,
  } = useForm<LoginData>({
    defaultValues: {
      username: "ali",
    },
  });
  console.log("render");
  return (
    <form noValidate onSubmit={handleSubmit((data) => console.log(data))}>
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
          {...register("username", {
            validate: (value) =>
              value !== "ali" ? "مقدار باید برابر ali باشد" : undefined,
          })}
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
          rules={{
            required: "این فیلد اجباری است",
          }}
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

      <div className="mb-6">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="password"
        >
          Repeat Password
        </label>
        <input
          className="focus:shadow-outline mb-3 w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none"
          id="password"
          type="password"
          placeholder="******************"
          {...register("password2")}
        />
        <p className="text-xs italic">{errors.password2?.message}</p>
      </div>
      <button type="submit">login</button>
      <button
        type="button"
        onClick={() => {
          reset({
            username: "reza",
          });
        }}
      >
        reset
      </button>
    </form>
  );
}
// RHF -> React Hook Form
