(async () => {
  const hsfs = require("./");
  const HTTPAdapter = require("./src/HTTPAdapter");
  const data = await hsfs("http://example.com").setAdapter(HTTPAdapter).finalize();
  // console.log(data);
})();