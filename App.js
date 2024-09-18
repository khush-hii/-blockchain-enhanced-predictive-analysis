import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

// Replace this with your contract's ABI
const contractABI = [
  // Add your ABI JSON here (from the compiled smart contract)
];

// Replace this with your deployed contract address
const contractAddress = '0xYourContractAddress';

function App() {
  const [account, setAccount] = useState('');
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [ticker, setTicker] = useState('');
  const [predictedPrice, setPredictedPrice] = useState('');
  const [loading, setLoading] = useState(true);

  // Load web3, account, and contract
  useEffect(() => {
    const loadBlockchainData = async () => {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
      setWeb3(web3);
      const accounts = await web3.eth.requestAccounts();
      setAccount(accounts[0]);
      
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      setContract(contract);

      // Fetch all predictions on load
      const predictionCount = await contract.methods.getPredictionCount().call();
      let loadedPredictions = [];
      for (let i = 0; i < predictionCount; i++) {
        const prediction = await contract.methods.getPrediction(i).call();
        loadedPredictions.push(prediction);
      }
      setPredictions(loadedPredictions);
      setLoading(false);
    };

    loadBlockchainData();
  }, []);

  // Handle submitting a new prediction
  const addPrediction = async (e) => {
    e.preventDefault();
    if (!ticker || !predictedPrice) {
      alert('Please fill in all fields.');
      return;
    }
    await contract.methods.addPrediction(ticker, predictedPrice)
      .send({ from: account });
    alert('Prediction added to blockchain!');

    // Fetch the latest predictions
    const predictionCount = await contract.methods.getPredictionCount().call();
    let loadedPredictions = [];
    for (let i = 0; i < predictionCount; i++) {
      const prediction = await contract.methods.getPrediction(i).call();
      loadedPredictions.push(prediction);
    }
    setPredictions(loadedPredictions);
  };

  return (
    <div>
      <h1>Blockchain Investment Predictions</h1>
      <p>Connected Account: {account}</p>

      <form onSubmit={addPrediction}>
        <div>
          <label>Ticker:</label>
          <input
            type="text"
            value={ticker}
            onChange={(e) => setTicker(e.target.value)}
          />
        </div>
        <div>
          <label>Predicted Price:</label>
          <input
            type="text"
            value={predictedPrice}
            onChange={(e) => setPredictedPrice(e.target.value)}
          />
        </div>
        <button type="submit">Add Prediction</button>
      </form>

      {loading ? (
        <p>Loading predictions...</p>
      ) : (
        <ul>
          {predictions.map((prediction, index) => (
            <li key={index}>
              Date: {new Date(prediction[0] * 1000).toLocaleString()} |
              Ticker: {prediction[1]} |
              Predicted Price: {web3.utils.fromWei(prediction[2], 'ether')} ETH
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
