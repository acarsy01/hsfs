module.exports = function ({
  data,
  method,
  url,
  headers
}) {
  let req = new XMLHttpRequest();
  req.open(method, (new URL(url)));

  for (let header of Object.keys(headers)) {
    req.setRequestHeader(header, headers[header]);
  }

  return new Promise((resolve) => {
    if (typeof data != "undefined") {
      req.send(data);
    } else {
      req.send();
    }

    req.onload = function () {
      resolve({
        "body": req.response
      });
    }
  });
};