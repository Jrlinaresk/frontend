import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Card, CardContent, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import { DashboardLayout } from '../../../design-system/templates/DashboardLayout';
import { PageHeader } from '../../../design-system/molecules/PageHeader';
import { SearchBar } from '../../../design-system/molecules/SearchBar';
import { AppLoader } from '../../../design-system/atoms/AppLoader';
import { AppButton } from '../../../design-system/atoms/AppButton';
import { ClientDeleteDialog } from '../components/ClientDeleteDialog';
import { ClientTable } from '../components/ClientTable';
import { useClientsPagination } from '../hooks/useClientsPagination';
import { useSession } from '../../../core/session/SessionContext';
import { useFeedback } from '../../../core/feedback/FeedbackContext';
import { APP_TEXT, PAGE_HINTS } from '../../../shared/constants/messages';
import { APP_ROUTES } from '../../../shared/enums/routes';
import { deleteClient, searchClients } from '../services/clientService';
import { validateClientFilters } from '../../../shared/validators/clientValidators';
import { normalizeApiError } from '../../../core/api/errorNormalizer';

const initialFilters = { identification: '', name: '' };

export const ClientsPage = () => {
  const navigate = useNavigate();
  const session = useSession();
  const feedback = useFeedback();
  const [filters, setFilters] = useState(initialFilters);
  const [rows, setRows] = useState([]);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);
  const {
    page,
    rowsPerPage,
    paginatedRows,
    totalRows,
    handlePageChange,
    handleRowsPerPageChange,
    resetPage,
  } = useClientsPagination(rows);

  const fetchClients = useCallback(async (nextFilters = initialFilters, options = {}) => {
    setLoading(true);
    setError('');
    try {
      const result = await searchClients(nextFilters, session.userId);
      setRows(result);
      if (options.resetPage) {
        resetPage();
      }
    } catch (apiError) {
      setError(normalizeApiError(apiError));
      setRows([]);
    } finally {
      setLoading(false);
    }
  }, [resetPage, session.userId]);

  useEffect(() => {
    if (session.userId) fetchClients(initialFilters, { resetPage: true });
  }, [fetchClients, session.userId]);

  const handleSearch = async () => {
    const nextErrors = validateClientFilters(filters);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    await fetchClients(filters, { resetPage: true });
  };

  const handleDelete = async () => {
    if (!deleteTarget) return;
    try {
      await deleteClient(deleteTarget.id);
      feedback.showSuccess('Cliente eliminado correctamente.');
      setDeleteTarget(null);
      await fetchClients(filters, { resetPage: false });
    } catch (apiError) {
      feedback.showError(normalizeApiError(apiError));
    }
  };

  return (
    <DashboardLayout username={session.username} onLogout={session.logout}>
      <PageHeader
        title={APP_TEXT.CLIENTS_TITLE}
        subtitle={PAGE_HINTS.CLIENTS}
        actions={
          <Stack direction="row" spacing={1.5}>
            <AppButton onClick={() => navigate(APP_ROUTES.CLIENT_CREATE)}>{APP_TEXT.ADD}</AppButton>
            <AppButton variant="outlined" onClick={() => navigate(APP_ROUTES.HOME)}>
              {APP_TEXT.BACK}
            </AppButton>
          </Stack>
        }
      />

      <Stack spacing={3}>
        <Card>
          <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
            <SearchBar
              identification={filters.identification}
              name={filters.name}
              onChange={(key, value) => setFilters((current) => ({ ...current, [key]: value }))}
              onSearch={handleSearch}
              errors={errors}
            />
          </CardContent>
        </Card>

        {loading ? <AppLoader /> : null}
        {!loading && error ? <Alert severity="error">{error}</Alert> : null}
        {!loading && !error ? (
          <ClientTable
            rows={paginatedRows}
            pagination={
              rows.length
                ? {
                    page,
                    rowsPerPage,
                    totalRows,
                    onPageChange: handlePageChange,
                    onRowsPerPageChange: handleRowsPerPageChange,
                  }
                : null
            }
            onEdit={(row) => navigate(APP_ROUTES.CLIENT_EDIT.replace(':id', row.id), { state: row })}
            onDelete={(row) => setDeleteTarget(row)}
          />
        ) : null}
      </Stack>

      <ClientDeleteDialog
        open={Boolean(deleteTarget)}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
      />
    </DashboardLayout>
  );
};
