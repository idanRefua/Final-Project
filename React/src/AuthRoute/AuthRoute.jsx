import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

const AuthRoute = ({ component: Component, ...rest }) => {
  const loggedIn = useSelector((state) => state.auth.loggedIn);
  const userData = useSelector((state) => state.auth.userData);
  const location = useLocation();
  const [fromPage, setFromPage] = useState(location.pathname);

  return (
    <Route
      {...rest}
      render={(props) =>
        loggedIn || userData.isAdmin ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { fromPage },
            }}
          />
        )
      }
    ></Route>
  );
};

export default AuthRoute;
