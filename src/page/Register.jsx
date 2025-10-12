import { Form, Link, useActionData } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  return data;
}

function Register() {
  const data = useActionData();
  console.log(data);
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 via-blue-50 to-gray-100 px-4">
      <div className="bg-white/80 backdrop-blur-xl text-gray-700 w-full max-w-md md:p-8 p-6 rounded-2xl shadow-lg border border-white/40">
        <h2 className="text-3xl font-semibold mb-6 text-center text-sky-600">
          Create Account ✨
        </h2>

        <Form method="post">
          <input
            name="name"
            className="w-full bg-gray-50 border border-gray-200 my-3 outline-none rounded-full py-3 px-5 text-gray-700 placeholder:text-gray-400 focus:border-sky-400 focus:ring-1 focus:ring-sky-300 transition-all"
            type="text"
            placeholder="Enter your full name"
            required
          />

          <input
            name="image"
            className="w-full bg-gray-50 border border-gray-200 outline-none rounded-full py-3 px-5 text-gray-700 placeholder:text-gray-400 focus:border-sky-400 focus:ring-1 focus:ring-sky-300 transition-all"
            type="url"
            placeholder="Enter your profile image URL"
          />

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
            placeholder="Create a password"
            required
          />

          <button
            type="submit"
            className="w-full my-5 bg-sky-500 hover:bg-sky-600 transition-all py-3 rounded-full text-white font-medium shadow-md"
          >
            Register
          </button>
        </Form>

        <p className="text-center mt-4 text-gray-600">
          Already a member?{" "}
          <Link
            to="/login"
            className="text-sky-500 hover:text-sky-600 underline font-medium"
          >
            Log in
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
          Register with Google
        </button>
      </div>
    </div>
  );
}

export default Register;
