# HSFS
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/acarsy01"><img src="https://avatars2.githubusercontent.com/u/67241967?v=4" width="100px;" alt=""/><br /><sub><b>acarsy01</b></sub></a><br /><a href="https://github.com/acarsy01/hsfs/commits?author=acarsy01" title="Code">💻</a> <a href="https://github.com/acarsy01/hsfs/commits?author=acarsy01" title="Documentation">📖</a> <a href="#ideas-acarsy01" title="Ideas, Planning, & Feedback">🤔</a> <a href="#projectManagement-acarsy01" title="Project Management">📆</a> <a href="https://github.com/acarsy01/hsfs/commits?author=acarsy01" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/ceyrex20"><img src="https://avatars0.githubusercontent.com/u/38532537?v=4" width="100px;" alt=""/><br /><sub><b>Ceyhun</b></sub></a><br /><a href="#userTesting-ceyrex20" title="User Testing">📓</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!