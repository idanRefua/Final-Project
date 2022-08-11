import "./my-products-page.css";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import MyProductsTableComponent from "../../Components/MyProductsTable/MyProductsTableComponent";
import { useSelector } from "react-redux";

const MyProductsPage = () => {
  const [myProductsArr, setMyProductsArr] = useState([]);
  const history = useHistory();
  const userName = useSelector((state) => state.auth.userData.firstname);
  const user = useSelector((state) => state.auth.userData);

  useEffect(() => {
    axios
      .get("/products/myproducts")
      .then((myProductsArr) => {
        setMyProductsArr(myProductsArr.data.myProducts);
      })
      .catch((err) => {
        console.log(err);
        console.log(myProductsArr);
      });

    if (!user.isAdmin) {
      history.push("*");
    } else {
      return;
    }
  }, []);

  const handleEditProduct = (id) => {
    history.push(`/products/editproduct/${id}`);
  };

  const handleDeleteProduct = (id) => {
    const confirm = window.confirm(
      "Are You sure You want delete this product?"
    );
    if (confirm === true) {
      axios
        .delete(`/products/deleteproduct/${id}`)
        .then((res) => {
          let newProductsArr = myProductsArr.filter(
            (product) => product._id !== id
          );
          setMyProductsArr(newProductsArr);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <Fragment>
      <br />
      <h1 className="d-flex align-items-center justify-content-center smartphones-page-title">
        Hello {userName}, Here Your Products
      </h1>
      <br />
      <br />
      <div className="container">
        <table className="table table-products ">
          <tbody className="table-body ">
            {myProductsArr.map((product) => {
              return (
                <MyProductsTableComponent
                  key={product._id}
                  id={product._id}
                  image={product.image}
                  title={product.title}
                  onEditProduct={handleEditProduct}
                  onDeleteProduct={handleDeleteProduct}
                ></MyProductsTableComponent>
              );
            })}
          </tbody>
        </table>
      </div>
    </Fragment>
  );
};

export default MyProductsPage;
