module.exports = async function ({
  data,
  method,
  headers,
  url
}) {
  let response;

  if (typeof data !== "undefined") {
    response = await fetch(url, {
      method,
      headers,
      "body": JSON.stringify(data)
    });
  } else {
    response = await fetch(url, {
      method,
      headers
    });
  }

  response = {
    "body": await response.text()
  };

  return response;
};