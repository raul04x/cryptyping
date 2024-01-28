import React, { useState, useEffect } from 'react'; 
import Web3 from 'web3'; 
 
// Incluir la ABI directamente 
const cryptoPredictionABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "betId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "BetPlaced",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "betId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "priceIncreased",
				"type": "bool"
			}
		],
		"name": "BetResultUpdated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "newScore",
				"type": "uint256"
			}
		],
		"name": "ScoreUpdated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bets",
		"outputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "asset",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "priceAtBetTime",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "betType",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "priceAfter5Min",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "priceIncreased",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betId",
				"type": "uint256"
			}
		],
		"name": "getBetDetails",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			}
		],
		"name": "getScore",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "asset",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "betType",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "timestamp",
				"type": "uint256"
			}
		],
		"name": "placeBet",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalBets",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "betId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "priceAfter5Min",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "priceIncreased",
				"type": "bool"
			}
		],
		"name": "updateBetResult",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "user",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "newScore",
				"type": "uint256"
			}
		],
		"name": "updateScore",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "userScores",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];
 
const web3 = new Web3(Web3.givenProvider); 
const contractAddress = '0x587D30950D2356A54CFa10B6da4F548e9944Aa81'; 
const bettingContract = new web3.eth.Contract(cryptoPredictionABI, contractAddress);

import DexTools, { ChainsEnabled } from "../../api/dextools";

const BetForm = (props) => {
  const [bet, setBet] = useState({
    asset: "btc",
    betType: -1,
    btcPrice: null,
    etherPrice: null,
    timestamp: null,
  });

  const configBet = (key, value) => {
    setBet(prevBet => ({
      ...prevBet,
      [key]: value
    }));
  };  

  const getPrices = async () => {
    // Formateador para precios de moneda
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    });
  
    // Función para obtener el precio de un token
    const getPrice = async (chain) => {
      const priceData = await DexTools.getTokenPrice(
        ChainsEnabled[chain].address,
        ChainsEnabled[chain].id
      );
      return formatter.format(priceData.price);
    };
  
    // Obtener precios para Ethereum y Bitcoin
    const etherPrice = await getPrice('ether');
    const btcPrice = await getPrice('btc');
  
    // Actualizar el estado con los nuevos precios
    setBet(prevBet => ({
      ...prevBet,
      etherPrice: etherPrice,
      btcPrice: btcPrice
    }));
  };
  
  useEffect(() => {
    getPrices();
  }, []);
  
  const sendBet = async (asset, price, betType, timestamp) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
  
      // Elimina el formateo del precio para obtener un número
      const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
  
      const betResponse = await bettingContract.methods.placeBet(asset, numericPrice, betType, timestamp)
        .send({ from: account });
  
      const betId = betResponse.events.BetPlaced.returnValues.betId;
      return betId;
    } catch (error) {
      console.error('Error al enviar la apuesta:', error);
      return null;
    }
  };  

  const comparePrices = async () => {
    try {
      const currentEtherPrice = await DexTools.getTokenPrice(
        ChainsEnabled.ether.address,
        ChainsEnabled.ether.id
      );
      const currentBtcPrice = await DexTools.getTokenPrice(
        ChainsEnabled.btc.address,
        ChainsEnabled.btc.id
      );
  
      const currentPrice = bet.asset === 'ether' ? currentEtherPrice.price : currentBtcPrice.price;
      const betPrice = parseFloat(bet.asset === 'ether' ? bet.etherPrice : bet.btcPrice);
  
      let result;
      const priceIncreased = (currentPrice > betPrice);
      if ((currentPrice > betPrice && bet.betType === 1) || (currentPrice < betPrice && bet.betType === 0)) {
        result = 'win';
      } else {
        result = 'lose';
      }
  
      console.log(`The bet result is: ${result}`);
      return { priceAfter5Min: currentPrice, priceIncreased };
    } catch (error) {
      console.error('Error comparing prices:', error);
      return { priceAfter5Min: null, priceIncreased: null };
    }
  };
  
  const updateBetResult = async (betId, priceAfter5Min, priceIncreased) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];
  
      await bettingContract.methods.updateBetResult(betId, priceAfter5Min, priceIncreased)
        .send({ from: account });
    } catch (error) {
      console.error('Error al actualizar el resultado de la apuesta:', error);
    }
  };
  
  const getScore = async (userAddress) => {
    try {
      const score = await bettingContract.methods.getScore(userAddress).call();
      console.log('Puntaje del usuario:', score);
      return score;
    } catch (error) {
      console.error('Error al obtener el puntaje del usuario:', error);
      return null;
    }
  };

  const updateScore = async (userAddress, newScore) => {
    try {
      const accounts = await web3.eth.getAccounts();
      const account = accounts[0];

      await bettingContract.methods.updateScore(userAddress, newScore)
        .send({ from: account });
      console.log('Puntaje actualizado a:', newScore);
    } catch (error) {
      console.error('Error al actualizar el puntaje:', error);
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await getPrices();
    setBet({ ...bet, timestamp: Date.now() });

    // Esperar 5 minutos antes de comparar precios
    setTimeout(async () => {
      await comparePrices();
    }, 300000); // 300000 ms = 5 minutos
  };

  useEffect(() => {
    getPrices();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <h3>Make Your Bet</h3>
      <div className="mb-3">
        <label className="form-label">Choose Your Asset</label>
        <div className="row">
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn d-flex justify-content-center ${
                bet.asset === "ether" ? "btn-success" : "btn-outline-success"
              }`}
              onClick={() => configBet("asset", "ether")}
            >
              {bet.asset === "ether" && (
                <span className="material-symbols-rounded me-2">check</span>
              )}
              <span>Ethereum {bet.etherPrice && bet.etherPrice}</span>
            </button>
            <button
              type="button"
              className={`btn d-flex justify-content-center btn${
                bet.asset === "btc" ? "" : "-outline"
              }-success`}
              onClick={() => configBet("asset", "btc")}
            >
              {bet.asset === "btc" && (
                <span className="material-symbols-rounded me-2">check</span>
              )}
              <span>Bitcoin {bet.btcPrice && bet.btcPrice}</span>
            </button>
          </div>
        </div>
      </div>
      <div className="mb-3">
        <label className="form-label">Choose Your Bet</label>
        <div className="row">
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn ${
                bet.bet === 1 ? "btn-success" : "btn-outline-success"
              }`}
              onClick={() => configBet("bet", 1)}
            >
              <span className="material-symbols-rounded">arrow_upward</span>
            </button>
            <button
              type="button"
              className={`btn ${
                bet.bet === 0 ? "btn-danger" : "btn-outline-danger"
              }`}
              onClick={() => configBet("bet", 0)}
            >
              <span className="material-symbols-rounded">arrow_downward</span>
            </button>
          </div>
        </div>
      </div>
      <div className="col-auto">
        <button type="submit" className="btn btn-secondary">
          Submit
        </button>
      </div>
    </form>
  );
};

export default BetForm;


