import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import "./my-products-table-component.css";

const MyProductsTableComponent = (props) => {
  const history = useHistory();
  const handleEdit = () => {
    props.onEditProduct(props.id);
  };

  const handleDelete = () => {
    props.onDeleteProduct(props.id);
  };

  const moveToProduct = () => {
    history.push(`/products/moreinfo/${props.id}`);
  };

  return (
    <tr className="my-products-row">
      <td className="image-td">
        <img
          className="product-image"
          src={
            props.image
              ? props.image
              : "https://cdn.pixabay.com/photo/2018/06/12/15/08/question-mark-3470783_960_720.jpg"
          }
          onClick={moveToProduct}
          alt={props.image}
        />
      </td>
      <td className="title-td">
        <h2 className="title-product"> {props.title}</h2>
      </td>
      <td className="btns-td">
        <button className="btn  btn-edit" onClick={handleEdit}>
          Edit Product
        </button>
        <br />
        <br />
        <button className="btn btn-delete" onClick={handleDelete}>
          Delete This Product
        </button>
      </td>
    </tr>
  );
};

export default MyProductsTableComponent;
