module.exports = function ({
  headers,
  data,
  method,
  url
}) {
  let req = new XMLHttpRequest();
  req.open(`${method}`, (new URL(url)));

  for (let i = 0; i < Object.keys(headers).length; i++) {
    req.setRequestHeader(Object.keys(headers)[parseInt(i, 10)], Object.values(headers)[parseInt(i, 10)]);
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