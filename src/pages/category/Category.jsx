import React, { Component } from "react";
import "./category.css";
import { withParams } from "../../utils/HOCs";
import QueryComponent from "../../component/queryComponent/QueryComponent";
import { getCategoryItems } from "../../utils/queries";
import Card from "../../component/card/Card";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  const { currencyIndex } = state.currency;

  return {
    currencyIndex: currencyIndex,
  };
};

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
      const { currencyIndex } = this.props;
      console.log(currencyIndex);
      return products.map((product) => (
        <Link key={product.id} className="link" to={`/product/${product.id}`}>
          <Card
            image={product.gallery}
            name={product.name}
            symbol={product.prices[currencyIndex ?? 0].currency.symbol}
            amount={product.prices[currencyIndex ?? 0].amount}
            prices={product.prices}
            inStock={product.inStock}
            brand={product.brand}
            attributes={product.attributes}
            id={product.id}
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
    const { category } = this.state;
    console.log(category);
    return (
      <div className="category-wrapper">
        <div className="category-name">
          {category !== "all"
            ? category[0]?.toUpperCase() + category?.slice(1, category.length)
            : ""}
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

export default connect(mapStateToProps)(withParams(Category));
