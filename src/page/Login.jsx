import { useEffect, useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import { LoginError } from "../components/useError";
import { useLogin } from "../hooks/useLogin";
import { useResetPassword } from "../hooks/useResetPassword";
import { useGoogle } from "../hooks/useGoogle";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return data;
}

function Login() {
  const user = useActionData();
  const [err, setErr] = useState(null);
  const { _login, error, isPending } = useLogin();
  const { resetPassword } = useResetPassword();
  const [showReset, setShowReset] = useState(false);
  const { errorGoogle, googleProvider, isPendingGoogle } = useGoogle();

  useEffect(() => {
    if (user?.email && user?.password) {
      _login(user.email, user.password);
      setErr(false);
    } else if (user && !user.emailRecovery) {
      const message = LoginError(user);
      setErr(typeof message === "object" ? JSON.stringify(message) : message);
    }
    if (user?.emailRecovery) {
      const getRecovery = async () => {
        await resetPassword(user.emailRecovery);
        setShowReset(false);
      };
      getRecovery();
    }
  }, [user]);

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-50 to-gray-100 px-4">
      <div className="bg-white/80 backdrop-blur-xl text-gray-700 w-full max-w-md md:p-8 p-6 rounded-2xl shadow-lg border border-white/40">
        <h2 className="text-3xl font-semibold mb-6 text-center text-sky-600">
          Welcome Back 👋
        </h2>

        {!showReset ? (
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
              <button
                type="button"
                onClick={() => setShowReset(true)}
                className="text-sky-500 hover:text-sky-600 underline text-sm"
              >
                Forgot Password?
              </button>
            </div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full mb-3 bg-sky-500 hover:bg-sky-600 transition-all py-3 rounded-full text-white font-medium shadow-md disabled:opacity-70"
            >
              {isPending ? "Logging in..." : "Log in"}
            </button>
          </Form>
        ) : (
          <Form method="post">
            <input
              name="emailRecovery"
              className="w-full bg-gray-50 border border-gray-200 my-3 outline-none rounded-full py-3 px-5 text-gray-700 placeholder:text-gray-400 focus:border-sky-400 focus:ring-1 focus:ring-sky-300 transition-all"
              type="email"
              placeholder="Enter your recovery email"
              required
            />
            <div className="flex justify-between items-center py-4">
              <button
                type="button"
                onClick={() => setShowReset(false)}
                className="text-gray-500 hover:text-gray-700 underline text-sm"
              >
                Back to Login
              </button>
              <button
                type="submit"
                className="text-sky-500 hover:text-sky-600 underline text-sm"
              >
                Send Reset Link
              </button>
            </div>
          </Form>
        )}

        {error && (
          <p className="text-center text-red-500 mt-2 text-sm">{error}</p>
        )}
        {err && typeof err === "string" && (
          <p className="text-center text-red-500 mt-2 text-sm">{err}</p>
        )}

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
          onClick={googleProvider}
          type="button"
          disabled={isPendingGoogle}
          className="w-full flex items-center gap-2 justify-center my-4 bg-white border border-gray-200 py-3 rounded-full text-gray-700 hover:bg-gray-50 transition-all disabled:opacity-70"
        >
          {isPendingGoogle ? (
            <>
              <img
                className="h-5 w-5 animate-spin"
                src="https://www.svgrepo.com/show/70469/loading.svg"
                alt="loading"
              />
              <span>Signing in with Google...</span>
            </>
          ) : (
            <>
              <img
                className="h-5 w-5"
                src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleFavicon.png"
                alt="googleFavicon"
              />
              Log in with Google
            </>
          )}
        </button>

        {errorGoogle && (
          <p className="text-center text-red-500 mt-2 text-sm">{errorGoogle}</p>
        )}
      </div>
    </div>
  );
}

export default Login;
