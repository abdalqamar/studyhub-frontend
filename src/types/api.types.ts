export interface ApiErrorData {
  message?: string;
  code?: string;
  errors?: Record<string, string>;
}
