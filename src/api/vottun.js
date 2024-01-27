export default class Vottun {
  static #invoke = async (method, headers, url) => {
    const reqHeaders = {
      method: method,
      headers: {
        ...(headers ? headers : {}),
      },
    };

    const response = await fetch(`https://api.vottun.tech/${url}`, reqHeaders);
    return response.json();
  };
}
