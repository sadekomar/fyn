export enum HttpMethods {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

interface HttpOptions {
  isServer?: boolean;
  isDataJson?: boolean;
  isResponseJson?: boolean;
  signal?: AbortSignal;
}

export class HttpService {
  private baseURL: string;

  constructor(isServer: boolean = true) {
    this.baseURL = isServer
      ? process.env.API_URL!
      : process.env.NEXT_PUBLIC_API_URL!;
  }

  private async request<T>(
    method: HttpMethods,
    url: string,
    data?: any,
    options: HttpOptions = {
      isServer: true,
      isDataJson: true,
      isResponseJson: true,
    },
  ): Promise<T> {
    try {
      let requestBody;
      if (options.isDataJson && method !== HttpMethods.GET && data) {
        requestBody = JSON.stringify(data);
      }

      const headers: Record<string, string> = {};
      if (options.isDataJson && method !== HttpMethods.GET && data) {
        headers["Content-Type"] = "application/json";
      }

      const res = await fetch(`${this.baseURL}${url}`, {
        signal: method !== HttpMethods.GET ? undefined : options.signal,
        method,
        headers,
        body: requestBody,
      });

      if (method === HttpMethods.DELETE) return undefined as T;

      let parsedResponse;
      if (options.isResponseJson) {
        parsedResponse = await res.json();
      } else {
        parsedResponse = await res.text();
      }

      if (!res.ok) throw parsedResponse;

      return parsedResponse as T;
    } catch (error) {
      return error as T;
    }
  }

  async get<Response>(url: string, options?: HttpOptions): Promise<Response> {
    return this.request<Response>(HttpMethods.GET, url, undefined, options);
  }

  async post<Request, Response>(
    url: string,
    data: Request,
    options?: HttpOptions,
  ): Promise<Response> {
    return this.request<Response>(HttpMethods.POST, url, data, options);
  }

  async put<Request, Response>(
    url: string,
    data: Request,
    options?: HttpOptions,
  ): Promise<Response> {
    return this.request<Response>(HttpMethods.PUT, url, data, options);
  }

  async patch<Request, Response>(
    url: string,
    data: Request,
    options?: HttpOptions,
  ): Promise<Response> {
    return this.request<Response>(HttpMethods.PATCH, url, data, options);
  }

  async delete<Request>(url: string, options?: HttpOptions): Promise<Request> {
    return this.request<Request>(HttpMethods.DELETE, url, undefined, options);
  }
}

// Create default instances for server and client
export const serverHttp = new HttpService(true);
export const clientHttp = new HttpService(false);

// For backward compatibility
export const httpService = serverHttp;
