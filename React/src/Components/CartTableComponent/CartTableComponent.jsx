import { useHistory } from "react-router-dom";
import "./cart-table.css";

const CartTableComponent = (props) => {
  const history = useHistory();
  const handleRemove = () => {
    props.onRemove(props.id);
  };
  const moveToProduct = () => {
    history.push(`/products/moreinfo/${props.id}`);
  };

  return (
    <tr>
      <td>
        <img
          className="cart-image-product"
          src={
            props.image
              ? props.image
              : "https://cdn.pixabay.com/photo/2018/06/12/15/08/question-mark-3470783_960_720.jpg"
          }
          onClick={moveToProduct}
          alt={props.title}
        />
      </td>
      <td className="title-product">{props.title}</td>
      <td>
        <span className="price-product-table">Price : {props.price}$</span>

        <br />
        <br />
        <button className="btn btn-remove" onClick={handleRemove}>
          Remove Product
        </button>
      </td>
    </tr>
  );
};

export default CartTableComponent;
