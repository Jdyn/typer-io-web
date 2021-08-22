export interface ApiResponse {
  ok: boolean;
  result: Record<string, any>;
}

export type ApiErrorResponse = {
  data: {
    ok: boolean;
    result: Record<string, never>;
    error?: string;
    errors?: Record<string, any>[];
  };
};
