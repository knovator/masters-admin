/// <reference types="react" />
declare const Pagination: {
    ({ totalPages, currentPage, pageSize, setPageSize, setCurrentPage, totalRecords, limits, pageLabel, nextLabel, previousLabel, }: PaginationProps): JSX.Element;
    type: string;
};
export default Pagination;
