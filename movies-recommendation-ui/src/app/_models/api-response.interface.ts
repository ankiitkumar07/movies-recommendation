export interface APIResponseI<T> {
  message: string;
  status: number;
  data: T;
}
