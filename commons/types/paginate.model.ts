export interface Paginate<T> {
  data: T[];
  lastPage: number
  page: number
  total: number
}
