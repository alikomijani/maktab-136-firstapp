import { NavLink, Outlet } from "react-router";

export default function Layout() {
  return (
    <div className="container mx-auto max-w-2xl">
      <div className="flex gap-2 *:p-4">
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "red" : "unset",
          })}
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "red" : "unset",
          })}
          to="/timer"
        >
          Timer
        </NavLink>
        <NavLink
          style={({ isActive }) => ({
            color: isActive ? "red" : "unset",
          })}
          to="/about-us"
        >
          About us
        </NavLink>
      </div>
      <hr />
      <Outlet />
    </div>
  );
}
