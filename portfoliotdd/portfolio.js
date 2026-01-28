const holdings = {};

function reset() {
  for (const key in holdings) {
    delete holdings[key];
  }
}

function shares(ticker) {
  if (holdings[ticker] === undefined) {
    return 0;
  }
  return holdings[ticker];
}
function isEmpty() {
  return Object.keys(holdings).length === 0;
}

function buy(ticker, shares) {
  if (holdings[ticker] === undefined) {
    holdings[ticker] = shares;
  } else {
    holdings[ticker] = holdings[ticker] + shares;
  }
}

function sell(ticker, shares) {
  if (holdings[ticker] - shares > 0) {
    holdings[ticker] = holdings[ticker] - shares;
  } else if (holdings[ticker] - shares === 0) {
    delete holdings[ticker];
  } else {
    throw new Error("Not possible to sell this number of shares.");
  }
}

function tickerCount() {
  return Object.keys(holdings).length;
}

exports.reset = reset;
exports.shares = shares;
exports.isEmpty = isEmpty;
exports.buy = buy;
exports.sell = sell;
exports.tickerCount = tickerCount;
