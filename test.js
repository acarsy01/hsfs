/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

const { hsfs } = require("./");

(async () => {
  console.log(await hsfs("https://yandex.com.tr", {
    "method": "GET"
  }));

  hsfs("https://yandex.com.tr", (error, response) => {
    console.log(response);
  });

  console.log(hsfs.version);
})();