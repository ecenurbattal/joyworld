import { getCurrentUser } from '../../services/Auth/authService';
import Button from '../Button/Button';
import { CardContent, CardWrapper } from '../Card/Card.styles';

const ProductItem = ({ product, onAddToCart, onShowDetail }) => {
  return (
    <CardWrapper
      onClick= {() => {
        onShowDetail && onShowDetail(product)
      }}
    >
      <img width="250px" height="190px" src={"data:image/png;base64," + product.images[0]} alt={product.title} />
      <CardContent>
        <h3>{product.title}</h3>
        <h4>{product.price} TL</h4>
        <p><strong>Ürünün Sahibi: </strong>{product.createdBy.username}</p>
        {(product.createdBy.username!==getCurrentUser().user.username)&&<Button
          text="Sepete Ekle"
          onClick={(event) => {
            event.stopPropagation();
            onAddToCart && onAddToCart(product);
          }}
        />}
      </CardContent>
    </CardWrapper>
  );
};

export default ProductItem;
