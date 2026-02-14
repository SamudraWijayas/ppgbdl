// types/api.ts
export interface ApiMeta {
  status: number;
  message: string;
}

export interface ApiResponse<T = null> {
  meta: ApiMeta;
  data: T;
}
