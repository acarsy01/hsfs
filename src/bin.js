#!/usr/bin/env node

(async () => {
  // https://medium.com/netscape/a-guide-to-create-a-nodejs-command-line-package-c2166ad0452e

  const [, , ...args] = process.argv;
  const minimist = require("minimist");
  const util = require("util");
  const _args = minimist(args);
  const hsfs = require("./index");
  const adapters = {
    "HTTPAdapter": require("../adapters/HTTPAdapter"),
    "HTTP2Adapter": require("../adapters/HTTP2Adapter")
  }

  if (!_args.hasOwnProperty("url")) throw new TypeError("\"url\" argument must be available.");
  if (!_args.hasOwnProperty("adapter")) throw new TypeError("\"adapter\" argument must be available.");

  let request = hsfs(_args.url).setAdapter(adapters[_args.adapter]);

  if (_args.hasOwnProperty("method")) {
    request = request.setMethod(_args.method);
  }

  if (_args.hasOwnProperty("data")) {
    request = request.setData(_args.data);
  }

  request = await request.finalize();

  process.stdout.write(util.inspect(request, true, null, true));
})();