import numpy as np
from keras.models import Sequential
from keras.layers import LSTM, Dense

def create_lstm_model():
    model = Sequential()
    model.add(LSTM(units=50, return_sequences=True, input_shape=(60, 1)))
    model.add(LSTM(units=50))
    model.add(Dense(units=1))
    model.compile(optimizer='adam', loss='mean_squared_error')
    return model

# Prepare data for LSTM
def prepare_data(data, time_step=60):
    X, y = [], []
    for i in range(time_step, len(data)):
        X.append(data[i-time_step:i, 0])
        y.append(data[i, 0])
    X, y = np.array(X), np.array(y)
    return np.reshape(X, (X.shape[0], X.shape[1], 1)), y

# Train and predict
model = create_lstm_model()
X_train, y_train = prepare_data(scaled_data)
model.fit(X_train, y_train, epochs=10, batch_size=32)
