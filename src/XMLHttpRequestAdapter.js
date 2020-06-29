module.exports = function ({
  data,
  method,
  url,
  headers
}) {
  let req = new XMLHttpRequest();
  req.open(method, (new URL(url)));

  for (let i = 0; i < Object.keys(headers).length; i++) {
    req.setRequestHeader(header, Object.values(headers)[i]);
  }

  return new Promise((resolve) => {
    if (typeof data !== "undefined") {
      req.send(data);
    } else {
      req.send();
    }

    req.onload = function () {
      resolve({
        "body": req.response
      });
    };
  });
};