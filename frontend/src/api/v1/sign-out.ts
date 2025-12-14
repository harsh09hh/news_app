import axios from "axios";

export const signOut = async () => {
  const response = await axios.post(
    "http://localhost:5500/api/v1/auth/sign-out",
    {},
    {
      withCredentials: true, 
    }
  );

  return response.data;
};