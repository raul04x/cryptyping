export default class Vottun {
  static appId = '2YwqbQXE8GcBX3JbDOxn21VdAEyQ9yP06eqd8B3I7bL1LKKS7LebmzrmdFolng8r';
  static apiKey =
    "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIyYlp1OVA4elZQTEFlQjFBVnBiVDlVWDZQUGQiLCJ0eXBlIjoiZXJwIiwiaWQiOiIiLCJ1c2VybmFtZSI6ImhhY2thdG9udm90dHVuQGdtYWlsLmNvbSIsImNpZCI6ImZjYzI0NTVkLTYwMmQtNDRhMC04NGVkLWNiY2MzOTg2OTM4YSIsInNrdSI6W3siciI6MTEsInMiOjgsImUiOjB9LHsiciI6MTEsInMiOjgwMDMsImUiOjB9LHsiciI6MTEsInMiOjMsImUiOjB9LHsiciI6MTEsInMiOjgwMDUsImUiOjB9LHsiciI6MTEsInMiOjgwMDEsImUiOjB9LHsiciI6MTEsInMiOjgwMDIsImUiOjB9LHsiciI6MTEsInMiOjgwMTAsImUiOjB9XSwicHVjIjoiMDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDAwMDAwMDAwIn0.e1hBsqhu9llQemakkGLwNHeXdeKYPEVGGk7lI-JyJ7-ORzw-wkBPuVxdfE2X69oLihWtsmHqJ76f7hoYuxI_FjJDAQ4QZw18sCc5uiLHRb54vY6V71ahLY-OcTzpgL252fyDuIDxRL8-a1Rcy2ABLyKiqGuhSg322oh9yzmRuvb0OmvHll-LzVVDFcjW-OX9oTiTyD-bUdcs3nIOLQk_jIsGZiM7BNTB7HJAvLMTInvrlgCasAl3jVcPhHD-HaZRFeL5ArObt1WmiVYCjTZFTFn6iLndo-w2aW2Dh-RggYMNYX9m28u7G7qdpv7BIz5AtrVhUlOSBwB-dgn0dOOx5xJmhVB2_Q2iud_2BxZIIwf77hf_gQP0CTKcZHXQ08cg8MVGA5h9TvhiOR4tgNCGBliWvzLfK9kby3TnNmLAkRcUHk-4j2OdjBThCS8p9Q6i3fTnsK70lK0XHO561sE-OIO3IRxZlBjGvEl48B8xHELHPO1eLHwt9soptK5GGymJ8VltJTrNAzfQhgmSD1taVNLUYymjp4FtlvCEfUt-cqPelSGN6j755eLOCWl8jUb6TPu5FMxvLDEsgaHoxi4WFz0LEi5tgHwiGuUFHxHk-r14Vt2recb9C5aj_L4GFGvymyNcCvsp-DdG0sj9jHHbYS6ekuX3yIPOy2BomSdgL6E";

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

  static deployContract = async (data) => {
    const headers = {
      "Content-Type": "application/json",
      body: data,
    };

    const result = await this.#invoke(
      "POST",
      headers,
      "core/v1/evm/contract/deploy"
    );
    return result;
  };

  static transactView = async (data) => {
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.apiKey}`,
      'x-application-vkn': this.appId,
      body: data,
    };

    const result = await this.#invoke(
      "GET",
      headers,
      "core/v1/evm/transact/view"
    );
    return result;
  };
}
