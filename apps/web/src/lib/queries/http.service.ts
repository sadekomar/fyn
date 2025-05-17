export enum HttpMethods {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export async function httpService<T>(
  method: HttpMethods,
  url: string,
  options: {
    isServer?: boolean;
    isDataJson?: boolean;
    isResponseJson?: boolean;
    data?: any;
    signal?: AbortSignal;
  } = {
    isServer: true,
    isDataJson: true,
    isResponseJson: true,
  },
): Promise<T> {
  try {
    let requestBody;
    if (options.isDataJson && method !== HttpMethods.GET)
      requestBody = JSON.stringify(options.data);
    else requestBody = undefined;

    const headers: any = {};
    if (options.isDataJson && method !== HttpMethods.GET)
      headers["Content-Type"] = "application/json";

    const baseURL = options.isServer
      ? process.env.API_URL
      : process.env.NEXT_PUBLIC_API_URL;

    const res = await fetch(`${baseURL}${url}`, {
      signal: method !== HttpMethods.GET ? undefined : options.signal,
      method: method,
      headers,
      body: requestBody,
    });

    if (method === HttpMethods.DELETE) return undefined as T;

    let parsedResponse;
    if (options.isResponseJson) parsedResponse = await res.json();
    else parsedResponse = await res.text();
    if (!res.ok) throw parsedResponse;

    return parsedResponse as T;
  } catch (error) {
    console.error("error in httpService", error);
    return error as T;
  }
}
