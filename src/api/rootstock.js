export default class Rootstock {
  static #invoke = async (method, headers, url) => {
    const reqHeaders = {
      method: method,
      headers: {
        ...(headers ? headers : {}),
      },
    };

    const response = await fetch(`https://rootstock.blockscout.com/api/v2/${url}`, reqHeaders);
    return response.json();
  };

  static search = async (token) => {
    const result = await this.#invoke('GET', null, `search?q=${token}`);
    return result;
  }
}
