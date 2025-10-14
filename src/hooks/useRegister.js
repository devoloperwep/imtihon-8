// react
import { useState } from "react";
// firebase
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// redux
import { useDispatch } from "react-redux";
import { login } from "../app/feature/userSlice";

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
      dispatch(login(req.user));
      console.log(req.user);
    } catch (error) {
      setError(error.message);
      console.log(error.message);
    } finally {
      setIsPanding(false);
    }
  };
  return { register, isPending, error };
};
