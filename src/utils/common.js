export const shuffle = (arr) => [...arr].sort(() => 0.5 - Math.random());

export const buildUrl = (url, params) => {
  let urlWithParams = url;

  Object.entries(params).forEach(([key, value], i) => {
    const sign = !i ? "?" : "&";
    urlWithParams += `${sign}${key}=${value}`;
  });
  return urlWithParams;
};

export const removeFromFavourite = (user, productId) => {
  const updatedUser = {
    ...user,
    favouriteProducts: user.favouriteProducts.filter(
      (product) => product.id !== productId
    ),
  };
  return updatedUser;
};
