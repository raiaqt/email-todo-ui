const logout = () => {
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  window.location.reload();
};

export default logout;
