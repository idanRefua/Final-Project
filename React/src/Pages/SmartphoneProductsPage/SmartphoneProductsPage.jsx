import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import "./smartphone-page.css";
import ProductCardComponent from "../../Components/ProductCard/ProductCard.component";
const SmartphoneProductsPage = () => {
  const [smartPhonesArr, setSmartphonesArr] = useState([]);
  const [filterArr, setFilterArr] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  useEffect(() => {
    axios
      .get("/products/smartphones")
      .then((res) => {
        setSmartphonesArr(res.data.allSmartphones);
        setFilterArr(res.data.allSmartphones);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const searchArr = smartPhonesArr.filter((val) => {
      if (e.target.value === "" && priceFilter === "All") {
        return val;
      } else if (
        val.title.toLowerCase().includes(e.target.value.toLowerCase()) &&
        priceFilter
      ) {
        return val.price < priceFilter;
      }
    });
    setFilterArr(searchArr);
  };

  const handleChangeFilterPrice = (e) => {
    setPriceFilter(e.target.value);
    const priceArr = smartPhonesArr.filter((product) => {
      if (e.target.value === "All") {
        return product;
      } else if (e.target.value === "100") {
        return product.price < "100";
      } else if (e.target.value === "300") {
        return product.price < "300";
      } else if (e.target.value === "500") {
        return product.price < "500";
      }
    });

    setFilterArr(priceArr);
  };

  const renderData = () => {
    if (filterArr) {
      return (
        <Fragment>
          {filterArr.map((item) => {
            return (
              <ProductCardComponent
                key={item._id}
                id={item._id}
                image={item.image}
                title={item.title}
                shortinfo={item.shortinfo}
                price={item.price}
              ></ProductCardComponent>
            );
          })}
        </Fragment>
      );
    }
  };

  return (
    <Fragment>
      <br />
      <h1 className="d-flex align-items-center justify-content-center smartphones-page-title">
        Smartphones
      </h1>
      <br />
      <div className="container ">
        <div className="col">
          <div className="row">
            <input
              type="text"
              placeholder="Search Product..."
              onChange={handleSearch}
              value={searchTerm}
              className="input-search-smartphones search-product col-10 "
            />

            <div>
              <br />
              <select
                onChange={handleChangeFilterPrice}
                defaultValue={"All"}
                className="form-select filter-price-box "
                id="inputGroupSelect01"
              >
                <option className="option-select" value="All">
                  All
                </option>
                <option className="option-select" value="100">
                  Under 100$
                </option>
                <option className="option-select" value="300">
                  Under 300$
                </option>
                <option className="option-select" value="500">
                  Under 500$
                </option>
              </select>
            </div>

            {renderData()}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default SmartphoneProductsPage;
