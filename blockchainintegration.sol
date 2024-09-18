// Solidity contract for logging investment predictions
pragma solidity ^0.8.0;

contract InvestmentPrediction {
    struct Prediction {
        uint date;
        string ticker;
        uint256 predictedPrice;
    }

    Prediction[] public predictions;

    function addPrediction(string memory ticker, uint256 predictedPrice) public {
        predictions.push(Prediction(block.timestamp, ticker, predictedPrice));
    }

    function getPrediction(uint index) public view returns (uint, string memory, uint256) {
        Prediction storage prediction = predictions[index];
        return (prediction.date, prediction.ticker, prediction.predictedPrice);
    }
}
