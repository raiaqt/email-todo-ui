import { googleLogout } from "@react-oauth/google";

const disconnectGmail = () => {
  googleLogout();
  localStorage.removeItem("gmailEmail");
  localStorage.removeItem("gmailName");
  localStorage.removeItem("idToken");
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  window.location.reload();
};

export default disconnectGmail;
