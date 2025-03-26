export const chartHtml = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script src="https://code.highcharts.com/stock/highstock.js"></script>
    <style>
      body {
        margin: 0;
        padding: 0;
        background: #f0f0f0;
      }
      #container {
        width: 100%;
        height: 100vh;
      }
    </style>
  </head>
  <body>
    <div id="container"></div>
    <script>
      console.log("HTML loaded");
      let chart;
      let seriesData = [];
      document.addEventListener("DOMContentLoaded", () => {
        console.log("DOM loaded, initializing chart");
        try {
          chart = Highcharts.stockChart("container", {
            rangeSelector: { selected: 1 },
            title: { text: "Binance BTC/USDT Chart" },
            series: [
              {
                type: "candlestick",
                name: "BTC/USDT",
                data: seriesData,
                tooltip: { valueDecimals: 2 },
                upColor: "#00FF00",
                color: "#FF0000",
              },
            ],
            time: { useUTC: false },
          });
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ type: "ready" })
          );
        } catch (e) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ type: "error", message: e.message })
          );
        }
      });
      window.addEventListener("message", (event) => {
        try {
          console.log("Received message:", event.data);
          const data = JSON.parse(event.data);
          if (data.type === "addCandle") {
            const candle = [
              data.timestamp,
              data.open,
              data.high,
              data.low,
              data.close,
            ];
            seriesData.push(candle);
            chart.series[0].addPoint(candle, true, seriesData.length > 50);
          } else if (data.type === "setData") {
            seriesData = data.candles.map((c) => [
              c.timestamp,
              c.open,
              c.high,
              c.low,
              c.close,
            ]);
            chart.series[0].setData(seriesData);
          } else if (data.type === "clear") {
            seriesData = [];
            chart.series[0].setData([]);
          }
        } catch (e) {
          window.ReactNativeWebView.postMessage(
            JSON.stringify({ type: "error", message: e.message })
          );
        }
      });
    </script>
  </body>
</html>
`;
