export const ChainsEnabled = [
  {
    name: "Ethereum",
    website: "https://ethereum.org/",
    id: "ether",
  },
];

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
    return result;
  };

  static getBlockchain = async (id) => {
    const result = await this.#invoke("GET", null, `blockchain/${id}`);
    return result;
  };
}
