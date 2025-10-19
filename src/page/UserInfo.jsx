import { useParams, Link } from "react-router-dom";
import { useCollection } from "../hooks/useCollection";

function UserInfo() {
  const { id } = useParams();
  const { data } = useCollection("users", null, ["uid", "==", id]);

  if (!data || data.length === 0)
    return (
      <div className="p-6 text-gray-500 text-center">Loading user info...</div>
    );

  const user = data[0];

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300">
        <div className="flex flex-col items-center gap-5">
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "User"}
              className="w-28 h-28 sm:w-32 sm:h-32 rounded-full object-cover shadow-md border-4 border-indigo-500/10"
            />
          ) : (
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-indigo-500 flex items-center justify-center text-white text-3xl font-bold">
              {(user.displayName || "U")[0].toUpperCase()}
            </div>
          )}

          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 dark:text-white">
              {user.displayName || "No Name"}
            </h2>
          </div>

          <div className="flex items-center gap-2 mt-2">
            <span
              className={`inline-block w-3 h-3 rounded-full ${
                user.online ? "bg-green-500" : "bg-gray-400"
              }`}
            ></span>
            <span
              className={`text-sm sm:text-base ${
                user.online ? "text-green-600" : "text-gray-500"
              }`}
            >
              {user.online ? "Online" : "Offline"}
            </span>
          </div>

          <div className="w-full mt-4 border-t border-gray-200 dark:border-gray-700 pt-4">
            <div className="text-sm sm:text-base text-gray-600 dark:text-gray-300 flex justify-between">
              <span className="font-medium">User ID:</span>
              <span className="truncate max-w-[200px]">
                {user.uid || user.id || "—"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <Link
        to="/"
        className="mt-6 inline-block px-6 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-sm shadow-md transition-all duration-200"
      >
        ← Back to Home
      </Link>
    </div>
  );
}

export default UserInfo;
