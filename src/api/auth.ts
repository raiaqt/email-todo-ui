import axios from "axios";
import { jwtDecode } from "jwt-decode"; // For decoding Google ID tokens
import { JwtPayloadWithName } from "../types";

const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;
const CLIENT_SECRET = import.meta.env.VITE_CLIENT_SECRET;
const REDIRECT_URI = import.meta.env.VITE_REDIRECT_URI;
const TOKEN_URL = import.meta.env.VITE_TOKEN_URL;

export const exchangeCodeForTokens = async (
  authorizationCode: string,
  callback?: (name: string) => void
) => {
  try {
    // Make a POST request to Google's token endpoint
    const response = await axios.post(TOKEN_URL, {
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      code: authorizationCode,
      grant_type: "authorization_code",
      redirect_uri: REDIRECT_URI,
    });

    const { access_token, refresh_token, expires_in, id_token } = response.data;
    console.log("response data", response.data);

    // Log the tokens (replace this with secure storage or usage)
    console.log("Access Token:", access_token);
    console.log("Refresh Token:", refresh_token);
    console.log("Expires In:", expires_in);

    // Optional: Store tokens securely (e.g., HTTP-only cookies or secure storage)
    localStorage.setItem("accessToken", access_token);
    localStorage.setItem("refreshToken", refresh_token);
    localStorage.setItem("idToken", id_token);

    const decodedToken = jwtDecode(id_token);

    const now = Math.floor(Date.now() / 1000);
    if (
      decodedToken &&
      decodedToken.exp &&
      decodedToken.exp > now &&
      callback
    ) {
      callback((decodedToken as JwtPayloadWithName).name); // Token is valid, set user as logged in
    }
    return id_token;

    // alert("Login successful! Tokens stored in localStorage.");
  } catch (error) {
    console.error("Error exchanging authorization code:", error);
    // alert("Failed to exchange authorization code.");
  }
};
