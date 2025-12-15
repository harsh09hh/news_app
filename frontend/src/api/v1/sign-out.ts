import api from "./axios";

export const signOut = async () => {
  const response = await api.post(
    "/auth/sign-out",
    {}
  );

  return response.data;
};