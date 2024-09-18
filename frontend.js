const addPrediction = async (ticker, predictedPrice) => {
  const web3 = new Web3(Web3.givenProvider || 'http://localhost:8545');
  const contract = new web3.eth.Contract(contractABI, contractAddress);
  
  const accounts = await web3.eth.requestAccounts();
  
  await contract.methods.addPrediction(ticker, predictedPrice)
    .send({ from: accounts[0] });
  
  console.log('Prediction added!');
};
