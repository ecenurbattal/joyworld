export const getQty = (currentCart, product) => {
  const existProduct = currentCart.find(
    (item) => item.product.id === product.id
  );
  return existProduct ? existProduct.qty : 0;
};

export const upsertProductToChart = (cart, product, isAdd = true) => {
  const currentQty = getQty(cart, product);

  const condition = (!isAdd && currentQty > 1) || isAdd;

  return [
    ...cart.filter((item) => item.product.id !== product.id),
    ...[
      {
        qty: getQty(cart, product) + (isAdd ? 1 : -1),
        product,
      },
    ].filter(() => condition),
  ].sort((firstItem, secondItem) =>
    firstItem.product.name.localeCompare(secondItem.product.name)
  );
};
