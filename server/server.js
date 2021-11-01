'use strict';
const express = require('express');
const http = require('http');
const io = require('socket.io');
const cors = require('cors');

let FETCH_INTERVAL = 5000;
const PORT = process.env.PORT || 4000;

const tickers = [
  'AAPL', // Apple
  'GOOGL', // Alphabet
  'MSFT', // Microsoft
  'AMZN', // Amazon
  'FB', // Facebook
  'TSLA', // Tesla
  'AGGH'
];


function randomValue(min = 0, max = 1, precision = 0) {
  const random = Math.random() * (max - min) + min;
  return random.toFixed(precision);
}

function utcDate() {
  const now = new Date();
  return new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
}

function getQuotes(socket, incomeData, filerArray, time) {

  const quotes = incomeData.filter(el => !filerArray.includes(el)).map(ticker => ({
    ticker,
    exchange: 'NASDAQ',
    price: randomValue(100, 300, 2),
    change: randomValue(-200, 200, 2),
    change_percent: randomValue(-1, 1, 2),
    dividend: randomValue(-1, 1, 2),
    yield: randomValue(-2, 2, 2),
    last_trade_time: utcDate(),
  }));

  socket.emit('ticker', {
    interval: time,
    quotes
  });
}

function trackTickers(socket) {

  let timeInterval = FETCH_INTERVAL;
  let incomeData = [...tickers]
  let filerArray = []
  // run the first time immediately
  getQuotes(socket, incomeData, filerArray, FETCH_INTERVAL);

  const intervalHandler = (time) => () => {
    getQuotes(socket, incomeData, filerArray, time);
  }

  // every N seconds
  let timer = setInterval(intervalHandler(timeInterval), timeInterval);

  socket.on('changeInterval', data => {
    clearInterval(timer)
    console.log(data)
    timeInterval = data;
    timer = setInterval(intervalHandler(timeInterval), data)
  })

  socket.on('CHANGE_LIST', (newList) => {
    console.log(newList)
    incomeData=[...newList]
  })

  socket.on('FILTER_TICKERS', (filteredItem) => {
    console.log(filteredItem)
    switch (filteredItem.type) {
      case 'add':
        if (!filerArray.includes(filteredItem.data)) {
          filerArray.push(filteredItem.data)
        }
        break
      case 'sub':
        filerArray = [...filerArray.filter(el => el !== filteredItem.data)]
         break
      default:
        break
    }
  })

  socket.on('disconnect', function () {
    clearInterval(timer);
    console.log('User disconnected. ID:', socket.id)
  });
}

const app = express();
app.use(cors());
const server = http.createServer(app);

const socketServer = io(server, {
  cors: {
    origin: "*",
  }
});

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

socketServer.on('connection', (socket) => {
  console.log('User Connected', socket.id)
  socket.on('start', () => {
    trackTickers(socket);
  });
});

server.listen(PORT, () => {
  console.log(`Streaming service is running on http://localhost:${PORT}`);
});
