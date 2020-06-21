# hsfs

A fast and simple HTTP library

## Example usage

```js
const hsfs = require("hsfs");

(async() => {
  const { body } = await hsfs("https://yandex.com.tr", {
    "method": "GET"
  });

  console.log(body);
  console.log(hsfs.version);
})();
```

> also can run in TypeScript!
