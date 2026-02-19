import { Link, NavLink, Outlet } from "react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/slices/authSlice";
import { Button, Container } from "@mui/material";

export default function Layout() {
  const auth = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  return (
    <Container>
      <div className="flex items-center justify-between">
        <nav className="flex gap-2 *:p-4">
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
        </nav>
        {auth.isLogin ? (
          <button
            onClick={() => {
              dispatch(logout());
            }}
          >
            {auth.user?.firstName} {auth.user?.lastName}
          </button>
        ) : (
          <Button component={Link} to={"/auth/login"}>
            login
          </Button>
        )}
      </div>

      <hr />
      <Outlet />
    </Container>
  );
}
