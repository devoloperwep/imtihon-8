import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { useFirebaseError } from "../components/useError";
import { useDispatch } from "react-redux";
import { logout as logoutAction } from "../app/feature/userSlice";

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
    } catch (err) {
      setError(useFirebaseError(err.message));
    } finally {
      setIsPending(false);
    }
  };

  return { isPending, error, logout };
};
