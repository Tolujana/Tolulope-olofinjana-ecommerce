import { Query } from "@apollo/client/react/components";
import React, { Component } from "react";
import { Link } from "react-router-dom";

export class QueryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { query: "" };
  }

  render() {
    return (
      <Query query={this.props.query} variables={this.props.variables}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div className="loading">Loading....</div>;
          } else {
            return this.props.loadData(data);
          }
        }}
      </Query>
    );
  }
}

export default QueryComponent;
