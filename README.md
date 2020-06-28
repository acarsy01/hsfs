# HSFS

A classified HTTP library for the browser and Node.

Don't forget to check [Wiki page](https://github.com/acarsy01/hsfs/wiki).

## Browser usage

```html
<html>
  <head>
    <script src="https://unpkg.com/hsfs/dist/HSFS.js"></script>
    <script src="https://unpkg.com/hsfs/dist/XMLHttpRequestAdapter.js"></script>

    <script>
      (async() => {
        let hsfs = HSFS("https://cors-anywhere.herokuapp.com/http://example.com") // https://cors-anywhere.herokuapp.com/ for block CORS error in browser
          .setAdapter(XMLHttpRequestAdapter);
        console.log(await hsfs.finalize());
      })();
    </script>
  </head>
</html>
```

## Node usage

Firstly, you must install dependency;

```nothing
npm i hsfs
```

```js
(async () => {
  const hsfs = require("hsfs");
  const HTTPAdapter = require("hsfs/HTTPAdapter");
  const data = await hsfs("http://example.com").setAdapter(HTTPAdapter).finalize();
  console.log(data);
})();
```
