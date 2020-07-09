type HSFSMethods = "GET" | "POST" | "PUT" | "PATCH";
type HSFSHeaders = "Authorization" | "Content-Type";

interface HSFSResponse {
  "body": string;
}

interface HSFS {
  constructor(url: string);
  "url": string;
  "method": string;
  "data": any;
  "headers": Record<HSFSHeaders, any>;
  "adapter": any;
  "setMethod": (method: HSFSMethods) => HSFS;
  "setAdapter": (adapter: any) => HSFS;
  "setData": (data: any) => HSFS;
  "addHeader": (headerName: HSFSHeaders, headerValue: any) => HSFS;
  "addHeaders": (...args: (Record<HSFSHeaders, any> | String)[]) => HSFS;
  "deleteHeader": (headerName: HSFSHeaders) => HSFS;
  "deleteHeaders": (...args: (HSFSHeaders | HSFSHeaders[])[]) => HSFS;
  "useFormData": () => HSFS;
  "finalize": () => Promise<HSFSResponse>;
}

declare function hsfs(url: string): HSFS;

declare namespace hsfs {
  export const version: string;
}

export = hsfs;