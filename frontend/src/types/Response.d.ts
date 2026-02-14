interface ErrorResponse {
  meta: {
    status: number;
    message: string | string[];
  };
  data: null;
}

export type { ErrorResponse };