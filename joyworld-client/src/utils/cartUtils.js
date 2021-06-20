export const getQty = (currentCart, product) => {
  const existProduct = currentCart.find(
    (item) => item.product._id === product._id
  );
  return existProduct ? existProduct.qty : 0;
};

// export const add = (cart,product) => {
//   if(cart.length === 0) return 1;
//   const qty = cart.map((item) => {
//     if(item.product.createdBy._id !== product.createdBy._id){
//       if (window.confirm('Sepetinize farklı kullanıcılardan ürün ekleyemezsiniz. Sepeti boşaltıp bu ürünü eklemek ister misiniz?')) return 1;
//       else return -2;
//     } else {
//       return getQty(cart,product)===product.count ? 0 : 1
//     }
//   })
//   return Number(qty);
// }

export const upsertProductToChart = (currentCart, product, isAdd = true) => {
  
  let cart = currentCart;
  
  const currentQty = getQty(cart, product);

  if(cart.length > 0){
    if(cart[0].product.createdBy._id !== product.createdBy._id){
      if (window.confirm('Sepetinize farklı kullanıcılardan ürün ekleyemezsiniz. Sepeti boşaltıp bu ürünü eklemek ister misiniz?')){
        cart = []
      } else {
        return cart;
      }
    }
  }

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

export const getTotalPrice = (cart) => {
  const totalPrice = cart.reduce((previousValue, currentItem) => {
    return previousValue + currentItem.product.price * currentItem.qty;
  }, 0);
  return totalPrice;
}
