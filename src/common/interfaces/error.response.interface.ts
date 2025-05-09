export interface IErrorResponse {
  message: string;
  error: string;
  statusCode: number;
  timestamp: string;
  path?: string;
  operation?: string;
  details?: any;
}
