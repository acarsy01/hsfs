import hsfs from "./";

(async () => {
  console.log(await hsfs("https://yandex.com.tr", {
    "method": "GET"
  }));
})();