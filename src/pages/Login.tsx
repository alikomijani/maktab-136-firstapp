import {
  useState,
  type ChangeEventHandler,
  type FormEventHandler,
} from "react";

type LoginData = {
  email: string;
  password: string;
};
export default function Login() {
  const handleSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    console.log(data);
  };
  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target;
    setData((oldData) => ({ ...oldData, [name]: value }));
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input
            className="border"
            onChange={handleChange}
            value={data.email}
            type="text"
            name="email"
            id="email"
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">password</label>
          <input
            onChange={handleChange}
            value={data.password}
            type="password"
            name="password"
            id="password"
          />
        </div>
        <div className="form-field">
          <button
            className="border-0 bg-amber-800 text-amber-50 p-2"
            type="submit"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
