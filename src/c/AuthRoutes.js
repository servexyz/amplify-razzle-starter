import React from "react";
import { Route, Redirect } from "react-router-dom";

////////////////////////////////////
// Active route
////////////////////////////////////
const AppliedRoute = ({ component: C, props: cProps, ...rest }) => (
  <Route {...rest} render={props => <C {...props} {...cProps} />} />
);

////////////////////////////////////
// User must login to access
////////////////////////////////////

const AuthenticatedRoute = ({ component: C, props: cProps, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      cProps.isAuthenticated ? (
        <C {...props} {...cProps} />
      ) : (
        <Redirect
          to={`/login?redirect=${props.location.pathname}${
            props.location.search
          }`}
        />
      )
    }
  />
);

////////////////////////////////////
// Anyone can see
////////////////////////////////////

//Window is the reason that this is currently failing
function queryString(name, url = window.location.href) {
  name = name.replace(/[[]]/g, "\\$&");

  const regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i");
  const results = regex.exec(url);

  if (!results) {
    return null;
  }
  if (!results[2]) {
    return "";
  }

  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

const UnauthenticatedRoute = ({ component: C, props: cProps, ...rest }) => {
  const redirect = queryString("redirect");
  return (
    <Route
      {...rest}
      render={props =>
        !cProps.isAuthenticated ? (
          <C {...props} {...cProps} />
        ) : (
          <Redirect
            to={redirect === "" || redirect === null ? "/" : redirect}
          />
        )
      }
    />
  );
};

export { AppliedRoute, AuthenticatedRoute, UnauthenticatedRoute };
