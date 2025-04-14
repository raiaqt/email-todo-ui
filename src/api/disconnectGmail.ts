import { googleLogout } from "@react-oauth/google";

const disconnectGmail = () => {
  googleLogout();
  localStorage.removeItem("gmailEmail");
  window.location.reload();
};

export default disconnectGmail;
