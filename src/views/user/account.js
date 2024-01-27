import React, { useEffect, useState } from "react";
import DexTools from "../../api/dextools";

const Account = (props) => {
  const [blockchains, setBlockchains] = useState(null);

  const getAllBlockchains = async () => {
    const result = await DexTools.getAllBlockchains(0);
    let chains = result?.results;

    for (let i = 1; i <= result.totalPages; i++) {
      const temp = await DexTools.getAllBlockchains(i);

      if (temp?.results) {
        chains = chains.concat(temp.results);
      }
    }

    chains.sort((a, b) => (a.id < b.id ? -1 : 1));

    setBlockchains(chains);
  };

  useEffect(() => {
    getAllBlockchains();
  }, []);

  return (
    <main>
      <pre>
        {blockchains &&
          blockchains.map((b) => <div key={b.id}>{`${b.id}: ${b.name}`}</div>)}
      </pre>
    </main>
  );
};

export default Account;
