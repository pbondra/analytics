import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IHttpResponse, IHttpRequest } from './http.types';
import { stringify } from 'querystring';


class HttpService {
  /**
   * The internally managed configuration object.
   */
  private axios: AxiosInstance;

  /**
   * Designated constructor.
   *
   * @param configurationService The configuration service.
   */
  constructor() {
    this.axios = axios;
  }

  /**
   * Executes an HTTP GET request and returns the response.
   *
   * @param request The HTTP request to execute.
   * @returns The HTTP response, as a promise.
   */
  async getAsync<TResponse>(request: IHttpRequest): Promise<IHttpResponse<TResponse>> {
    const options = this.toAxiosOptions(request);
    options.method = 'GET';
    options.decompress = false;

    return await this.axios(options);
  }

  /**
   * Executes an HTTP POST request and returns the response.
   *
   * @param request The HTTP request to execute.
   * @returns The HTTP response, as a promise.
   */
  async postAsync<TRequest, TResponse>(request: IHttpRequest<TRequest>): Promise<IHttpResponse<TResponse>> {
    const options = this.toAxiosOptions(request);
    options.method = 'POST';

    return await this.axios(options);
  }

  /**
   * Converts an incoming request into axios request options.
   *
   * @param request The request to convert.
   * @returns Axios request options.
   */
  private toAxiosOptions<TRequest>(request: IHttpRequest<TRequest>): AxiosRequestConfig {
    const options: AxiosRequestConfig = {
      url: request.url,
      headers: request.headers,
      validateStatus: (): boolean => {
        return true;
      },
      maxRedirects: 0
    };

    if (request.data !== undefined) {
      const headers = options.headers || (options.headers = {});
      const contentType = request.contentType || 'application/json';
      headers['Content-Type'] = contentType;
      switch (contentType) {
        case 'application/json':
        case 'application/x-ndjson': {
          options.data = request.data;
          break;
        }

        case 'application/x-www-form-urlencoded': {
          console.log('response is application/x-www-form-urlencoded');
          break;
        }
      }
    }

    if (request.proxy) {
      options.proxy = request.proxy;
    }

    return options;
  }
}

export { HttpService };
