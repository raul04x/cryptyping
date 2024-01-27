import React, { useEffect, useState } from "react";
import DexTools from "../../api/dextools";

const Account = (props) => {
  const [blockchains, setBlockchains] = useState(null);

  const getAllBlockchains = async () => {
    const result = await DexTools.getAllBlockchains(0);
    console.log(result);
    let chains = result.results;

    for (let i = 1; i <= result.totalPages; i++) {
      const temp = await DexTools.getAllBlockchains(i);
      chains = chains.concat(temp.results);
    }

    chains.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });

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
