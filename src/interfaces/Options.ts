import { RequestOptions } from "http";

interface Options extends RequestOptions {
  data?: Record<string, unknown>;
}

export default Options;