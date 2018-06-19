import React from "react";
import {
  AppliedRoute,
  UnauthenticatedRoute,
  AuthenticatedRoute
} from "./c/AuthRoutes";
import { Home } from "./c/Home";
import { Signup } from "./c/Signup";
import { Verify } from "./c/Verify";
import { Login } from "./c/Login";
import { Private } from "./c/Private";
import { Provider } from "unstated";

import { Switch } from "react-router-dom";
export default ({ childProps }) => (
  <Provider>
    <Switch>
      <AppliedRoute exact path="/" component={Home} props={childProps} />
      <UnauthenticatedRoute
        exact
        path="/login"
        component={Login}
        props={childProps}
      />
      <UnauthenticatedRoute
        exact
        path="/signup"
        component={Signup}
        props={childProps}
      />
      <UnauthenticatedRoute
        exact
        path="/verify"
        component={Verify}
        props={childProps}
      />
      <AuthenticatedRoute
        path="/private"
        component={Private}
        props={childProps}
      />
    </Switch>
  </Provider>
);
