"use strict";

/**
 * @typedef {"GET"|"POST"|"PUT"|"PATCH"|"DELETE"|"HEAD"} HSFSMethods
 */

/**
 * @typedef {"Authorization"|"Content-Type"|"Content-Length"|"Accept"|"User-Agent"} HSFSHeaders
 */

/**
 * @typedef {Object} HSFSResponse
 * @property {string} body
 */

/**
 * @class
 * @description HSFS constructor
 */

const FormDataModule = ((typeof require !== "undefined") ? require("form-data") : FormData);

class HSFSRequest {
  /**
   * @constructor
   * @param {string} url
   */
  constructor(url) {
    /**
     * @description URL for HSFS request
     * @type {string}
     */
    this.url = url;

    /**
     * @description HSFS method for HSFS request
     * @type {HSFSMethods}
     */
    this.method = "GET";

    /**
     * @description Data to send with HSFS request
     * @type {ArrayBuffer|Buffer|String}
     */
    this.data;

    /**
     * @description HSFS headers to send with HSFS request
     * @type {Object<HSFSHeaders, any>}
     */
    this.headers = {};

    /**
     * @description HSFS adapter
     * @type {any}
     */
    this.adapter;
  }

  /**
   * @method HSFSRequest#setMethod
   * @description Sets method for request.
   * @param {HSFSMethods} method HTTP method to use creating request.
   * @returns {HSFSRequest}
   */
  setMethod(method) {
    if (typeof method === "undefined") {
      throw new TypeError("If \"setMethod\" function is used, \"method\" must be String.");
    } else if (!(["GET", "POST", "PUT", "PATCH", "DELETE", "HEAD", "OPTIONS"]).includes(method.toUpperCase())) {
      throw new TypeError("Request method is invalid.");
    }

    this.method = method.toUpperCase();

    return this;
  }

  /**
   * @method HSFSRequest#setAdapter
   * @description Sets adapter for request.
   * @param {any} adapter Adapter module, you must see [Guide page on GitHub]{@link https://github.com/acarsy01/hsfs/wiki/Guide#adapters} for list.
   * @returns {HSFSRequest}
   */
  setAdapter(adapter) {
    this.adapter = adapter;

    return this;
  }

  /**
   * @method HSFSRequest#setData
   * @description Sets data to send with request.
   * @param {any} data Data you want to send with request.
   * @returns {HSFSRequest}
   */
  setData(data) {
    if (!(["POST", "PUT", "MATCH"]).includes(this.method)) {
      throw new Error("\"setData\" available on \"PUT\" or \"PATCH\" or \"POST\" method.");
    }

    this.data = data;

    return this;
  }

  /**
   * @method HSFSRequest#addHeader
   * @description Adds a header.
   * @param {HSFSHeaders} headerName Header name you want to add in request.
   * @param {any} headerValue Header value you want to add in request.
   * @returns {HSFSRequest}
   */
  addHeader(headerName, headerValue) {
    this.headers[`${headerName}`] = headerValue;

    return this;
  }

  /**
   * @method HSFSRequest#addHeaders
   * @description Adds headers in one function.
   * @param {...(Object<HSFSHeaders, any>|string)} args Header name and value, or header object you want to add in request.
   * @returns {HSFSRequest}
   */
  addHeaders(...args) {
    let isString = false;

    if (typeof args[0] === "string") {
      isString = true;
    }

    for (let i = 0; i < ([...args]).length; i++) {
      if (isString === true) {
        this.headers[`${args[parseInt(i)]}`] = args[parseInt(i + 1)];
        i++;
      } else {
        this.headers = Object.assign(this.headers, args[parseInt(i)]);
      }
    }

    return this;
  }

  /**
   * @method HSFSRequest#deleteHeader
   * @description Deletes a header.
   * @param {HSFSHeaders} headerName Header name you want to delete in request.
   * @returns {HSFSRequest}
   */
  deleteHeader(headerName) {
    delete this.headers[`${headerName}`];

    return this;
  }

  /**
   * @method HSFSRequest#deleteHeaders
   * @description Deletes headers in request.
   * @param {...(HSFSHeaders|HSFSHeaders[])} headerName Header name or headers array you want to delete in request.
   * @returns {HSFSRequest}
   */
  deleteHeaders(...args) {
    for (let el of ([...args])) {
      if (Array.isArray(el)) {
        for (let header of el) {
          delete this.headers[`${header}`];
        }
      } else if (typeof el === "string") {
        delete this.headers[`${el}`];
      }
    }

    return this;
  }

  /**
   * @method HSFSRequest#useFormData
   * @description Uses form data in data (requires "form-data" dependency in node, use it after setData)
   * @returns {HSFSRequest}
   */
  useFormData() {
    if (Buffer.isBuffer(this.data) || (typeof this.data !== "object")) {
      throw new TypeError("\"data\" property must be Object.");
    }

    let form = new FormDataModule();

    for (let header of Object.keys(this.data)) {
      form.append(header, this.data[`${header}`]);
    }

    this.data = form;

    return this;
  }

  /**
   * @method HSFSRequest#finalize
   * @description Finalizes hsfs's request.
   * @returns {Promise<HSFSResponse>}
   */
  async finalize() {
    for (let prop of (["method", "adapter"])) {
      if (typeof this[`${prop}`] === "undefined") {
        throw new TypeError(`${prop} prototype must be available.`);
      }
    }

    let response = await this.adapter(this);

    for (let key of Object.keys(this)) {
      delete this[`${key}`];
    }

    return response;
  }
}



/**
 * @method request
 * @description Requests any website using hsfs.
 * @param {string} url
 * @returns {HSFSRequest}
 */
function request(url) {
  return new HSFSRequest(url);
}

/**
 * @method createServer
 * @description Creates a server in node process using hsfs.
 * @returns {HSFSServer}
 */
/*function createServer() {
  return new HSFSServer();
}*/

/**
 * @description Version of hsfs
 * @type {String}
 */
const version = ((typeof require !== "undefined") ? require("../package.json").version : "browser");

exports = {
  request,
  // createServer,
  version
};
exports.default = {
  request,
  // createServer,
  version
};

module.exports = {
  request,
  // createServer,
  version
};
module.exports.default = {
  request,
  // createServer,
  version
};