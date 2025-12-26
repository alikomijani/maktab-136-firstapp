import clsx from "clsx";
import {
  useState,
  type ChangeEventHandler,
  type FormEventHandler,
} from "react";

type RegisterData = {
  firstName: string;
  lastName: string;
  mobile: string;
  password: string;
  password2: string;
  email: string;
};

// function useState(defaultValue) {
//   const state = defaultValue;
//   const setState = async (value) => {
//     if (typeof value === "function") {
//       state = value(state);
//     } else {
//       state = value;
//     }
//     rerender();
//   };

//   return [state, setState];
// }

export default function Register() {
  const [data, setData] = useState<RegisterData>({
    email: "",
    firstName: "",
    lastName: "",
    mobile: "",
    password: "",
    password2: "",
  });

  const [errors, setErrors] = useState<
    Partial<Record<keyof RegisterData, string>>
  >({});

  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (isNaN(+data.mobile)) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        mobile: "mobile should container only number",
      }));
    }
    if (data.password !== data.password2) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        password2: "password is mismatch",
      }));
    }
    if ((data.password as string).length > 6) {
      setErrors((oldErrors) => ({
        ...oldErrors,
        password: "password is too lang",
      }));
    }
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
          />
        </div>

        <div className="form-field">
          <label htmlFor="lastName">last name</label>
          <input
            onChange={handleChange}
            value={data.lastName}
            type="text"
            name="lastName"
            id="lastName"
          />
        </div>

        <div className={clsx("form-field", errors.mobile && "error")}>
          <label htmlFor="mobile">mobile</label>
          <input
            onChange={handleChange}
            value={data.mobile}
            type="text"
            name="mobile"
            id="mobile"
          />
          {errors.mobile && (
            <small className="form-error">{errors.mobile}</small>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="email">email </label>
          <input
            onChange={handleChange}
            value={data.email}
            type="email"
            name="email"
            id="email"
          />
          {errors.email && <small className="form-error">{errors.email}</small>}
        </div>

        <div className="form-field">
          <label htmlFor="password">Password</label>
          <input
            onChange={handleChange}
            value={data.password}
            type="password"
            name="password"
            id="password"
          />
          {errors.password && (
            <small className="form-error">{errors.password}</small>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="password2">repeat password</label>
          <input
            onChange={handleChange}
            value={data.password2}
            type="password"
            name="password2"
            id="password2"
          />
          {errors.password2 && (
            <small className="form-error">{errors.password2}</small>
          )}
        </div>
        <button type="submit">register</button>
      </form>
    </div>
  );
}
