module.exports = ({
  data,
  method,
  url,
  headers
}) => {
  if (Number(process.version.split(".")[0].slice(1)) <= 9) throw new Error("Node version must be higher than 9.x");

  let _http = require("http");
  let httpModules = {
    "http": _http,
    "https": require("https")
  };

  /** @type {_http} */
  let httpModule = httpModules[url.split("://")[0]];
  let _data = data;
  let _headers = headers;

  if (Buffer.isBuffer(data)) {
    // Nothing to do
  } else if (typeof data === "string") {
    _data = Buffer.from(_data, "utf-8");
  } else if (toString.call(_data) === "[object ArrayBuffer]") {
    _data = Buffer.from(new Uint8Array(_data));
  }

  if (typeof _data !== "undefined") {
    _headers["Content-Length"] = _data.length;
  }

  return new Promise((resolve) => {
    let req = httpModule.request(new URL(url), {
      "headers": _headers,
      method
    }, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      });

      res.on("end", () => {
        resolve({
          body
        });
      });
    });

    if (typeof _data !== "undefined") {
      req.write(_data);
    }

    req.end();
  });
};