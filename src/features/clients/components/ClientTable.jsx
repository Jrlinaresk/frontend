import React from 'react';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableHead, TablePagination, TableRow, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PropTypes from 'prop-types';

import { AppEmptyState } from '../../../design-system/atoms/AppEmptyState';
import { APP_TEXT } from '../../../shared/constants/messages';
import { PAGINATION } from '../../../shared/constants/pagination';

export const ClientTable = ({ rows, onEdit, onDelete, pagination }) => {
  if (!rows.length) {
    return (
      <Paper variant="outlined" sx={{ p: 4 }}>
        <AppEmptyState title={APP_TEXT.NO_DATA} description={APP_TEXT.EMPTY_RESULTS} />
      </Paper>
    );
  }

  return (
    <Paper variant="outlined" sx={{ overflow: 'hidden' }}>
      <Box sx={{ overflowX: 'auto' }}>
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: 'primary.main' }}>
              <TableCell sx={{ color: 'common.white', fontWeight: 700 }}>Identificación</TableCell>
              <TableCell sx={{ color: 'common.white', fontWeight: 700 }}>Nombre completo</TableCell>
              <TableCell sx={{ color: 'common.white', fontWeight: 700 }} align="right">
                Acciones
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} hover>
                <TableCell>{row.identification}</TableCell>
                <TableCell>{row.fullName}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onEdit(row)} color="primary" aria-label="edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(row)} color="error" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      {pagination ? (
        <Box sx={{ px: 2, pt: 1.5 }}>
          <Typography variant="body2" color="text.secondary">
            {pagination.totalRows > 0
              ? `Mostrando ${pagination.page * pagination.rowsPerPage + 1} a ${Math.min(
                  (pagination.page + 1) * pagination.rowsPerPage,
                  pagination.totalRows
                )} de ${pagination.totalRows} clientes`
              : 'No hay registros para mostrar'}
          </Typography>
        </Box>
      ) : null}
      {pagination ? (
        <TablePagination
          component="div"
          count={pagination.totalRows}
          page={pagination.page}
          onPageChange={pagination.onPageChange}
          rowsPerPage={pagination.rowsPerPage}
          onRowsPerPageChange={pagination.onRowsPerPageChange}
          rowsPerPageOptions={PAGINATION.PAGE_SIZE_OPTIONS}
          labelRowsPerPage="Filas por página"
        />
      ) : null}
    </Paper>
  );
};

ClientTable.propTypes = {
  rows: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  pagination: PropTypes.shape({
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    totalRows: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    onRowsPerPageChange: PropTypes.func.isRequired,
  }),
};
