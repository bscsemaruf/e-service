// types/api.types.ts
// কেন? Backend এর sendResponse এর shape এখানে define করো।

export interface IApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
  };
}
