export const getQty = (currentCart, product) => {
  const existProduct = currentCart.find(
    (item) => item.product._id === product._id
  );
  return existProduct ? existProduct.qty : 0;
};

export const upsertProductToChart = (cart, product, isAdd = true) => {
  const currentQty = getQty(cart, product);

  const condition = (!isAdd && currentQty > 1) || isAdd;

  return [
    ...cart.filter((item) => item.product._id !== product._id),
    ...[
      {
        qty: getQty(cart, product) + (isAdd ? (getQty(cart,product)===product.count ? 0 : +1) : -1),
        product,
      },
    ].filter(() => condition),
  ].sort((firstItem, secondItem) =>
    firstItem.product.title.localeCompare(secondItem.product.title)
  );
};
