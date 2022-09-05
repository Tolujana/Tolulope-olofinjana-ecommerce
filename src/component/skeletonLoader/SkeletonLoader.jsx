import React, { Component } from "react";

export class SkeletonLoader extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
  render() {
    const loaderClass = `.skeleton ${this.props.type}`;
    return <div className={loaderClass}>SkeletonLoader</div>;
  }
}

export default SkeletonLoader;
