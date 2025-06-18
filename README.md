# Binance api

Nestjs backend to analyze historical data from official binance api

## What's inside?

This Nestjs backend includes the following:

- Integration with Binance public REST API
- Endpoint to analyze historical price data
- Support for configurable symbol, interval, and time ranges

### Important links

- **Binance API Docs**: [https://api.binance.com](https://api.binance.com)

### ⚙️ Setup

Make sure to create `.env` in the root api folder with the following variables

```env
SYMBOL=BTCUSDT example
BINANCE_API= binance api base url
PORT=your_port_number
```

### How to run a project

Start with
`npm install`

You can run both the backend and frontend simultaneously with
`npm run start:dev`

To run test
`npn run test`

## 📡 API Endpoints

### `GET /api/binance/analyze`

Analyzes historical price data for a specific trading pair using Binance candlestick (kline) data.

#### 🔸 Query Parameters

| Parameter   | Type   | Required | Description                                                         |
| ----------- | ------ | -------- | ------------------------------------------------------------------- |
| `interval`  | string | ✅ Yes   | Time interval for each candlestick (e.g., `1m`, `5m`, `1h`, `1d`)   |
| `startTime` | string | ❌ No    | Start time in milliseconds since UNIX epoch (e.g., `1718000000000`) |
| `endTime`   | string | ❌ No    | End time in milliseconds since UNIX epoch                           |

> **Note**: If `startTime` and `endTime` are not provided, the API will fetch the latest 200 candlesticks for the given interval.

#### 🔹 Example Request
