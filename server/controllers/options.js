'use strict'
require('dotenv').config()

const fetch = require('node-fetch')
const nasdadList = require('../models/nasdaq100.json')

const APIKEY = process.env.APIKEY
const APIKEYNASDAQ = process.env.APIKEYNASDAQ


const LETTERS = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

exports.Ticker = async (req, res) => {
  try {
    const fetchArray = LETTERS.map(letter => {
      function buildURL(letter) {
        return `https://api.polygon.io/v3/reference/tickers?type=CS&market=stocks&search=${letter}&active=true&sort=ticker&order=asc&limit=1000&apiKey=${APIKEY}`
      }
      const fetchURL = buildURL(letter);
      return fetch(fetchURL);
    })
    const responseArray = await Promise.all(fetchArray)
    const parsedResponseArray = responseArray.map(response => response.json());
    const allTicker = await Promise.all(parsedResponseArray)
    res.status(200);
    res.send(allTicker)
  } catch (e) {
    console.error("Error in Ticker", e);
  };
}


const MultipleStockPrice = async () => {
  try {

    const fetchArray = MultipleCompanyTickerArray.map(stock => {
      function buildURL(stock) {
        return `https://api.polygon.io/v2/aggs/ticker/${stock}/prev?adjusted=true&apiKey=${APIKEY}`
      }
      const fetchURL = buildURL(stock);
      return fetch(fetchURL);
    })
    const responseArray = await Promise.all(fetchArray)
    const parsedResponseArray = responseArray.map(response => response.json());
    const allStockPrice = await Promise.all(parsedResponseArray)
    return allStockPrice
  } catch (e) {
    console.log('Error in MultipleStockPrice: ', e);
  }
}
async function getStockPrice() {
  let result = await MultipleStockPrice();
  return result;
}

let MultipleCompanyTickerArray = []
// let Nasda100 = []

exports.AllOptionsContracts = async (req, res) => {
  MultipleCompanyTickerArray = []
  let { tickerSelected, expirationDay, expirationMonth, expirationYear, typeOption, allTickerSelected } = req.body
  if (tickerSelected.length === 0) {
    // Nasdaq100List()
    tickerSelected = nasdadList
  }
  expirationMonth = expirationMonth + 1
  if (expirationMonth < 10) expirationMonth = `0${expirationMonth}`
  if (expirationDay < 10) expirationDay = `0${expirationDay}`
  tickerSelected.map(item =>
    MultipleCompanyTickerArray.push(item.ticker)
  )
  try {
    const fetchArray = MultipleCompanyTickerArray.map(ticker => {
      function buildURL(ticker) {
        return `https://api.polygon.io/v3/reference/options/contracts?underlying_ticker=${ticker}&contract_type=${typeOption}&expiration_date=${expirationYear}-${expirationMonth}-${expirationDay}&expired=false&limit=1000&apiKey=${APIKEY}`
      }
      const fetchURL = buildURL(ticker);
      return fetch(fetchURL);
    })
    const responseArray = await Promise.all(fetchArray)
    const parsedResponseArray = responseArray.map(response => response.json());
    const allOptionsContracts = await Promise.all(parsedResponseArray)
    let allOptionsTicker = []
    allOptionsContracts.map(results => {
      results.results.map(item => allOptionsTicker.push({
        OptionTicker: item.ticker,
        UnderlTicker: item.underlying_ticker,
        StrikePrice: item.strike_price
      }))
    })
    const fetchArrayOptions = allOptionsTicker.map(item => {
      function buildURL(item) {
        return `https://api.polygon.io/v2/aggs/ticker/${item.OptionTicker}/prev?adjusted=true&apiKey=${APIKEY}`
      }
      const fetchURL = buildURL(item);
      return fetch(fetchURL);
    })
    const responseArrayOptionClose = await Promise.all(fetchArrayOptions)
    const parsedResponseArrayOptionClose = responseArrayOptionClose.map(response => response.json());
    const allOptionsContractsOptionClose = await Promise.all(parsedResponseArrayOptionClose)
    let stockPrice = await getStockPrice()
    const test = allOptionsContractsOptionClose.map(async (item, index) => {
      if (item.ticker === allOptionsTicker[index].OptionTicker) {
        item.infoOptions = allOptionsTicker[index]
      }
      for (let i = 0; i < stockPrice.length; i++) {
        if (item.infoOptions.UnderlTicker === stockPrice[i].ticker) {
          item.stockPrice = stockPrice[i]
        }
      }
    })
    res.status(200);
    let allOptionsContractsOptionCloseFiltered = [...new Map(allOptionsContractsOptionClose.map((item) => [item['ticker'], item])).values(),]
    let allOptionsContractsOptionCloseFilteredProp = []
    allOptionsContractsOptionCloseFiltered.map(item => item.results ? allOptionsContractsOptionCloseFilteredProp.push(item) : null)
    res.send(allOptionsContractsOptionCloseFilteredProp)

  } catch (e) {
    console.error("Error in AllOptionsContracts", e);
  };
}

