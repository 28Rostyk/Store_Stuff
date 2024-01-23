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

export const updateCart = (cart, payload) => {
  let newCart = [...cart];
  const found = cart.find(({ id }) => id === payload.id);

  if (found) {
    newCart = newCart.map((item) => {
      return item.id === payload.id
        ? { ...item, quantity: payload.quantity || item.quantity + 1 }
        : item;
    });
  } else {
    newCart.push({ ...payload, quantity: 1 });
  }

  return newCart;
};

export const removeFromCart = (cart, itemId) => {
  const updatedCart = cart.filter((item) => item.id !== itemId);
  return updatedCart;
};

export const sumBy = (arr) => arr.reduce((prev, cur) => prev + cur, 0);
