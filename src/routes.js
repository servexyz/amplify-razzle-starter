import React from "react";
import {
  AppliedRoute,
  UnauthenticatedRoute,
  AuthenticatedRoute
} from "./c/AuthRoutes";
import { Home } from "./c/Home";
import { Login } from "./c/Login";
import { Signup } from "./c/Signup";
import { Private } from "./c/Private";

import { Switch } from "react-router-dom";
export default ({ childProps }) => (
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
    <AuthenticatedRoute
      path="/private"
      component={Private}
      props={childProps}
    />
  </Switch>
);
