import { Query } from "@apollo/client/react/components";
import React, { Component } from "react";

export class QueryComponent extends Component {
  constructor(props) {
    super(props);

    this.state = { query: "" };
  }

  render() {
    const { query, variables, loadData } = this.props;
    return (
      <Query query={query} variables={variables}>
        {({ loading, error, data }) => {
          if (loading) {
            return <div className="loading">Loading....</div>;
          } else {
            return loadData(data);
          }
        }}
      </Query>
    );
  }
}

export default QueryComponent;
