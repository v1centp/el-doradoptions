//index express
'use strict';
const express = require('express');
const app = express();
var cors = require('cors');

const router = require('./router.js');
const PORT = 3001;


app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => { console.log(`🚀 Server go brrr at http://localhost:${PORT}`); }); // eslint-disable-line no-console
