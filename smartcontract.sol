// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract InvestmentPrediction {
    
    // Struct to store individual predictions
    struct Prediction {
        uint date;            // Timestamp of when the prediction was made
        string ticker;        // Ticker symbol (e.g., AAPL for Apple)
        uint256 predictedPrice; // Predicted price for the stock
    }

    // Array to hold all predictions
    Prediction[] public predictions;

    // Event to emit when a new prediction is added
    event PredictionAdded(uint date, string ticker, uint256 predictedPrice);

    // Function to add a new prediction to the blockchain
    function addPrediction(string memory ticker, uint256 predictedPrice) public {
        Prediction memory newPrediction = Prediction(block.timestamp, ticker, predictedPrice);
        predictions.push(newPrediction);

        // Emit an event for logging purposes
        emit PredictionAdded(block.timestamp, ticker, predictedPrice);
    }

    // Function to get the total number of predictions
    function getPredictionCount() public view returns (uint) {
        return predictions.length;
    }

    // Function to retrieve a prediction by its index
    function getPrediction(uint index) public view returns (uint, string memory, uint256) {
        require(index < predictions.length, "Index out of bounds");
        Prediction memory prediction = predictions[index];
        return (prediction.date, prediction.ticker, prediction.predictedPrice);
    }

    // Function to retrieve all predictions
    function getAllPredictions() public view returns (Prediction[] memory) {
        return predictions;
    }
}
