module.exports = ({
  data,
  method,
  url,
  headers
}) => {
  if (Number(process.version.split(".")[0].slice(1)) <= 9) {
    throw new Error("Node version must be higher than 9.x");
  }

  if (!url.startsWith("https")) {
    throw new TypeError("You must use \"https\" protocol in HTTP2 adapter.");
  }

  let http2 = require("http2");
  let clientSession = http2.connect(url.split("/").slice(0, 3).join("/"));

  let _data = data;
  let _headers = headers;

  if (Buffer.isBuffer(data)) {
    // Nothing to do
  } else if (typeof data === "string") {
    _data = Buffer.from(_data, "utf-8"); // fix duplication
  } else if (toString.call(_data) === "[object ArrayBuffer]") {
    _data = Buffer.from(new Uint8Array(_data)); // fix duplication
  }

  if (typeof _data !== "undefined") {
    _headers["Content-Length"] = _data.length;
  }

  return new Promise((resolve) => {
    let req = clientSession.request(Object.assign({
      ":method": method,
      ":path": `/${url.split("/").slice(3).join("/")}`,
    }, headers));

    let body = "";

    req.on("response", () => {
      req.on("data", (chunk) => {
        body += chunk;
      });

      req.on("end", () => {
        clientSession.close();

        resolve({
          body
        });
      });
    });

    if (typeof _data !== "undefined") {
      req.write(_data); // fix duplication
    }

    req.end(); // fix duplication
  });
};