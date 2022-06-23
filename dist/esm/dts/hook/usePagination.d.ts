/// <reference types="react" />
interface UsePaginationProps {
    defaultLimit?: number;
}
declare const usePagination: ({ defaultLimit }: UsePaginationProps) => {
    pageSize: number;
    setPageSize: (value: number) => void;
    currentPage: number;
    changeSearch: (value: string) => void;
    filter: {
        search: string;
        offset: number;
        limit: number;
    };
    setCurrentPage: (value: number) => void;
    defaultApiPayload: {
        search: string;
        offset: number;
        limit: number;
    };
    setFilter: import("react").Dispatch<import("react").SetStateAction<{
        search: string;
        offset: number;
        limit: number;
    }>>;
};
export default usePagination;
