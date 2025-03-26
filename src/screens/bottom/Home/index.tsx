import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useRef, useState } from "react";

import HeaderChain from "@components/HeaderChain";
import Balance from "@components/BalanceMainChain";
import CollectionToken from "@components/CollectionToken";
import { useBottomSheet } from "@navigation/BottomSheetProvider";

import { WebView } from "react-native-webview";
import { chartHtml } from "../../../../web/chart";

const HomeScreen = () => {
  const { showBottomSheet } = useBottomSheet();

  const webViewRef = useRef<WebView>(null);
  const [isReady, setIsReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<"1m" | "3m" | "5m">("1m");
  const [wsConnected, setWsConnected] = useState(false);

  // Fetch historical data from Binance REST API
  const fetchHistoricalData = async (tf: "1m" | "3m" | "5m") => {
    try {
      const response = await fetch(
        `https://api.binance.com/api/v3/klines?symbol=BTCUSDT&interval=${tf}&limit=100`
      );
      const data = await response.json();
      const candles = data.map((kline: any) => ({
        timestamp: kline[0], // Open time
        open: parseFloat(kline[1]),
        high: parseFloat(kline[2]),
        low: parseFloat(kline[3]),
        close: parseFloat(kline[4]),
      }));
      console.log(`Fetched ${tf} historical data:`, candles.length, "candles");
      if (webViewRef.current && isReady) {
        webViewRef.current.postMessage(
          JSON.stringify({ type: "setData", candles })
        );
      }
    } catch (e: any) {
      setError("Failed to fetch historical data: " + e.message);
    }
  };

  // Connect to Binance WebSocket and fetch historical data
  useEffect(() => {
    const ws = new WebSocket(
      `wss://stream.binance.com:9443/ws/btcusdt@kline_${timeframe}`
    );
    ws.onopen = () => {
      console.log(`Connected to Binance WebSocket (${timeframe})`);
      setWsConnected(true);
      if (isReady) {
        fetchHistoricalData(timeframe); // Fetch data after WebSocket connects
      }
    };
    ws.onmessage = (event) => {
      if (!isReady || !webViewRef.current) {
        console.log("Not ready or no WebView ref yet, isReady:", isReady);
        return;
      }
      const data = JSON.parse(event.data);
      const kline = data.k;
      if (kline && kline.x) {
        const candle = {
          timestamp: kline.t,
          open: parseFloat(kline.o),
          high: parseFloat(kline.h),
          low: parseFloat(kline.l),
          close: parseFloat(kline.c),
        };
        console.log(`Sending ${timeframe} candle:`, candle);
        webViewRef.current.postMessage(
          JSON.stringify({
            type: "addCandle",
            ...candle,
          })
        );
      }
    };
    ws.onerror = (error) => console.error("WebSocket Error:", error);
    ws.onclose = () => {
      console.log("WebSocket Closed");
      setWsConnected(false);
    };
    return () => ws.close();
  }, [isReady, timeframe]);

  const onMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      console.log("WebView message:", data);
      if (data.type === "ready") {
        setIsReady(true);
        setLoading(false);
        if (wsConnected) {
          fetchHistoricalData(timeframe); // Fetch initial data when ready and WS connected
        }
      } else if (data.type === "error") {
        setError(data.message);
      }
    } catch (e: any) {
      setError("Message parsing error: " + e.message);
    }
  };

  const switchTimeframe = (newTimeframe: "1m" | "3m" | "5m") => {
    if (newTimeframe !== timeframe) {
      setTimeframe(newTimeframe);
      if (webViewRef.current) {
        webViewRef.current.postMessage(JSON.stringify({ type: "clear" }));
        webViewRef.current.injectJavaScript(`
          chart.setTitle({ text: 'Binance BTC/USDT ${newTimeframe} Chart' });
        `);
      }
    }
  };

  return (
    <View style={styles.container}>
      <HeaderChain />
      {/* <Balance />
      <CollectionToken showBottomSheet={showBottomSheet} /> */}

      {loading && <Text style={styles.status}>Loading chart...</Text>}
      {error && <Text style={styles.error}>Error: {error}</Text>}
      <WebView
        ref={webViewRef}
        source={{ html: chartHtml }}
        style={styles.webview}
        onMessage={onMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        originWhitelist={["*"]}
        onLoadStart={() => console.log("WebView loading started")}
        onLoad={() => {
          console.log("WebView loaded");
          setLoading(false);
        }}
        onError={(syntheticEvent) => {
          const desc = syntheticEvent.nativeEvent.description;
          console.log("WebView error:", desc);
          setError(desc);
        }}
      />
      <View style={styles.buttonContainer}>
        <Button
          title="1m"
          onPress={() => switchTimeframe("1m")}
          color={timeframe === "1m" ? "#00FF00" : "#808080"}
        />
        <Button
          title="3m"
          onPress={() => switchTimeframe("3m")}
          color={timeframe === "3m" ? "#00FF00" : "#808080"}
        />
        <Button
          title="5m"
          onPress={() => switchTimeframe("5m")}
          color={timeframe === "5m" ? "#00FF00" : "#808080"}
        />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  webview: { flex: 1 },
  status: { textAlign: "center", color: "blue" },
  error: { textAlign: "center", color: "red" },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
});
