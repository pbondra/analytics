import { AxiosProxyConfig } from 'axios';
import { Dictionary } from '../../models/common.models';

/**
 * Interface for HTTP responses.
 */
export interface IHttpResponse<T = object> {
  /**
   * The response data.
   */
  data: T;
  /**
   * The HTTP status code of the response.
   */
  status: number;

  /**
   * Headers included in the response.
   */
  headers: Dictionary<string | string[]>;

  /** Status text. */
  statusText: string;
}

/**
 * Interface for an HTTP request.
 */
export interface IHttpRequest<TRequest = undefined> {
  /**
   * The full URL of the request.
   */
  url: string;

  /**
   * Headers to be included with the request.
   */
  headers?: Dictionary<string>;

  /**
   * Request body, as JSON.
   */
  data?: TRequest;

  /**
   * Optional. Default: 'application/json'. The content-type of the request body.
   */
  contentType?: 'application/x-www-form-urlencoded' | 'application/json' | 'application/x-ndjson';

  /**
   * Options. Proxy to use with the request.
   */
  proxy?: AxiosProxyConfig;

  /**
   * Indicates whether the request should be aws signed or not.
   */
  awsSigned?: boolean;
}
