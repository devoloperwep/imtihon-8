import { Link, NavLink } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";
import { useLogout } from "../hooks/useLogout";
import { useSelector } from "react-redux";

function Navbar() {
  const { theme, changeTheme } = useTheme();
  const { error, isPending, logout } = useLogout();
  const { user } = useSelector((store) => store.user);

  return (
    <header className="border-b border-base-200">
      <div className="container mx-auto px-4">
        <div className="navbar justify-between">
          <div className="flex-1">
            <Link className="font-bold text-red-400 text-2xl">Kitchen App</Link>
          </div>

          <div className="flex gap-3 md:gap-10 items-center">
            <label className="swap swap-rotate">
              <input
                type="checkbox"
                onChange={changeTheme}
                defaultChecked={theme === "dark"}
              />
              <svg
                className="swap-on h-8 w-8 md:h-10 md:w-10 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              ></svg>
              <svg
                className="swap-off h-8 w-8 md:h-10 md:w-10 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              ></svg>
            </label>

            <h3 className="truncate w-20 md:w-full font-semibold text-blue-400">
              {user.displayName}
            </h3>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="User avatar" src={user.photoURL} />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 gap-2 rounded-box z-10 mt-3 w-52 p-2 shadow"
              >
                <li>
                  <NavLink to="/" className="text-sm text-lime-700">
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink to="/editProfile" className="text-sm text-lime-700">
                    Edit profile
                  </NavLink>
                </li>
                <li>
                  {isPending ? (
                    <button
                      disabled
                      className="btn btn-sm btn-outline text-gray-400"
                    >
                      Logging out...
                    </button>
                  ) : (
                    <button
                      onClick={logout}
                      className="btn btn-sm btn-outline text-lime-700 hover:bg-lime-700 hover:text-white"
                    >
                      Logout
                    </button>
                  )}
                </li>

                {error && (
                  <li>
                    <p className="text-red-500 text-xs mt-1 text-center">
                      {error}
                    </p>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
