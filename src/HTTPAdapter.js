module.exports = ({
  data,
  method,
  url,
  headers
}) => {
  let _http = require("http");
  let httpModules = {
    "http": _http,
    "https": require("https")
  };

  /** @type {_http} */
  let httpModule = httpModules[url.split("://")[0]];

  return new Promise((resolve) => {
    let req = httpModule.request(new URL(url), {
      "headers": headers,
      "method": method
    }, (res) => {
      let body = "";

      res.on("data", (chunk) => {
        body += chunk;
      })

      res.on("end", () => {
        resolve({
          body
        });
      })
    });

    if (typeof data != "undefined") {
      req.write(data);
    }

    req.end();
  });
}