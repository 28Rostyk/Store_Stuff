import instance from "./instance";

const setToken = (token) => {
  if (token) {
    return (instance.defaults.headers.authorization = `Bearer ${token}`);
  } else {
    instance.defaults.headers.authorization = "";
  }
};

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If the error status is 401 and there is no originalRequest._retry flag,
    // it means the token has expired and we need to refresh it
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh = localStorage.getItem("refreshToken");
      if (refresh) {
        try {
          const { data } = await instance.post("/auth/refresh", {
            refreshToken: refresh,
          });
          const { accessToken, refreshToken } = data;
          if (accessToken) {
            localStorage.setItem("refreshToken", refreshToken);

            // Retry the original request with the new token
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return instance(originalRequest);
          } else {
            // Оновлення токену не вдалося
            return Promise.reject(new Error("Token refresh failed"));
          }
        } catch (refreshError) {
          // Handle refresh token error or redirect to login
          return Promise.reject(refreshError);
        }
      }
    }

    return Promise.reject(error);
  }
);

export const register = async (data) => {
  const { data: result } = await instance.post("/auth/register", data);
  setToken(result.accessToken);
  localStorage.setItem("refreshToken", result.refreshToken);
  return result;
};

export const login = async (data) => {
  const { data: result } = await instance.post("/auth/login", data);
  setToken(result.accessToken);
  localStorage.setItem("refreshToken", result.refreshToken);

  return result;
};

export const current = async (token) => {
  try {
    setToken(token);
    const { data } = await instance.get("/auth/current");
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
