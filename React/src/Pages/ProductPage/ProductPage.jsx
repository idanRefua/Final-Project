import axios from "axios";
import reviewSchema from "../../Validations/reviewProduct.validation";
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  useHistory,
  useParams,
} from "react-router-dom/cjs/react-router-dom.min";
import ReviewsProductTableComponent from "../../Components/ReviewsTable/ReviewsProductTable.component";
import "./product-page.css";
import Joi from "joi-browser";
const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [productLikes, setProductLikes] = useState([]);
  const userId = useSelector((state) => state.auth.userData._id);
  const [likes, setLikes] = useState([]);
  const [addToCart, setAddToCart] = useState([]);
  const [userCart, setUserCart] = useState([]);
  const [productReviewsArr, setProductReviewsArr] = useState([]);
  const [review, setReview] = useState("");
  const [errorReview, setErrorReview] = useState("");
  const history = useHistory();

  const handleReview = (e) => {
    setReview(e.target.value);
  };

  useEffect(() => {
    axios
      .get(`/products/moreinfo/${id}`)
      .then((res) => {
        setProduct(res.data.product);
        setProductLikes(res.data.product.likes);
        setProductReviewsArr(res.data.product.reviews);
      })
      .catch(() => {
        if (product === null) {
          history.push("/notfound");
        }
      });
  }, [id, userId, likes]);

  useEffect(() => {
    axios
      .get("/auth/mydetails")
      .then((res) => setUserCart(res.data.cart))
      .catch((err) => console.log(err));
  }, []);

  const handleFavourite = () => {
    axios
      .post(`/products/addlike/${product._id}`)
      .then((res) => {
        setLikes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRemoveFavourite = () => {
    axios
      .post(`/products/removelikeproduct/${id}`)
      .then((res) => {
        setLikes(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleAddToCart = () => {
    axios
      .post(`/products/addtocart/${id}`)
      .then((res) => {
        setAddToCart(res.data);
        history.push("/mycart");
      })
      .catch((err) => console.log(err));
  };

  const handleRemoveFromMyCart = () => {
    axios
      .delete(`products/removefrommycart/${id}`)
      .then((res) => {})
      .catch((err) => console.log(err));
  };

  const handleAddReview = (e) => {
    e.preventDefault();
    const validateReview = Joi.validate({ review }, reviewSchema, {
      abortEarly: false,
    });
    const { error } = validateReview;
    if (error) {
      setErrorReview(
        "Review must be with at leaset 10 Charcters and max 70 charcters"
      );
    } else {
      axios
        .post(`/products/addreviewtoproduct/${id}`, { review })
        .then((res) => {
          window.location.reload(false);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleDeleteReview = (reviewId) => {
    const confirm = window.confirm("Are you sure want delete Your review?");
    if (confirm === true) {
      axios
        .delete(`/products/deletemyreview/${id}`)
        .then((res) => {
          let newReviewsArr = productReviewsArr.filter(
            (review) => review._id !== reviewId
          );
          setProductReviewsArr(newReviewsArr);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <Fragment>
      <br />
      <br />
      {product !== null && (
        <div className="container ">
          <div className="row">
            <div className="col-6">
              <img
                src={
                  product.image
                    ? product.image
                    : "https://cdn.pixabay.com/photo/2018/06/12/15/08/question-mark-3470783_960_720.jpg"
                }
                className="img-fluid img-product"
                alt={product.title}
              />
            </div>
            <div className="col-6">
              <h3 className="product-title">{product.title}</h3>
              <hr />
              <p className="description-product">{product.description}</p>
              <br />
              <h4>{product.price}$</h4>
              <br />
              {!productLikes.includes(userId) ? (
                <button
                  className="btn btn-add-favourite"
                  onClick={handleFavourite}
                >
                  Add To Favourite
                </button>
              ) : (
                <button
                  className="btn btn-remove-favourite"
                  onClick={handleRemoveFavourite}
                >
                  Remove From My Favourites
                </button>
              )}
              {!userCart.includes(id) ? (
                <button
                  className="btn btn-add-to-cart"
                  onClick={handleAddToCart}
                >
                  Add To Cart
                </button>
              ) : (
                <button
                  className="btn btn-remove-from-cart"
                  onClick={handleRemoveFromMyCart}
                >
                  Remove From My Cart
                </button>
              )}
            </div>
          </div>
          <br />
          <br />
          <br />

          <h3 className="d-flex align-items-center justify-content-center reviews-title">
            Reviews
          </h3>
          <br />

          {!productReviewsArr.some((review) => review.byUser === userId) && (
            <div className="write-review-box">
              <form onSubmit={handleAddReview}>
                <label className=" form-label write-review-label">
                  Want review this Product?
                </label>
                <br />
                <textarea
                  type="text"
                  className="form-control input-write-review"
                  rows="4"
                  onChange={handleReview}
                  value={review}
                />
                <span className="error-review">{errorReview}</span>
                <br />
                <button type="submit" className="btn btn-add-review">
                  Add Review
                </button>
              </form>
            </div>
          )}

          <br />
          <br />
          <div className="product-reviews">
            <table className="table product-reviews-table">
              <thead>
                <tr>
                  <th scope="col">User Name</th>
                  <th scope="col">Review</th>
                </tr>
              </thead>
              <tbody>
                {productReviewsArr.map((review) => {
                  return (
                    <ReviewsProductTableComponent
                      key={review._id}
                      id={review._id}
                      userName={review.userName}
                      review={review.review}
                      byUser={review.byUser}
                      onDeleteReview={handleDeleteReview}
                    ></ReviewsProductTableComponent>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
      <br />
      <br />
      <br />
      <br />
    </Fragment>
  );
};

export default ProductPage;
