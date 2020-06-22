import { hsfs } from "./";

(async () => {
  console.log(await hsfs("https://yandex.com.tr", {
    "method": "GET"
  }));

  hsfs("https://yandex.com.tr", (error, response) => {
    console.log(response);
  });

  console.log(hsfs.version);
})();