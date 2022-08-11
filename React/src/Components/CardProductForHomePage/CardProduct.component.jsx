import { useHistory } from "react-router-dom";
import "./card-product-home.css";

const CardProductToHomeComponent = (props) => {
  const history = useHistory();
  const handleSendToProductPage = () => {
    history.push(`/products/moreinfo/${props.id}`);
  };

  return (
    <div className="card card-to-home" onClick={handleSendToProductPage}>
      <img src={props.image} className="card-img-top" alt={props.title} />
      <div className="card-body card-product-body-home">
        <h4 className="product-card-home-title">{props.title}</h4>
      </div>
    </div>
  );
};

export default CardProductToHomeComponent;
