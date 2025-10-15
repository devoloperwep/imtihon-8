// react
import { useState } from "react";
// firebase
import { auth, db } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// redux
import { useDispatch } from "react-redux";
import { login } from "../app/feature/userSlice";
// toast
import { toast } from "react-toastify";

export const useRegister = () => {
  const dispatch = useDispatch();
  const [isPending, setIsPanding] = useState(false);
  const [error, setError] = useState(null);
  const register = async (name, email, password) => {
    try {
      setIsPanding(true);
      const req = await createUserWithEmailAndPassword(auth, email, password);
      if (!req.user) {
        throw new Error("Registration feiled");
      }
      await updateProfile(req.user, {
        displayName: name,
        photoURL: "https://api.dicebear.com/9.x/initials/svg?seed=" + name,
      });

      await setDoc(doc(db, "users", req.user.uid), {
        displayName: req.user.displayName,
        photoURL: req.user.photoURL,
        uid: req.user.uid,
      });
      dispatch(login(req.user));
      toast.success("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    } finally {
      setIsPanding(false);
    }
  };
  return { register, isPending, error };
};
