# hsfs

A fast and simple HTTP library

## Example usage

```js
const { hsfs } = require("hsfs");

(async() => {
  const { body } = await hsfs("https://yandex.com.tr", {
    "method": "GET"
  });

  console.log(body);
  console.log(hsfs.version);
})();
```

> also can run in TypeScript!
> don't forget to check the [wiki page](https://github.com/acarsy01/hsfs/wiki/Documentation-of-0.0.2)!
