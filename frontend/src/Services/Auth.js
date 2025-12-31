import api from "../utils/api.js";

export const signUp = async (email, password) => {
  try {
    const response = await api.post('/auth/register', {
      email,
      password,
      name: email.split('@')[0], // Default name
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error; // Propagate backend error
  }
};

export const signIn = async (email, password) => {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error; // Propagate backend error
  }
};

export const logOut = async () => {
  try {
    await api.post('/auth/logout');
  } catch (error) {
    console.error("Logout error", error);
  }
};