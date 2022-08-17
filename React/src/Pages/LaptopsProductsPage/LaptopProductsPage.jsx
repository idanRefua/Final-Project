import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import "./laptop-page.css";
import ProductCardComponent from "../../Components/ProductCard/ProductCard.component";

const LaptopProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [filterArr, setFilterArr] = useState([]);
  const [laptopsArr, setLetptopsArr] = useState([]);

  useEffect(() => {
    axios
      .get("/products/laptops")
      .then((res) => {
        setLetptopsArr(res.data.allLaptops);
        setFilterArr(res.data.allLaptops);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    const searchArr = laptopsArr.filter((val) => {
      if (e.target.value === "" && priceFilter === "All") {
        return val;
      } else if (
        val.title.toLowerCase().includes(e.target.value.toLowerCase()) &&
        priceFilter === "All"
      ) {
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
    const priceArr = laptopsArr.filter((product) => {
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
      <h1 className="d-flex align-items-center justify-content-center laptops-page-title">
        Laptops
      </h1>

      <br />
      <div className="container">
        <div className="col">
          <div className="row">
            <input
              type="text"
              placeholder="Search Product..."
              onChange={handleSearch}
              value={searchTerm}
              className="input-search-laptops search-product col-10"
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

            {filterArr.length === 0 && (
              <h2 className="d-flex align-items-center justify-content-center">
                No Found Products
              </h2>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default LaptopProductsPage;
