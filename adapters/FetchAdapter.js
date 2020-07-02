module.exports = async function ({
  data,
  method,
  url,
  headers
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

  return {
    "body": await response.text()
  };
};