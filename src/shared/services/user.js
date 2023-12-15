import instance from "./instance";

const setToken = (token) => {
  if (token) {
    return (instance.defaults.headers.authorization = `Bearer ${token}`);
  }
  instance.defaults.headers.authorization = "";
};

export const register = async (data) => {
  const { data: result } = await instance.post("/auth/register", data);
  setToken(result.token);
  //   localStorage.setItem("refreshToken", result.refreshToken);
  return result;
};

export const login = async (data) => {
  const { data: result } = await instance.post("/auth/login", data);
  setToken(result.token);
  //   localStorage.setItem("refreshToken", result.refreshToken);
  console.log(result);
  return result;
};

export const current = async (token) => {
  try {
    setToken(token);
    const { data } = await instance.get("/auth/current");
    console.log(data);
    return data;
  } catch (error) {
    setToken();
    throw error;
  }
};

export const logout = async () => {
  const { data } = await instance.post("/auth/logout");
  setToken();
  return data;
};
