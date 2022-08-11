import "./home-page.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import CardProductToHomeComponent from "../../Components/CardProductForHomePage/CardProduct.component";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

const HomePage = () => {
  const [productsArr, setProductsArr] = useState([]);
  const [filterValues, setFilterValues] = useState([]);

  useEffect(() => {
    axios
      .get("/products/")
      .then((products) => {
        setProductsArr(products.data.allProducts);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleInput = (e) => {
    const searchValues = e.target.value;
    const newFilter = productsArr.filter((value) => {
      return value.title.toLowerCase().includes(searchValues.toLowerCase());
    });
    if (searchValues === "") {
      setFilterValues([]);
    } else {
      setFilterValues(newFilter);
    }
  };
  return (
    <div className="container page-home">
      <br />
      <h1 className="d-flex align-items-center justify-content-center home-page-title">
        Welcome to Refua Store
      </h1>
      <div className="d-flex align-items-center justify-content-center">
        <div className="search">
          <input
            className="input-search input-home-page"
            type="text"
            onChange={handleInput}
            placeholder="Search Products..."
          />
          {filterValues.length !== 0 && (
            <div className="result-search ">
              {filterValues.slice(0, 5).map((value) => {
                return (
                  <div className="p-product" key={value._id}>
                    <img
                      className="search-image-product"
                      src={
                        value.image
                          ? value.image
                          : "https://cdn.pixabay.com/photo/2018/06/12/15/08/question-mark-3470783_960_720.jpg"
                      }
                      alt="product-image"
                    />
                    <span className="br-span"></span>
                    <Link to={`/products/moreinfo/${value._id}`}>
                      {value.title}
                    </Link>
                  </div>
                );
              })}
            </div>
          )}
          <br />
          <br />
          <br />
        </div>
      </div>
      <div className="container ">
        <h2 className="swiper-title d-flex align-items-center justify-content-center">
          Most Favourites Products
        </h2>
        <br />
        <Swiper
          className="my-swiper"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            720: { slidesPerView: 2, spaceBetween: 30 },
            950: { slidesPerView: 3, spaceBetween: 20 },
            1400: { slidesPerView: 4, spaceBetween: 50 },
          }}
        >
          {productsArr
            .filter((product) => {
              if (product.likes.length > 0) {
                return product;
              }
            })
            .slice(0, 12)
            .map((product) => {
              return (
                <SwiperSlide key={product._id}>
                  <CardProductToHomeComponent
                    key={product._id}
                    id={product._id}
                    image={product.image}
                    title={product.title}
                  ></CardProductToHomeComponent>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
      <br />
      <br />
      <br />
      <br />

      <div className="container">
        <h2 className="swiper-title d-flex align-items-center justify-content-center">
          Most Reviews Products
        </h2>
        <br />
        <Swiper
          className="my-swiper"
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          navigation
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          breakpoints={{
            720: { slidesPerView: 2, spaceBetween: 30 },
            950: { slidesPerView: 3, spaceBetween: 20 },
            1400: { slidesPerView: 4, spaceBetween: 50 },
          }}
        >
          {productsArr
            .filter((product) => {
              if (product.reviews.length > 0) {
                return product;
              }
            })
            .slice(0, 12)
            .map((product) => {
              return (
                <SwiperSlide key={product._id}>
                  <CardProductToHomeComponent
                    key={product._id}
                    id={product._id}
                    image={product.image}
                    title={product.title}
                  ></CardProductToHomeComponent>
                </SwiperSlide>
              );
            })}
        </Swiper>
      </div>
      <br />
      <br />
      <br />
      <br />

      <div className="reviews row">
        <div className="review-by-people d-flex align-items-center justify-content-center">
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/11/42/star-158502_960_720.png"
            alt="star-image"
            className="star-image d-flex align-items-center justify-content-center"
          />
          <h1 className="review-box-title d-flex align-items-center justify-content-center">
            Reviews On Us
          </h1>
          <img
            src="https://cdn.pixabay.com/photo/2013/07/13/11/42/star-158502_960_720.png"
            alt="star-image"
            className="star-image d-flex align-items-center justify-content-center"
          />
        </div>
        <div className="review col-4">
          <img
            src="https://cdn.pixabay.com/photo/2018/01/21/14/16/woman-3096664_960_720.jpg"
            className="img-fluid review-user-qoute "
            alt="Person image "
          />
          <br />
          <br />
          <h3 className="review-title">Naomi Kadosh</h3>
          <p className="p-review">
            Nice Website , i order from here so many times , since 2017, Fast
            Shipping and Good Prices !
          </p>
        </div>
        <div className="review col-4">
          <img
            src="https://cdn.pixabay.com/photo/2016/11/29/03/52/man-1867175_960_720.jpg"
            className="img-fluid review-user-qoute d-flex align-items-center justify-content-center"
            alt="Person image"
          />
          <br />
          <h3 className="review-title">Marc Koko</h3>
          <p className="p-review">
            Great Shop! I can really recommend about this Store. <br />I bought
            from here iPhone 15 and the price was good .
          </p>
        </div>
        <div className="review col-4">
          <img
            src="https://cdn.pixabay.com/photo/2016/11/18/19/07/happy-1836445_960_720.jpg"
            className="img-fluid review-user-qoute d-flex align-items-center justify-content-center"
            alt="Person image"
          />
          <br />
          <h3 className="review-title">Idan Demon</h3>

          <p className="p-review">
            Great Prices,Great Store!,it's good to see website that allow peole
            around the world sell products they got with good price
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
