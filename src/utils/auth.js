// ✅ ADD THIS
export const getUser = () => {
  try {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (err) {
    console.error("Invalid user in localStorage");
    return null;
  }
};

// ✅ KEEP YOUR EXISTING CODE
export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user"); // 🔥 IMPORTANT FIX
};