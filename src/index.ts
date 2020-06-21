/* eslint-disable @typescript-eslint/no-var-requires */

import * as http from "http";
import * as https from "https";
import HSFSResponse from "./interfaces/HSFSResponse";
import Options from "./interfaces/Options";

const createPromise = (use: string, url: string, options: Options): (Promise<HSFSResponse> | Promise<null>) => {
  return new Promise((resolve) => {
    const _url = new URL(url);
    const _http = ((use === "https") ? https : http);

    const req = _http.request(_url, options, (res) => {
      let body = "";
      res.setEncoding("utf8");

      res.on("data", (chunk) => {
        body += chunk;
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

    req.end();
  });
};

const hsfs = (url: string, options: Options): (Promise<HSFSResponse> | Promise<null>) => {
  if (url.startsWith("https")) {
    return createPromise("https", url, options);
  } else if (url.startsWith("http")) {
    return createPromise("http", url, options);
  } else {
    return null;
  }
};

const version: string = require("../package.json").version;

hsfs.version = version;

export default hsfs;