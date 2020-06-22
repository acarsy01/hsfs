/* eslint-disable @typescript-eslint/no-var-requires */

import * as http from "http";
import * as https from "https";
import HSFSResponse from "./interfaces/HSFSResponse";
import Options from "./interfaces/Options";

const createPromise = (use: string, url: string, options: Options): Promise<HSFSResponse | Error> => {
  return (new Promise((resolve) => {
    const _url = new URL(url);
    const _http = ((use === "https") ? https : http);

    const req = _http.request(_url, options, (res) => {
      let body = "";
      res.setEncoding("utf8");

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("error", (error) => {
        resolve(error);
      });

      res.on("end", () => {
        resolve({
          body,
          "headers": res.headers
        });
      });
    });

    if (typeof options.data !== "undefined") {
      req.write(JSON.stringify(options.data));
    }

    req.on("error", (error) => {
      resolve(error);
    });

    req.end();
  }));
};

const hsfs = async (url: string, arg1?: (Options | ((error: (Error | null), response: (HSFSResponse | null)) => void)), arg2?: (error: (Error | null), response: (HSFSResponse | null)) => void): (Promise<HSFSResponse | Error | null>) => {
  if (url.startsWith("https")) {
    if (typeof arg1 === "function") {
      const data = createPromise("https", url, {
        method: "GET"
      });

      const _data: HSFSResponse | Error = await data;
      arg1(((_data instanceof Error) ? _data : null), ((_data instanceof Error) ? null : _data));
    } else if (typeof arg1 === "object") {
      if (typeof arg2 === "function") {
        const data = createPromise("https", url, Object.assign({
          method: "GET"
        }, arg1));
        const _data = await data;
        arg2(((_data instanceof Error) ? _data : null), ((_data instanceof Error) ? null : _data));
      } else {
        return await createPromise("https", url, Object.assign({
          method: "GET"
        }, arg1));
      }
    } else {
      return await createPromise("https", url, {
        method: "GET"
      });
    }
  } else if (url.startsWith("http")) {
    if (typeof arg1 === "function") {
      const data = createPromise("http", url, {
        method: "GET"
      });
      const _data: HSFSResponse | Error = await data;
      arg1(((_data instanceof Error) ? _data : null), ((_data instanceof Error) ? null : _data));
    } else if (typeof arg1 === "object") {
      if (typeof arg2 === "function") {
        const data = createPromise("http", url, Object.assign({
          method: "GET"
        }, arg1));
        const _data = await data;
        arg2(((_data instanceof Error) ? _data : null), ((_data instanceof Error) ? null : _data));
      } else {
        return await createPromise("http", url, Object.assign({
          method: "GET"
        }, arg1));
      }
    } else {
      return await createPromise("http", url, {
        method: "GET"
      });
    }
  } else {
    return null;
  }
};

const version: string = require("../package.json").version;

hsfs.version = version;

export { hsfs };