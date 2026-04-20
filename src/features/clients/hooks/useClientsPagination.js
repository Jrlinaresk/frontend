import { useCallback, useEffect, useMemo, useState } from 'react';

import { PAGINATION } from '../../../shared/constants/pagination';

const clampPage = (page, totalItems, rowsPerPage) => {
  if (totalItems <= 0) return 0;
  const lastPage = Math.max(0, Math.ceil(totalItems / rowsPerPage) - 1);
  return Math.max(0, Math.min(page, lastPage));
};

export const useClientsPagination = (rows) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(PAGINATION.DEFAULT_PAGE_SIZE);

  useEffect(() => {
    setPage((currentPage) => clampPage(currentPage, rows.length, rowsPerPage));
  }, [rows.length, rowsPerPage]);

  const paginatedRows = useMemo(() => {
    const start = page * rowsPerPage;
    return rows.slice(start, start + rowsPerPage);
  }, [page, rows, rowsPerPage]);

  const resetPage = useCallback(() => setPage(0), []);

  const handlePageChange = useCallback((_, nextPage) => {
    setPage(nextPage);
  }, []);

  const handleRowsPerPageChange = useCallback((event) => {
    const nextRowsPerPage = Number(event.target.value);
    setRowsPerPage(nextRowsPerPage);
    setPage(0);
  }, []);

  return {
    page,
    rowsPerPage,
    paginatedRows,
    totalRows: rows.length,
    handlePageChange,
    handleRowsPerPageChange,
    resetPage,
  };
};