const urlNewsNewsfromApi = `https://api.polygon.io/v2/reference/news?ticker=AAPL&apiKey=${APIKEY}`
exports.NewsfromApi = async (req, res) => {
  try {
    let urlFetchNews = urlNewsNewsfromApi.replace('ticker=AAPL', `ticker=${req.body.ticker}`);
    const result = await fetch(urlFetchNews);
    const data = await result.json()
    res.send(data)
    res.status(200);
  } catch (e) {
    console.error("Error in NewsfromApi", e);
  }
}

let Nasdaq100URL = `https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=${APIKEYNASDAQ}`

const Nasdaq100List = async () => {
  try {
    const result = await fetch(Nasdaq100URL);
    const data = await result.json()
    data.map(stock => Nasda100.push({
      ticker: stock.symbol
    }))

  } catch (e) {
    console.error("Error in Nasdaq100List", e);
  }
}


// not used for now. Algo allowed stockarray splittig to not fetch everything at the same time
function stockSplit(list) {
  const copy = list.slice();
  let count = 1;
  const map = {};
  while (copy.length) {
    map[count] = copy.splice(0, 300);
    count++;
  }
  return map;
}

// CODE USED AT THE BEGINNING; TO FETCH ONE STOCK AT A TIME. REPLACED BY AllOptionsContracts()"

// const urlOptionsTicker = `https://api.polygon.io/v3/reference/options/contracts?underlying_ticker=AAPL&contract_type=call&expiration_date=2022-11-18&expired=false&limit=1000&apiKey=${APIKEY}`
// const urlOptionsDetail = `https://api.polygon.io/v2/aggs/ticker/O:TSLA210903C00700000/prev?adjusted=true&apiKey=${APIKEY}`
// const urlStockPrice = `https://api.polygon.io/v2/aggs/ticker/AAPL/prev?adjusted=true&apiKey=${APIKEY}`
// const urlStrikePrice = `https://api.polygon.io/v3/reference/options/contracts/O:EVRI240119C00002500?apiKey=${APIKEY}`

// exports.OptionsTicker = async (req, res) => {
//   try {
//     let { tickerSelected, typeOption, expirationMonth, expirationDay, expirationYear } = req.body
//     expirationMonth = expirationMonth + 1
//     if (expirationMonth < 10) expirationMonth = `0${expirationMonth}`
//     if (expirationDay < 10) expirationDay = `0${expirationDay}`
//     if (expirationMonth) {
//       let urlFetchOptions = urlOptionsTicker.replace('underlying_ticker=AAPL', `underlying_ticker=${tickerSelected.ticker}`);
//       urlFetchOptions = urlFetchOptions.replace('expiration_date=2022-11-18', `expiration_date=${expirationYear}-${expirationMonth}-${expirationDay}`);
//       urlFetchOptions = urlFetchOptions.replace('contract_type=call', `contract_type=${typeOption}`);
//       const result = await fetch(urlFetchOptions);
//       const data = await result.json()
//       res.status(201);
//       res.send(data)
//     }
//   } catch (e) {
//     console.log('Error in OptionsTicker: ', e);
//   }
// }

// exports.OptionsDetail = async (req, res) => {
//   try {
//     const fetchArray = req.body.map(OptionDetail => {
//       let fetchUrlOptionsDetail = urlOptionsDetail.replace('O:TSLA210903C00700000', OptionDetail.ticker);
//       return fetch(fetchUrlOptionsDetail);
//     })
//     const responseArray = await Promise.all(fetchArray)
//     const parsedResponseArray = responseArray.map(response => response.json());
//     const allOptionsDetail = await Promise.all(parsedResponseArray)
//     let allOptionsDetailFiltered = []
//     allOptionsDetail.map(item => item.results ? allOptionsDetailFiltered.push(item) : null)
//     res.status(200);
//     res.send(allOptionsDetailFiltered)
//   } catch (e) {
//     console.log('Error in OptionsDetail: ', e);
//   }
// }

// exports.StockPrice = async (req, res) => {
//   try {
//     let { tickerSelected } = req.body
//     let fetchUrlStockPrice = urlStockPrice.replace('ticker/AAPL', `ticker/${tickerSelected.ticker}`);
//     const result = await fetch(fetchUrlStockPrice);
//     const data = await result.json()
//     res.send(data)
//     res.status(200);
//   } catch (e) {
//     console.log('Error in StockPrice: ', e);
//   }
// }

// exports.StrikePrice = async (req, res) => {
//   try {
//     let { ticker } = req.body
//     let fetchurlStrikePrice = urlStrikePrice.replace('contracts/O:EVRI240119C00002500', `contracts/${ticker}`);
//     const result = await fetch(fetchurlStrikePrice);
//     const data = await result.json()
//     res.send(data)
//     res.status(200);
//   } catch (e) {
//     console.log('Error in StrikePrice: ', e);
//   }
// }
