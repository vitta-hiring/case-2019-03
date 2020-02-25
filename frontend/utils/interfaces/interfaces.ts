
export interface PagedResponse<R> {
  items: R[];
  itemCount: number;
  totalItems: number;
  pageCount: number;
  next: string;
  previous: string;
}

