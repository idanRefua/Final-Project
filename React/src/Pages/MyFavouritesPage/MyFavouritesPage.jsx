import "./my-favourites-page.css";
import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ProductCardComponent from "../../Components/ProductCard/ProductCard.component";

const MyFavouritesPage = () => {
  const userName = useSelector((state) => state.auth.userData.firstname);
  const [favouriteProductsArr, setFavouriteProductsArr] = useState([]);
  useEffect(() => {
    axios
      .get("/products/myfavourites")
      .then((res) => setFavouriteProductsArr(res.data.myFavourites))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <br />
      <h1 className="d-flex align-items-center justify-content-center my-favourites-title">
        {userName},Here Your Favourites Products
      </h1>
      <br />
      {favouriteProductsArr <= 0 && (
        <Fragment>
          <br />
          <br />
          <h2 className="d-flex align-items-center justify-content-center no-favourites">
            You dont have favourites Products...
          </h2>
        </Fragment>
      )}
      <div className="row container">
        <div className="col">
          <div className="row">
            {favouriteProductsArr.map((product) => {
              return (
                <ProductCardComponent
                  key={product._id}
                  id={product._id}
                  image={product.image}
                  title={product.title}
                  shortinfo={product.shortinfo}
                  price={product.price}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyFavouritesPage;
