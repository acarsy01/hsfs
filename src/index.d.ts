type HSFSMethods = ("GET" | "POST" | "PUT" | "PATCH" | "DELETE" | "HEAD");
type HSFSHeaders = "Authorization" | "Content-Type";

interface HSFSResponse {
  "body": string;
}

interface HSFSRequest {
  constructor(url: string);
  "url": string;
  "method": string;
  "data": any;
  "headers": Record<HSFSHeaders, any>;
  "adapter": any;
  "setMethod": (method: HSFSMethods) => HSFSRequest;
  "setAdapter": (adapter: any) => HSFSRequest;
  "setData": (data: any) => HSFSRequest;
  "addHeader": (headerName: HSFSHeaders, headerValue: any) => HSFSRequest;
  "addHeaders": (...args: (Record<HSFSHeaders, any> | String)[]) => HSFSRequest;
  "deleteHeader": (headerName: HSFSHeaders) => HSFSRequest;
  "deleteHeaders": (...args: (HSFSHeaders | HSFSHeaders[])[]) => HSFSRequest;
  "useFormData": () => HSFSRequest;
  "finalize": () => Promise<HSFSResponse>;
}

declare namespace hsfs {
  export const version: string;
  export function request(url: string): HSFSRequest;
  // export function createServer(): HSFSServer;
}

export default hsfs;
export = hsfs;