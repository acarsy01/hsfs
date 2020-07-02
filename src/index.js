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

class HSFSConstructor {
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
   * @method HSFSConstructor#setMethod
   * @description Sets method for HSFS request
   * @param {HSFSMethods} method
   * @returns {HSFSConstructor}
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
   * @method HSFSConstructor#setAdapter
   * @description Sets adapter for HSFS request
   * @param {any} adapter
   * @returns {HSFSConstructor}
   */
  setAdapter(adapter) {
    this.adapter = adapter;

    return this;
  }

  /**
   * @method HSFSConstructor#setData
   * @description Sets data to send URL with HSFS request
   * @param {any} data
   * @returns {HSFSConstructor}
   */
  setData(data) {
    if (!(["POST", "PUT", "MATCH"]).includes(this.method)) {
      throw new Error("\"setData\" available on \"PUT\" or \"PATCH\" or \"POST\" method.");
    }

    this.data = data;

    return this;
  }

  /**
   * @method HSFSConstructor#addHeader
   * @description Adds a header
   * @param {HSFSHeaders} headerName
   * @param {any} headerValue
   * @returns {HSFSConstructor}
   */
  addHeader(headerName, headerValue) {
    this.headers[headerName] = headerValue;

    return this;
  }

  /**
   * @method HSFSConstructor#addHeaders
   * @description Adds headers in one function
   * @param {...(Object<HSFSHeaders, any>|string)} args
   * @returns {HSFSConstructor}
   */
  addHeaders(...args) {
    let isString = false;

    if (typeof ([...args])[0] === "string") {
      isString = true;
    }

    for (let i = 0; i < ([...args]).length; i++) {
      if (isString === true) {
        this.headers[([...args])[i]] = ([...args])[i + 1];
        i++;
      } else {
        this.headers = Object.assign(this.headers, ([...args])[i]);
      }
    }

    return this;
  }

  /**
   * @method HSFSConstructor#deleteHeader
   * @description Deletes a header
   * @param {HSFSHeaders} headerName
   * @returns {HSFSConstructor}
   */
  deleteHeader(headerName) {
    delete this.headers[headerName];

    return this;
  }

  /**
   * @method HSFSConstructor#deleteHeaders
   * @description Deletes headers
   * @param {...(HSFSHeaders|Array)} headerName
   * @returns {HSFSConstructor}
   */
  deleteHeaders(...args) {
    for (let el of ([...args])) {
      if (Array.isArray(el)) {
        for (let header of el) {
          delete this.headers[header];
        }
      } else if (typeof el === "string") {
        delete this.headers[el];
      }
    }

    return this;
  }

  /**
   * @method HSFSConstructor#useFormData
   * @description Use form data in data (requires "form-data" dependency in node, use it after setData)
   * @returns {HSFSConstructor}
   */
  useFormData() {
    if (Buffer.isBuffer(this.data) || (typeof this.data !== "object")) {
      throw new TypeError("\"data\" property must be Object.");
    }

    let form = new FormDataModule();

    for (let header of Object.keys(this.data)) {
      form.append(header, this.data[header]);
    }

    this.data = form;

    return this;
  }

  /**
   * @method HSFSConstructor#finalize
   * @description Finalizes HSFS request
   * @returns {Promise<HSFSResponse>}
   */
  async finalize() {
    for (let prop of (["method", "adapter"])) {
      if (typeof this[prop] === "undefined") {
        throw new TypeError(`${prop} prototype must be available.`);
      }
    }

    let response = await this.adapter(this);

    for (let key of Object.keys(this)) {
      delete this[key];
    }

    return response;
  }
}



/**
 * @method hsfs
 * @description HSFS function
 * @param {string} url
 * @returns {HSFSConstructor}
 */
function hsfs(url) {
  return new HSFSConstructor(url);
}

/**
 * @description HSFS version
 * @type {String}
 */
hsfs.version = ((typeof require !== "undefined") ? require("../package.json").version : "browser");
hsfs.default = hsfs;

exports = hsfs;
module.exports = hsfs;