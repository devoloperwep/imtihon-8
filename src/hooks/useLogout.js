import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { useFirebaseError } from "../components/useError";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../app/feature/userSlice";
import { toast } from "react-toastify";

export const useLogout = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const logout = async () => {
    setError(null);
    setIsPending(true);

    try {
      await signOut(auth);
      dispatch(logoutAction());
      toast.dark("Hisobdan muvaffaqiyatli chiqdingiz ✅");
    } catch (err) {
      setError(useFirebaseError(err.message));
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, error, logout };
};
