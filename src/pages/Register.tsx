import clsx from "clsx";
import { type ChangeEventHandler, type FormEventHandler } from "react";
import useForm from "../hooks/useForm";

type RegisterData = {
  firstName: string;
  lastName: string;
  mobile: string;
  password: string;
  password2: string;
  email: string;
};
const defaultFormDefaultValues: RegisterData = {
  email: "",
  firstName: "",
  lastName: "",
  mobile: "",
  password: "",
  password2: "",
};

export default function Register() {
  const { data, setData, errors, validate } = useForm(
    defaultFormDefaultValues,
    {
      mobile: (mobile: string) => {
        if (isNaN(+mobile)) {
          return "mobile should container only number";
        }
      },
      password: [
        (password: string, data: RegisterData) => {
          if (password !== data.password2) {
            return "password is mismatch";
          }
        },
        (password: string) => {
          if (password.length < 6) {
            return "password is too easy";
          }
        },
      ],
    },
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    const data = validate();
  };
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setData((oldData) => ({ ...oldData, [name]: value }));
  };
  return (
    <div className="container">
      <form noValidate onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="firstName">first name</label>
          <input
            onChange={handleChange}
            value={data.firstName}
            type="text"
            name="firstName"
            id="firstName"
            className="rounded-md border"
          />
        </div>

        <div className="form-field">
          <label htmlFor="lastName">last name</label>
          <input
            onChange={handleChange}
            value={data.lastName}
            type="text"
            className="rounded-md border"
            name="lastName"
            id="lastName"
          />
        </div>

        <div className={clsx("form-field", errors?.mobile && "error")}>
          <label htmlFor="mobile">mobile</label>
          <input
            onChange={handleChange}
            value={data.mobile}
            type="text"
            name="mobile"
            className="rounded-md border"
            id="mobile"
          />
          {errors?.mobile && (
            <small className="form-error">{errors?.mobile}</small>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="email">email </label>
          <input
            onChange={handleChange}
            className="rounded-md border"
            value={data.email}
            type="email"
            name="email"
            id="email"
          />
          {errors?.email && (
            <small className="form-error">{errors?.email}</small>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            value={data.password}
            type="password"
            className="rounded-md border"
            name="password"
            id="password"
          />
          {errors?.password &&
            errors?.password.map((error) => (
              <small className="form-error block">{error}</small>
            ))}
        </div>

        <div className="form-field">
          <label htmlFor="password2">repeat password</label>
          <input
            onChange={handleChange}
            value={data.password2}
            className="rounded-md border"
            type="password"
            name="password2"
            id="password2"
          />
          {errors?.password2 && (
            <small className="form-error">{errors?.password2}</small>
          )}
        </div>
        <button type="submit">register</button>
      </form>
    </div>
  );
}
