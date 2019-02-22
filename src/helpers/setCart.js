/* eslint-disable import/prefer-default-export */
export const setCart = (payload) => {
  const cart = JSON.parse(localStorage.getItem(`${payload.id}`)) || null;
  if (cart === null) {
    const cartContent = JSON.stringify({ cartNo: [] });
    localStorage.setItem(`${payload.id}`, cartContent);
    localStorage.setItem('cartCount', 0);
  } else {
    const cartCount = cart.cartNo.length;
    localStorage.setItem('cartCount', cartCount);
    window.location.reload();
  }
};
