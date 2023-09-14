class BaseResponse {
  /**
   *
   * @param {number} code
   * @param {*} data
   * @param {string} message
   */
  constructor(code, data, message) {
    this.code = code;
    this.data = data;
    this.message = message;
  }
}

module.exports = BaseResponse;
