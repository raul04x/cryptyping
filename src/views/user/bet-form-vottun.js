import React, { useEffect, useState } from "react";
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
      if ((currentPrice > betPrice && bet.betType === 1) || (currentPrice < betPrice && bet.betType === 0)) {
        result = 'win';
      } else {
        result = 'lose';
      }

      console.log(`The bet result is: ${result}`);
      // Aquí puedes manejar el resultado (ej., actualizar estado, enviar al backend, etc.)
    } catch (error) {
      console.error('Error comparing prices:', error);
    }
  };

  const deployContract = async () => {
  const apiUrl = 'https://api.vottun.tech/core/v1/evm/contract/deploy';
  const data = {
    contractSpecsId: 12092,
    walletAddress: "0x69dC455de77B8DB08488bdE9f1BAeb68e8fB7C39",
    blockchainNetwork: 31,
    gasLimit: 4000000,
    alias: "CryptypingCore",
    params: []
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Agrega aquí otros headers necesarios, como tokens de autenticación si es necesario
      },
      body: JSON.stringify(data)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    console.log("Contract deployed:", result);
    // Manejar la respuesta y el estado del contrato desplegado aquí
  } catch (error) {
    console.error("Error deploying contract:", error);
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
