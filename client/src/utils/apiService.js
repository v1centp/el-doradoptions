

const urlTicker = process.env.REACT_APP_API_TICKER ? process.env.REACT_APP_API_TICKER : "http://localhost:3001/ticker"
const urlAllOptionsContracts = process.env.REACT_APP_API_OPTIONS ? process.env.REACT_APP_API_OPTIONS : "http://localhost:3001/AllOptionsContracts"
const urlNewsfromApi = process.env.REACT_APP_API_NEWS ? process.env.REACT_APP_API_NEWS : "http://localhost:3001/NewsfromApi"


export const Ticker = async () => {
  try {
    const result = await fetch(urlTicker);
    return await result.json();
  } catch (err) {
    console.log('Error in get :', err);
  }
}

export const AllOptionsContracts = (multipleTickerSelected) => {
  return fetch(urlAllOptionsContracts, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(multipleTickerSelected),
    agent: false
  })
    .then((result) => result.json())
    .catch(e => console.log('Error in post AllOptionsContracts : ', e));
};

export const NewsfromApi = (tickerNews) => {
  return fetch(urlNewsfromApi, {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
    body: JSON.stringify(tickerNews),
  })
    .then((result) => result.json())
    .catch(e => console.log('Error in post NewsfromApi : ', e));
};



// CODE USED AT THE BEGINNING; TO FETCH ONE STOCK AT A TIME. REPLACED BY AllOptionsContracts()"

// const urlOptionsTicker = "http://localhost:3001/OptionsTicker"
// const urlOptionsDetail = "http://localhost:3001/OptionsDetail"
// const urlStockPrice = "http://localhost:3001/StockPrice"
// const urlStrikePrice = "http://localhost:3001/StrikePrice"

// export const OptionsTicker = (input) => {
//   return fetch(urlOptionsTicker, {
//     method: 'POST',
//     headers: { 'Content-type': 'application/json' },
//     body: JSON.stringify(input),
//   })
//     .then((result) => result.json())
//     .catch(e => console.log('Error in post OptionsTicker : ', e));
// };

// export const OptionsDetail = (res) => {
//   return fetch(urlOptionsDetail, {
//     method: 'POST',
//     headers: { 'Content-type': 'application/json' },
//     body: JSON.stringify(res),
//   })
//     .then((result) => result.json())
//     .catch(e => console.log('Error in post OptionsDetail : ', e));
// };

// export const StockPrice = (ticker) => {
//   return fetch(urlStockPrice, {
//     method: 'POST',
//     headers: { 'Content-type': 'application/json' },
//     body: JSON.stringify(ticker),
//     agent: false
//   })
//     .then((result) => result.json())
//     .catch(e => console.log('Error in post StockPrice : ', e));
// };

// export const StrikePrice = (optionTicker) => {
//   return fetch(urlStrikePrice, {
//     method: 'POST',
//     headers: { 'Content-type': 'application/json' },
//     body: JSON.stringify(optionTicker),
//   })
//     .then((result) => result.json())
//     .catch(e => console.log('Error in post StrikePrice : ', e));
// };

