import { googleLogout } from "@react-oauth/google";

const logout = () => {
  googleLogout();
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("idToken");
  window.location.reload();
};

export default logout;
