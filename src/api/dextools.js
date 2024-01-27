export const ChainsEnabled = {
  ether: {
    name: "Ethereum",
    website: "https://ethereum.org/",
    address: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    id: "ether",
  },
  btc: {
    name: "Bitcoin",
    website: "https://bitcoin.org//",
    address: "0x967f8799af07df1534d48a95a5c9febe92c53ae0",
    id: "rsk",
  },
};

export default class DexTools {
  static #invoke = async (method, headers, url) => {
    const reqHeaders = {
      method: method,
      headers: {
        ...(headers ? headers : {}),
        "X-BLOBR-KEY": "SP0QUJniVhbnkTKRGncstCAUFnd4ykbi",
      },
    };

    const response = await fetch(
      `https://open-api.dextools.io/free/v2/${url}`,
      reqHeaders
    );
    return response.json();
  };

  static getAllBlockchains = async (page) => {
    const result = await this.#invoke(
      "GET",
      null,
      `blockchain?sort=name&order=asc&page=${page}&pageSize=50`
    );
    return result.data;
  };

  static getBlockchain = async (id) => {
    const result = await this.#invoke("GET", null, `blockchain/${id}`);
    return result.data;
  };

  static getTokenPrice = async (address, chainId) => {
    const result = await this.#invoke(
      "GET",
      null,
      `token/${chainId}/${address}/price`
    );
    return result.data;
  };

  static getTokenInfo = async (address, chainId) => {
    const result = await this.#invoke(
      "GET",
      null,
      `token/${chainId}/${address}/info`
    );
    return result.data;
  };

  static getTokenScore = async (address, chainId) => {
    const result = await this.#invoke(
      "GET",
      null,
      `token/${chainId}/${address}/score`
    );
    return result.data;
  };
}
