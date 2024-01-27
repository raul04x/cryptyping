export default class Vottun {
  static #invoke = async (method, headers, url) => {
    const reqHeaders = {
      method: method,
      headers: {
        ...(headers ? headers : {}),
        "X-BLOBR-KEY": "SP0QUJniVhbnkTKRGncstCAUFnd4ykbi",
      },
    };

    const response = await fetch(`{vottun-url}${url}`, reqHeaders);
    return response.json();
  };
}
