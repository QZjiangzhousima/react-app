import React, { Component } from "react";
import { Switch, Route } from "react-router-dom";

import { constantRoutes } from "@conf/routes";
import { Suspense } from "react";

class PublicLayout extends Component {
  renderRoute = (routes) => {
    return routes.map((route) => {
      return (
        <Route
          key={route.path}
          path={route.path}
          component={route.component}
          exact={true}
        />
      );
    });
  };

  render () {

    return <Suspense fallback={<div style={{ color: 'red', fontsize: 30 }}>login...</div>}><Switch>{this.renderRoute(constantRoutes)}</Switch></Suspense>;
  }
}

export default PublicLayout;
