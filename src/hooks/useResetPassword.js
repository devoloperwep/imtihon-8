import { auth } from "../firebase/config";
import { sendPasswordResetEmail } from "firebase/auth";
import { toast } from "react-toastify";

export const useResetPassword = () => {
  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: "http://localhost:5173/",
      });
      toast.success("Parolni tiklash havolasi emailingizga yuborildi! 📩");
    } catch (error) {
      console.error(error.message);
      toast.error("Xatolik yuz berdi! " + error.message);
    }
  };

  return { resetPassword };
};
