import { useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../app/feature/userSlice";
import { useFirebaseError } from "../components/useError";
import { toast } from "react-toastify";

export const useLogin = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const _login = async (email, password) => {
    try {
      setIsPending(true);
      const req = await signInWithEmailAndPassword(auth, email, password);
      if (!req.user) {
        throw new Error("Login failed");
      }

      dispatch(login(req.user));
      toast.success("✅ Muvaffaqiyatli tizimga kirdingiz!");
    } catch (error) {
      setError(useFirebaseError(error.message));
      console.log("Firebase error:", error.message);
    } finally {
      setIsPending(false);
    }
  };

  return { _login, isPending, error };
};
