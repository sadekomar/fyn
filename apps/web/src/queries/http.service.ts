export enum HttpMethods {
  GET = "GET",
  PUT = "PUT",
  POST = "POST",
  PATCH = "PATCH",
  DELETE = "DELETE",
}

export async function httpService(
  method: HttpMethods,
  url: string,
  data?: any,
  signal?: AbortSignal,
  isJson: boolean = true,
  isResponseJson = true,
): Promise<any> {
  try {
    let requestBody;
    if (isJson && method !== HttpMethods.GET)
      requestBody = JSON.stringify(data);
    else requestBody = undefined;

    const headers: any = {};
    if (isJson && method !== HttpMethods.GET)
      headers["Content-Type"] = "application/json";

    const res = await fetch(`${process.env.API_URL}${url}`, {
      signal: method !== HttpMethods.GET ? undefined : signal,
      method: method,
      headers,
      body: requestBody,
    });

    if (method === HttpMethods.DELETE) return;

    let parsedResponse;
    if (isResponseJson) parsedResponse = await res.json();
    else parsedResponse = await res.text();
    if (!res.ok) throw parsedResponse;

    return parsedResponse;
  } catch (error) {
    console.error(error);
    return null;
  }
}
