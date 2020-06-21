import { IncomingHttpHeaders } from "http";

interface HSFSResponse {
  "body": string,
  "headers": IncomingHttpHeaders
}

export default HSFSResponse;