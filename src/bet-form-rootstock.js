import React, { useState, useEffect } from 'react'; 
import Web3 from 'web3'; 
import DexTools, { ChainsEnabled } from "../../api/dextools";
 
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
 
const web3 = new Web3('https://public-node.testnet.rsk.co'); 
const contractAddress = '0x587D30950D2356A54CFa10B6da4F548e9944Aa81'; 
const bettingContract = new web3.eth.Contract(cryptoPredictionABI, contractAddress);

console.log(bettingContract);

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
  
    let betWon = false;
    const priceIncreased = (currentPrice > betPrice);
    if ((priceIncreased && bet.betType === 1) || (!priceIncreased && bet.betType === 0)) {
      betWon = true; // El usuario ganó la apuesta
    }

    console.log(`The bet result is: ${betWon ? 'win' : 'lose'}`);
    return { priceAfter5Min: currentPrice, priceIncreased, betWon };
  } catch (error) {
    console.error('Error comparing prices:', error);
    return { priceAfter5Min: null, priceIncreased: null, betWon: false };
  }
};
  
  useEffect(() => {
    const fetchUserScore = async () => {
      const accounts = await web3.eth.getAccounts();
      if (accounts.length > 0) {
        const userAddress = accounts[0];
        await getScore(userAddress);
      }
    };
  
    fetchUserScore();
  }, []);
  
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

  const determineNewScore = async (betWon, userAddress) => {
    try {
      const currentScore = await getScore(userAddress);
      let newScore = currentScore + (betWon ? 10 : -10);
      return newScore;
    } catch (error) {
      console.error('Error al determinar el nuevo puntaje:', error);
      return null;
    }
  };

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    await getPrices();
  
    // Asegurarse de que todos los valores necesarios están presentes
    if (!bet.asset || bet.betType === -1) {
      return;
    }
  
    console.log('Before Accounts');

    // Obtener la cuenta del usuario
    const accounts = await web3.eth.getAccounts();
    if (accounts.length === 0) {
      console.error('No Ethereum accounts found. Please connect your wallet.');
      return;
    }
    
    console.log('Accounts', accounts);
  
    const account = accounts[0];
  
    // Preparar los datos para enviar la apuesta
    const price = bet.asset === 'ether' ? bet.etherPrice : bet.btcPrice;
    if (!price) {
      console.error('Price not found for the selected asset');
      return;
    }
  
    // Eliminar el formateo del precio para obtener un número
    const numericPrice = parseFloat(price.replace(/[^0-9.-]+/g, ""));
  
    // Establecer la marca de tiempo actual
    const timestamp = Date.now();
    setBet({ ...bet, timestamp });
  
    // Enviar apuesta
    try {
      const betResponse = await bettingContract.methods.placeBet(bet.asset, numericPrice, bet.betType, timestamp)
        .send({ from: account });
      const betId = betResponse.events.BetPlaced.returnValues.betId;
  
      // Esperar 5 minutos antes de comparar precios
      setTimeout(async () => {
        try {
          const { priceAfter5Min, priceIncreased, betWon } = await comparePrices();
          await bettingContract.methods.updateBetResult(betId, priceAfter5Min, priceIncreased)
            .send({ from: account });

            const newScore = await determineNewScore(betWon, account);
            await updateScore(account, newScore);
  
        } catch (error) {
          console.error('Error al actualizar el resultado de la apuesta:', error);
        }
      }, 300000); // 300000 ms = 5 minutos
    } catch (error) {
      console.error('Error al enviar la apuesta:', error);
    }
  };
  

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
                bet.betType === 1 ? "btn-success" : "btn-outline-success"
              }`}
              onClick={() => configBet("betType", 1)}
            >
              <span className="material-symbols-rounded">arrow_upward</span>
            </button>
            <button
              type="button"
              className={`btn ${
                bet.betType === 0 ? "btn-danger" : "btn-outline-danger"
              }`}
              onClick={() => configBet("betType", 0)}
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
