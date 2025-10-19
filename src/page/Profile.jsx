import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { auth } from "../firebase/config";
import { sendEmailVerification } from "firebase/auth";

function Profile() {
  const { user } = useSelector((store) => store.user);

  const sendEmailLink = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        toast.success("Check your email");
      })
      .catch((error) => {
        const errorMessage = error.message;
        toast.error(errorMessage);
      });
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-500 text-lg animate-pulse">
          Loading profile...
        </p>
      </div>
    );
  }

  return (
    <div className="h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 max-w-sm w-full text-center">
        <div className="flex justify-center">
          <img
            src={
              user.photoURL ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                user.displayName || "User"
              )}&background=0D8ABC&color=fff`
            }
            alt="user"
            className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-md"
          />
        </div>

        <h2 className="mt-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
          {user.displayName || "No name"}
        </h2>

        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          ID:{" "}
          <span className="text-gray-700 dark:text-gray-300">{user.uid}</span>
        </p>

        <div className="mt-4 space-y-2">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            📧 <span className="font-medium">{user.email}</span>
          </p>
          <p
            className={`text-sm font-medium ${
              user.emailVerified ? "text-green-600" : "text-red-600"
            }`}
          >
            {user.emailVerified ? "✅ Email verified" : "❌ Email not verified"}
          </p>
        </div>

        <div className="mt-6 space-y-3">
          <button
            onClick={() => console.log("Edit profile clicked")}
            className="w-full py-2.5 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium shadow-sm transition"
          >
            Edit Profile
          </button>

          {!user.emailVerified && (
            <button
              onClick={sendEmailLink}
              className="w-full py-2.5 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-medium shadow-sm transition"
            >
              Send Verification Link ✉️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
