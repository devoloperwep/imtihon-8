import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-50 to-gray-100 px-4">
      <div className="bg-white/80 backdrop-blur-xl text-gray-700 w-full max-w-md md:p-8 p-6 rounded-2xl shadow-lg border border-white/40">
        <h2 className="text-3xl font-semibold mb-6 text-center text-sky-600">
          Welcome Back 👋
        </h2>
        <form>
          <input
            id="email"
            className="w-full bg-gray-50 border border-gray-200 my-3 outline-none rounded-full py-3 px-5 text-gray-700 placeholder:text-gray-400 focus:border-sky-400 focus:ring-1 focus:ring-sky-300 transition-all"
            type="email"
            placeholder="Enter your email"
            required
          />
          <input
            id="password"
            className="w-full bg-gray-50 border border-gray-200 outline-none rounded-full py-3 px-5 text-gray-700 placeholder:text-gray-400 focus:border-sky-400 focus:ring-1 focus:ring-sky-300 transition-all"
            type="password"
            placeholder="Enter your password"
            required
          />
          <div className="text-right py-4">
            <a
              className="text-sky-500 hover:text-sky-600 underline text-sm"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full mb-3 bg-sky-500 hover:bg-sky-600 transition-all py-3 rounded-full text-white font-medium shadow-md"
          >
            Log in
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-sky-500 hover:text-sky-600 underline font-medium"
          >
            Signup
          </Link>
        </p>
        <button
          type="button"
          className="w-full flex items-center gap-2 justify-center my-4 bg-white border border-gray-200 py-3 rounded-full text-gray-700 hover:bg-gray-50 transition-all"
        >
          <img
            className="h-5 w-5"
            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
            alt="googleFavicon"
          />
          Log in with Google
        </button>
      </div>
    </div>
  );
}

export default Login;
