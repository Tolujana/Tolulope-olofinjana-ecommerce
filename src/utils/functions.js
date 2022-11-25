import { useParams } from "react-router-dom";

export function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export const getTotal = (items, currencyIndex) => {
  let symbol = null;
  let totalQuantity = 0;

  const total = Object.keys(items).reduce((reducer, key, index) => {
    const { prices } = items[key].productDetails;
    const { quantity } = items[key];
    const { currency, amount } = prices[currencyIndex ?? 0];
    if (symbol === null) {
      symbol = currency.symbol;
    }
    totalQuantity += quantity;
    return reducer + quantity * amount;
  }, 0);
  const tax = `${symbol ?? ""}${(total * 0.21).toFixed(2)}`;
  const totalAmount = `${symbol ?? ""}${total.toFixed(2)}`;

  return { tax, totalAmount, totalQuantity };
};

export const getName = (name) => {
  const [firstName, ...otherNames] = name.split(" ");
  const numberOfWords = otherNames.length;

  return { firstName, otherNames, numberOfWords };
};
