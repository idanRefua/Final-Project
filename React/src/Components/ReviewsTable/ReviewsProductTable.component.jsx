import "./review-product-table.css";
import { Fragment } from "react";
import { useSelector } from "react-redux";

const ReviewsProductTableComponent = (props) => {
  const userId = useSelector((state) => state.auth.userData._id);

  const onDeleteReview = () => {
    props.onDeleteReview(props.id);
  };

  return (
    <Fragment>
      <tr className="review-tr">
        <td className="user-name">{props.userName}</td>
        <td className="review-product">
          {props.review}
          <br />
          <br />
          {props.byUser === userId && (
            <Fragment>
              <button
                className="btn btn-delete-review"
                onClick={onDeleteReview}
              >
                Delete Review
              </button>
            </Fragment>
          )}
        </td>
      </tr>
    </Fragment>
  );
};

export default ReviewsProductTableComponent;
