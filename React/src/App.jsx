import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.bundle";
import { Switch, Route, Redirect } from "react-router-dom";
import NavBarComponent from "../src/Components/NavBar/NavBar.component";
import HomePage from "./Pages/HomePage/HomePage";
import AboutPage from "./Pages/AboutPage/AboutPage";
import LoginPage from "./Pages/LoginPage/LoginPage";
import RegisterPage from "./Pages/RegisterPage/RegisterPage";
import MyProductsPage from "./Pages/MyProducts/MyProductsPage";
import AddProductPage from "./Pages/AddProductPage/AddProductPage";
import FooterComponent from "../src/Components/Footer/Footer.component";
import AuthRoute from "./AuthRoute/AuthRoute";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import jwt_decode from "jwt-decode";
import { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import MyFavouritesPage from "./Pages/MyFavouritesPage/MyFavouritesPage";
import DesktopPcProductsPage from "./Pages/DesktopPcProductsPage/DesktopPcProductsPage";
import LaptopProductsPage from "./Pages/LaptopsProductsPage/LaptopProductsPage";
import SmartphoneProductsPage from "./Pages/SmartphoneProductsPage/SmartphoneProductsPage";
import ProductPage from "./Pages/ProductPage/ProductPage";
import EditProductDetailsPage from "./Pages/EditProductDetailsPage/EditProductDetailsPage";
import MyProfilePage from "./Pages/MyProfilePage/MyProfilePage";
import ForgetPasswordPage from "./Pages/ForgetPasswordPage/ForgetPasswordPage";
import ResetPasswordPage from "./Pages/ResetPassword/ResetPasswordPage";
import MyCartPage from "./Pages/MyCartPage/MyCartPage";
import NotFoundPage from "./Pages/NotFoundPage/NotFoundPage";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    const token = localStorage.getItem("tokenKey");
    if (!token) {
      dispatch(authActions.logout());
      dispatch(authActions.updateUser({}));
      return;
    }

    const decoded = jwt_decode(token);
    const date = new Date();
    if (decoded.exp < date.getTime() / 1000) {
      dispatch(authActions.logout());
      dispatch(authActions.updateUser({}));
      history.push("/login");
    } else {
      dispatch(authActions.login());
      dispatch(authActions.updateUser(decoded));
    }
  }, [dispatch, history]);

  return (
    <Fragment>
      <div>
        <NavBarComponent></NavBarComponent>
        <div className="container-fluid pages">
          <Switch>
            <Route path="/" exact>
              <Redirect to="/home" />
            </Route>
            <Route path="/home" component={HomePage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/forgetpassword" component={ForgetPasswordPage} />
            <AuthRoute path="/myproducts" component={MyProductsPage} />
            <AuthRoute path="/addproduct" component={AddProductPage} />
            <Route
              path="/resetpassword/:id/:token"
              component={ResetPasswordPage}
            />
            <AuthRoute path="/mycart" component={MyCartPage} />
            <AuthRoute
              path="/products/desktoppc"
              component={DesktopPcProductsPage}
            />
            <AuthRoute
              path="/products/laptops"
              component={LaptopProductsPage}
            />
            <AuthRoute
              path="/products/smartphones"
              component={SmartphoneProductsPage}
            />
            <AuthRoute
              path="/products/myfavourites"
              component={MyFavouritesPage}
            />
            <AuthRoute path="/products/moreinfo/:id" component={ProductPage} />
            <AuthRoute
              path="/products/editproduct/:id"
              component={EditProductDetailsPage}
            />
            <AuthRoute path="/users/myprofile" component={MyProfilePage} />
            <Route path="*" component={NotFoundPage} />
          </Switch>
        </div>
      </div>
      <div className="footer">
        <FooterComponent></FooterComponent>
      </div>
    </Fragment>
  );
}

export default App;
