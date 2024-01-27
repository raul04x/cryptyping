import React, { useEffect, useState } from "react";

const BetForm = (props) => {
  const [bet, setBet] = useState({
    asset: "btc",
    bet: -1,
  });

  const configBet = (key, value) => {
    const temp = Object.assign({}, bet);
    temp[key] = value;
    setBet(temp);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
  };

  useEffect(() => {
    
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
              Ethereum
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
              <span>Bitcoin</span>
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
