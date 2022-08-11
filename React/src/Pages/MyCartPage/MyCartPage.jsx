import axios from "axios";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import CartTableComponent from "../../Components/CartTableComponent/CartTableComponent";
import "./my-cart-page.css";

const MyCartPage = () => {
  const [productsArr, setProductsArr] = useState([]);
  const history = useHistory();
  const [errorToSend, setErrorToSend] = useState("");

  const handleRemove = (id) => {
    axios
      .delete(`/products/removefrommycart/${id}`)
      .then((res) => {
        let newProductsArr = productsArr.filter(
          (prodcut) => prodcut._id !== id
        );
        setProductsArr(newProductsArr);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    axios
      .get("/products/mycart")
      .then((res) => {
        setProductsArr(res.data);
      })
      .catch((err) => console.log(err));
  }, []);
  let totalPrice = 0;
  productsArr.forEach((prodcut) => {
    totalPrice += prodcut.price;
  });

  const handleBuyProducts = () => {
    axios
      .post("/products/buyproducts", productsArr)
      .then((res) => {
        alert("Thank your for your purcase , Email has been send");
        setTimeout(() => {
          history.push("/home");
        }, 2000);
      })
      .catch(() => setErrorToSend("Cannot countine,Please Try Again Later"));
  };

  return (
    <div className="container">
      <br />
      <h1 className="cart-title d-flex align-items-center justify-content-center">
        Your Cart
      </h1>
      <br />
      <br />
      <div className="row">
        <section className="col-sm">
          {productsArr.length === 0 && (
            <div className="cart-empty">You cart is empty...</div>
          )}
          {productsArr.length > 0 && (
            <div className="mb-3">
              <table className="table table-cart">
                <tbody className="">
                  {productsArr.map((product) => {
                    return (
                      <CartTableComponent
                        key={product._id}
                        id={product._id}
                        image={product.image}
                        title={product.title}
                        price={product.price}
                        onRemove={handleRemove}
                      ></CartTableComponent>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </section>
        <section className="col-sm-4">
          <div className="cart-box">
            <h2 className="total-order-title d-flex align-items-center justify-content-center">
              Order
            </h2>
            <br />
            <span className="total-order-price">
              Total Products : {productsArr.length}
              <br />
              Total Price : {totalPrice}$
            </span>
            <br />
            <br />
            {productsArr.length > 0 && (
              <button
                className="btn btn-buy-products"
                onClick={handleBuyProducts}
              >
                Buy Now!
              </button>
            )}
            <br />
            <br />
            {errorToSend !== "" && (
              <span className="error-to-send">{errorToSend}</span>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyCartPage;
