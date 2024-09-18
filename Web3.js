import Web3 from 'web3';
import React, { useEffect, useState } from 'react';

const App = () => {
  const [account, setAccount] = useState('');
  const [predictions, setPredictions] = useState([]);
  const contractABI = [ /* ABI from compiled smart contract */ ];
  const contractAddress = '0xYourSmartContractAddress';
  
  useEffect(() => {
    async function loadBlockchainData() {
      const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
      const accounts = await web3.eth.getAccounts();
      setAccount(accounts[0]);
      
      const contract = new web3.eth.Contract(contractABI, contractAddress);
      const predictionCount = await contract.methods.predictionsCount().call();
      const loadedPredictions = [];
      for (let i = 0; i < predictionCount; i++) {
        const prediction = await contract.methods.predictions(i).call();
        loadedPredictions.push(prediction);
      }
      setPredictions(loadedPredictions);
    }
    loadBlockchainData();
  }, []);
  
  return (
    <div>
      <h1>Blockchain Investment Predictions</h1>
      <p>Connected Account: {account}</p>
      <ul>
        {predictions.map((prediction, index) => (
          <li key={index}>Ticker: {prediction.ticker}, Predicted Price: {prediction.predictedPrice}</li>
        ))}
      </ul>
    </div>
  );
};

export default App;
