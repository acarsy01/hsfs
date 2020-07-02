type HSFSMethods = "GET" | "POST" | "PUT" | "PATCH";
type HSFSHeaders = "Authorization" | "Content-Type";

interface HSFSResponse {
  "body": string;
}

class HSFS {
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
  "deleteHeaders": (...args: (String|Array)[]) => HSFS;
  "useFormData": () => HSFS;
  "finalize": () => Promise<HSFSResponse>;
}

declare function hsfs(url: string): HSFS;

hsfs.version = "" as string;

export = hsfs;
export default hsfs;