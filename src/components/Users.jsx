import { Link } from "react-router-dom";

function Users({ user }) {
  if (!user) return <div className="p-4 text-gray-500">Loading users...</div>;

  return (
    <div className="p-6">
      <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b border-gray-100 dark:border-gray-700">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "User avatar"}
              className="w-14 h-14 rounded-full object-cover"
            />
          ) : (
            <div className="w-14 h-14 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold text-lg">
              {(
                (user.displayName || "")
                  .split(" ")
                  .map((s) => s[0])
                  .slice(0, 2)
                  .join("") || (user.email || "U").slice(0, 1)
              ).toUpperCase()}
            </div>
          )}

          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <div className="truncate text-lg font-medium text-gray-900 dark:text-gray-100">
                {user.displayName || user.email || "No name"}
              </div>
              <span
                className={`text-xs px-2 py-1 rounded-full ${
                  user.online
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {user.online ? "Online" : "Offline"}
              </span>
            </div>

            <div className="mt-2 text-sm text-gray-500 dark:text-gray-400 truncate">
              {user.email && <div>{user.email}</div>}
              <div className="mt-1 text-xs">
                ID: {user.uid || user.id || "—"}
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 dark:border-gray-700 flex justify-end">
          <Link
            to={`userInfo/${user.uid}`}
            onClick={() => console.log("Open profile of", user.displayName)}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium transition"
          >
            Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Users;
