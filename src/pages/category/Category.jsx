import React, { Component } from "react";
import "./category.css";
import { withParams } from "../../utils/HOCs";
import { Query } from "@apollo/client/react/components";

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: "",
    };
  }

  componentDidMount() {}
  render() {
    const { id } = this.props.params;

    return (
      <div className="category-wrapper">
        <div className="category-name"> </div>
        <div className="items"></div>
      </div>
    );
  }
}

export default withParams(Category);
