import React, { Component } from "react";
import "./category.css";
import { withParams } from "../../utils/HOCs";
import QueryComponent from "../../component/queryComponent/QueryComponent";
import { getCategoryItems } from "../../utils/queries";
import Card from "../../component/card/Card";
import { Link } from "react-router-dom";

class Category extends Component {
  constructor(props) {
    super(props);

    this.state = {
      category: "",
    };

    this.loadData = (data) => {
      const {
        category: { products },
      } = data;

      return products.map((product) => (
        <Link className="link" to={`/product/${product.id}`}>
          <Card
            key={product.id}
            image={product.gallery[0]}
            name={product.name}
            symbol={product.prices[0].currency.symbol}
            amount={product.prices[0].amount}
            inStock={product.inStock}
            brand={product.brand}
            attribute={product.attributes}
          />
        </Link>
      ));
    };
  }

  componentDidMount() {
    const { category } = this.props.params;

    this.setState({ category: category || "all" });
  }
  componentDidUpdate() {
    const { category } = this.props.params;
    if (category !== this.state.category && category !== undefined) {
      this.setState({ category: category || "all" });
    }
  }

  render() {
    return (
      <div className="category-wrapper">
        <div className="category-name">
          {this.state.category !== "all" ? this.state.category : ""}
        </div>
        <div className="items">
          <QueryComponent
            variables={{ input: { title: this.state.category } }}
            query={getCategoryItems}
            loadData={this.loadData}
          />
        </div>
      </div>
    );
  }
}

export default withParams(Category);
