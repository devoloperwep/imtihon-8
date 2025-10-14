export const useError = (data) => {
  const errors = {};

  if (!data?.title || data?.title.trim() === "") {
    errors.title = "Title is required!";
  }

  if (!data?.cookingTime || data.cookingTime?.trim() === "") {
    errors.cookingTime = "Cooking time is required!";
  }

  if (!data?.ingredients || data?.ingredients.trim() === "") {
    errors.ingredients = "Ingredients are required!";
  }

  if (!data?.imageUrl || data?.imageUrl.trim() === "") {
    errors.imageUrl = "Image URL is required!";
  } else {
    try {
      new URL(data.imageUrl); // URL syntaxini tekshiradi
    } catch (err) {
      errors.imageUrl = "Invalid image URL!";
    }
  }

  if (!data?.method || data?.method.trim() === "") {
    errors.method = "Method is required!";
  }

  return errors;
};

export const useRegisterError = (data) => {
  const errors = {};

  // name
  if (!data?.name || data?.name.trim() === "") {
    errors.name = "Full name is required!";
  }

  // email
  if (!data?.email || data?.email.trim() === "") {
    errors.email = "Email is required!";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Invalid email format!";
  }

  // password
  if (!data?.password || data?.password.trim() === "") {
    errors.password = "Password is required!";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters!";
  }

  return errors;
};

export const LoginError = (data) => {
  const errors = {};

  // email
  if (!data?.email || data?.email.trim() === "") {
    errors.email = "Email is required!";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Invalid email format!";
  }

  // password
  if (!data?.password || data?.password.trim() === "") {
    errors.password = "Password is required!";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters!";
  }

  return errors;
};

// firebase
// utils/getFirebaseError.js
export const useFirebaseError = (error) => {
  if (!error) return null;

  // 1) Normalize: agar string berilgan bo'lsa, uni message sifatida qabul qilamiz
  const message = typeof error === "string" ? error : error.message || "";
  let code = error && error.code ? String(error.code).toLowerCase() : null;

  // 2) Agar code yo'q bo'lsa, message ichidan (auth/...) yoki auth/... patternni qidiramiz
  if (!code && typeof message === "string") {
    const parenMatch = message.match(/\((auth\/[^\)]+)\)/i); // (auth/weak-password)
    const inlineMatch = message.match(/auth\/[a-z-]+/i); // auth/weak-password
    if (parenMatch) code = parenMatch[1].toLowerCase();
    else if (inlineMatch) code = inlineMatch[0].toLowerCase();
  }

  // 3) Mapping (o'zbekcha xabarlar)
  const errors = {
    "auth/invalid-email": "Email formati noto‘g‘ri. Iltimos, tekshirib yozing.",
    "auth/user-disabled": "Bu akkaunt bloklangan.",
    "auth/user-not-found":
      "Bunday email bilan ro‘yxatdan o‘tgan foydalanuvchi topilmadi.",
    "auth/wrong-password": "Parol noto‘g‘ri. Qaytadan urinib ko‘ring.",
    "auth/email-already-in-use": "Bu email allaqachon ro‘yxatdan o‘tgan.",
    "auth/weak-password": "Parol kamida 6 ta belgidan iborat bo‘lishi kerak.",
    "auth/missing-email": "Iltimos, email manzilingizni kiriting.",
    "auth/invalid-credential":
      "Noto‘g‘ri credential. Iltimos, ma'lumotlarni tekshiring.",
    "auth/network-request-failed":
      "Tarmoqda muammo bor. Internet aloqangizni tekshiring.",
    "auth/popup-closed-by-user":
      "Popup oynani yopdingiz. Qayta urinib ko‘ring.",
    "auth/too-many-requests":
      "Juda ko‘p urinishlar. Birozdan so‘ng qayta urinib ko‘ring.",
    "auth/internal-error": "Ichki xato. Iltimos, keyinroq urinib ko‘ring.",
    "auth/missing-password": "Parol maydoni to‘ldirilishi shart.",
    "auth/operation-not-allowed": "Bu sign-in usuli yoqilmagan.",
  };

  // 4) Agar kod topilgan bo'lsa va mapping mavjud bo'lsa — tarjimani qaytar
  if (code && errors[code]) return errors[code];

  // 5) Keyword-based fallback (message ichidagi kalit so'zlarga qarab)
  if (typeof message === "string") {
    if (/weak-password/i.test(message)) return errors["auth/weak-password"];
    if (
      /email-already-in-use/i.test(message) ||
      /already in use/i.test(message)
    )
      return errors["auth/email-already-in-use"];
    if (/invalid-email/i.test(message)) return errors["auth/invalid-email"];
    if (/wrong-password/i.test(message)) return errors["auth/wrong-password"];
    if (/user-not-found/i.test(message)) return errors["auth/user-not-found"];
    if (/network-request-failed/i.test(message))
      return errors["auth/network-request-failed"];
  }

  // 6) Oxirgi fallback: Firebase prefixlarini olib tashlab, original message'ni tozalaymiz
  if (message && typeof message === "string") {
    const cleaned = message
      .replace(/^Firebase(Error)?:\s*/i, "") // "Firebase: ..." yoki "FirebaseError: ..."
      .replace(/\s*\(auth\/[^\)]+\)\.?$/i, "") // "(auth/weak-password)" oxiridan olib tashlash
      .trim();
    if (cleaned) return cleaned;
  }

  // 7) Agar umuman hech narsa topilmasa
  return "Kutilmagan xato yuz berdi. Iltimos, qaytadan urinib ko‘ring.";
};
