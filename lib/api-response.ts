export type ApiResponse<T> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: { code: string; message: string } };

export function apiSuccess<T>(data: T): ApiResponse<T> {
  return { success: true, data, error: null };
}

export function apiError(code: string, message: string): ApiResponse<never> {
  return { success: false, data: null, error: { code, message } };
}