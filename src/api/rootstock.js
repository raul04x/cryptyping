export default class Rootstock {
  static #invoke = async (method, headers, url) => {
    const reqHeaders = {
      method: method,
      headers: {
        ...(headers ? headers : {}),
        "X-BLOBR-KEY": "SP0QUJniVhbnkTKRGncstCAUFnd4ykbi",
      },
    };

    const response = await fetch(`{rootstock-url}${url}`, reqHeaders);
    return response.json();
  };
}
