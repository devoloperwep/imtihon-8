// react-router
import { useEffect, useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import { LoginError } from "../components/useError";
// hooks
import { useLogin } from "../hooks/useLogin";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return data;
}

function Login() {
  const user = useActionData();
  const [err, setErr] = useState(null);
  const { _login, error, isPending } = useLogin();
  console.log(error);
  useEffect(() => {
    if (user?.email && user?.password) {
      _login(user.email, user.password);
      console.log("hi");
      setErr(false);
    } else {
      setErr(user ? LoginError(user) : false);
    }
  }, [user]);
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-50 to-gray-100 px-4">
      <div className="bg-white/80 backdrop-blur-xl text-gray-700 w-full max-w-md md:p-8 p-6 rounded-2xl shadow-lg border border-white/40">
        <h2 className="text-3xl font-semibold mb-6 text-center text-sky-600">
          Welcome Back 👋
        </h2>
        <Form method="post">
          <input
            name="email"
            className="w-full bg-gray-50 border border-gray-200 my-3 outline-none rounded-full py-3 px-5 text-gray-700 placeholder:text-gray-400 focus:border-sky-400 focus:ring-1 focus:ring-sky-300 transition-all"
            type="email"
            placeholder="Enter your email"
            required
          />
          <input
            name="password"
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
            disabled={isPending}
            className="w-full mb-3 bg-sky-500 hover:bg-sky-600 transition-all py-3 rounded-full text-white font-medium shadow-md disabled:opacity-70"
          >
            {isPending ? "Logging in..." : "Log in"}
          </button>
        </Form>
        {error && (
          <p className="text-center text-red-500 mt-2 text-sm">{error}</p>
        )}
        {err && <p className="text-center text-red-500 mt-2 text-sm">{err}</p>}
        <p className="text-center mt-4 text-gray-600">
          Don’t have an account?{" "}
          <Link
            to="/register"
            className="text-sky-500 hover:text-sky-600 underline font-medium"
          >
            Register
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
