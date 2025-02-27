import { NavLink, Outlet } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Layout() {
  const { setToken } = useApp();
  function handleLogout() {
    setToken(null);
    localStorage.removeItem("token");
  }

  return (
    <div className="container py-10 px-4 mx-auto">
      <nav className="mb-3">
        <ul className="flex gap-4">
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "text-blue-400" : "")}
              to="/dashboard"
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              className={({ isActive }) => (isActive ? "text-blue-400" : "")}
              to="/users/create"
            >
              Create User
            </NavLink>
          </li>
          <li>
            <button
              className="cursor-pointer hover:text-blue-400 duration-300"
              onClick={handleLogout}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
}
