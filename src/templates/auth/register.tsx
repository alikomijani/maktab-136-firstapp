import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import RegisterDataSchema, { type RegisterData } from "./register.validation";
import clsx from "clsx";

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: zodResolver(RegisterDataSchema),
  });
  const onSubmit = (data: RegisterData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className={clsx(
            errors.username && "text-red-500",
            "focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none",
          )}
          id="username"
          type="text"
          placeholder="Username"
          {...register("username")}
        />
        <p className="text-xs text-red-500 italic">
          {errors.username?.message}
        </p>
      </div>
      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="firstName"
        >
          First Name
        </label>
        <input
          className={clsx(
            errors.firstName && "text-red-500",
            "focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none",
          )}
          id="firstName"
          type="text"
          placeholder="First Name"
          {...register("firstName")}
        />
        <p className="text-xs text-red-500 italic">
          {errors.firstName?.message}
        </p>
      </div>

      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="lastName"
        >
          Last Name
        </label>
        <input
          className={clsx(
            errors.lastName && "text-red-500",
            "focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none",
          )}
          id="lastName"
          type="text"
          placeholder="Last Name"
          {...register("lastName")}
        />
        <p className="text-xs text-red-500 italic">
          {errors.lastName?.message}
        </p>
      </div>

      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="mobile"
        >
          Mobile
        </label>
        <input
          className={clsx(
            errors.mobile && "text-red-500",
            "focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none",
          )}
          id="mobile"
          type="text"
          placeholder="Mobile"
          {...register("mobile")}
        />
        <p className="text-xs text-red-500 italic">{errors.mobile?.message}</p>
      </div>

      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className={clsx(
            errors.email && "text-red-500",
            "focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none",
          )}
          id="email"
          type="email"
          placeholder="Email"
          {...register("email")}
        />
        <p className="text-xs text-red-500 italic">{errors.email?.message}</p>
      </div>

      <div className="mb-4">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className={clsx(
            errors.password && "text-red-500",
            "focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none",
          )}
          id="password"
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && errors.password.message && (
          <p className="text-xs text-red-500 italic">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="mb-6">
        <label
          className="mb-2 block text-sm font-bold text-gray-700"
          htmlFor="password2"
        >
          Confirm Password
        </label>
        <input
          className={clsx(
            errors.password2 && "text-red-500",
            "focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight text-gray-700 shadow focus:outline-none",
          )}
          id="password2"
          type="password"
          placeholder="Confirm Password"
          {...register("password2")}
        />
        <p className="text-xs text-red-500 italic">
          {errors.password2?.message}
        </p>
      </div>

      <button
        className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        type="submit"
      >
        Register
      </button>
    </form>
  );
}
