import { signOut } from "firebase/auth";
import { auth, db } from "../firebase/config";
import { useState } from "react";
import { useFirebaseError } from "../components/useError";
import { useDispatch, useSelector } from "react-redux";
import { logout as logoutAction } from "../app/feature/userSlice";
import { toast } from "react-toastify";
import { doc, updateDoc } from "firebase/firestore";

export const useLogout = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.user);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const logout = async () => {
    try {
      setIsPending(true);

      const userRef = doc(db, "users", user.uid);

      await updateDoc(userRef, {
        online: false,
      });

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
