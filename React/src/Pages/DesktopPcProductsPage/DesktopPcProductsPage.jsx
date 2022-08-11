import axios from "axios";
import { useEffect, useState, Fragment } from "react";
import ProductCardComponent from "../../Components/ProductCard/ProductCard.component";
import "./all-desktoppc.css";

const DesktopPcProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("");
  const [desktopPcArr, setDesktoppcArr] = useState([]);
  const [filterArr, setFilterArr] = useState([]);

  useEffect(() => {
    axios
      .get("/products/desktoppc")
      .then((res) => {
        setFilterArr(res.data.allDesktopPc);
        setDesktoppcArr(res.data.allDesktopPc);
      })
      .catch((err) => console.log(err));
  }, []);
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setSearchTerm(e.target.value);
    const searchArr = desktopPcArr.filter((val) => {
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
    const priceArr = desktopPcArr.filter((product) => {
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
      <h1 className="d-flex align-items-center justify-content-center desktoppc-page-title">
        Desktop Pc
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
              className="input-search-desktoppc search-product col-10"
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

export default DesktopPcProductsPage;
