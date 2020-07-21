import React, { Component } from "react";

import Analysis from "./Analysis";
import Search from './Search'


export default class Admin extends Component {
  render () {
    return (
      <div>
        <Analysis />
        <Search />
        {/* <Monitor />
        
        <Statistics /> */}
      </div>
    );
  }
}
