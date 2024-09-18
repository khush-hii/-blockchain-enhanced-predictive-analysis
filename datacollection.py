import yfinance as yf
import pandas as pd
from sklearn.preprocessing import MinMaxScaler

# Fetch historical stock data
def get_stock_data(ticker):
    data = yf.download(ticker, start="2015-01-01", end="2023-01-01")
    return data['Adj Close']

# Preprocess data for machine learning
def preprocess_data(data):
    scaler = MinMaxScaler(feature_range=(0, 1))
    scaled_data = scaler.fit_transform(data.values.reshape(-1, 1))
    return scaled_data, scaler

# Example usage
ticker = "AAPL"
data = get_stock_data(ticker)
scaled_data, scaler = preprocess_data(data)
