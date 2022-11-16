//router express
'use strict';
const router = require('express').Router();
const options = require('./controllers/options');

router.get('/', (req, res) => {
  try {
    res.status(200);
    res.send('hi buddy 🤟🏻');
  }
  catch (e) {
    console.log('e', e); // eslint-disable-line no-console
    res.sendStatus(500);
  }
});
router.get('/Ticker', options.Ticker);
router.post('/AllOptionsContracts', options.AllOptionsContracts);
router.post('/NewsfromApi', options.NewsfromApi);

// CODE USED AT THE BEGINNING; TO FETCH ONE STOCK AT A TIME. REPLACED BY AllOptionsContracts()"
// router.post('/OptionsTicker', options.OptionsTicker);
// router.post('/OptionsDetail', options.OptionsDetail);
// router.post('/StockPrice', options.StockPrice);
// router.post('/StrikePrice', options.StrikePrice);

module.exports = router;

