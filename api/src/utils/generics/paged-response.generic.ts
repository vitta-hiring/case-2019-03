export class PagedResponse<T> {
    total: number;
    currentPage: number;
    totalPages: number;
    data: T[];
    constructor(
      total?: number,
      currentPage?: number,
      perPage?: number,
      data?: T[],
    ) {
      this.total = total;
      this.data = data;
      this.currentPage = currentPage;
      this.totalPages =
        total % perPage === 0
          ? total / perPage
          : parseInt((total / perPage).toString(), 10) + 1;
    }
  }