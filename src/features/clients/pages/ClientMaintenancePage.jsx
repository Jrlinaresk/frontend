import React, { useEffect, useState } from 'react';
import { Alert, Avatar, Stack } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PersonIcon from '@mui/icons-material/Person';
import SaveIcon from '@mui/icons-material/Save';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { DashboardLayout } from '../../../design-system/templates/DashboardLayout';
import { PageHeader } from '../../../design-system/molecules/PageHeader';
import { AppLoader } from '../../../design-system/atoms/AppLoader';
import { AppButton } from '../../../design-system/atoms/AppButton';
import { ClientForm } from '../components/ClientForm';
import { useSession } from '../../../core/session/SessionContext';
import { useFeedback } from '../../../core/feedback/FeedbackContext';
import { APP_TEXT, PAGE_HINTS } from '../../../shared/constants/messages';
import { APP_ROUTES } from '../../../shared/enums/routes';
import { validateClientForm } from '../../../shared/validators/clientValidators';
import { createClient, getClientById, getInterests, updateClient } from '../services/clientService';
import { normalizeApiError } from '../../../core/api/errorNormalizer';
import { fileToBase64 } from '../../../shared/utils/file';

const emptyValues = {
  id: '',
  identification: '',
  firstName: '',
  lastName: '',
  gender: '',
  birthDate: '',
  affiliationDate: '',
  cellphone: '',
  otherPhone: '',
  address: '',
  reseña: '',
  imageBase64: '',
  imagePreview: '',
  imageFile: null,
  interestId: '',
};

export const ClientMaintenancePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();
  const session = useSession();
  const feedback = useFeedback();
  const isEditMode = Boolean(id);
  const [values, setValues] = useState(emptyValues);
  const [errors, setErrors] = useState({});
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingInterests, setLoadingInterests] = useState(true);
  const [saving, setSaving] = useState(false);
  const [pageError, setPageError] = useState('');

  useEffect(() => {
    let active = true;

    const bootstrap = async () => {
      setLoading(true);
      setLoadingInterests(true);
      setPageError('');
      try {
        const interestList = await getInterests();
        let clientDetails = null;
        if (isEditMode) {
          try {
            clientDetails = await getClientById(id);
          } catch (detailsError) {
            clientDetails = location.state || null;
            if (!clientDetails) {
              throw detailsError;
            }
          }
        }

        if (!active) return;
        setInterests(interestList);
        if (isEditMode) {
          const source = clientDetails || location.state || {};
          setValues({
            ...emptyValues,
            ...source,
            imagePreview: source.imageBase64 ? `data:image/*;base64,${source.imageBase64}` : '',
          });
        }
      } catch (apiError) {
        if (!active) return;
        setPageError(normalizeApiError(apiError));
      } finally {
        if (active) {
          setLoading(false);
          setLoadingInterests(false);
        }
      }
    };

    bootstrap();

    return () => {
      active = false;
    };
  }, [id, isEditMode, location.state]);

  const handleChange = async (field, value) => {
    if (field === 'imageFile') {
      if (!value) {
        setValues((current) => ({ ...current, imageFile: null, imageBase64: '', imagePreview: '' }));
        return;
      }

      const imageBase64 = await fileToBase64(value);
      setValues((current) => ({
        ...current,
        imageFile: value,
        imageBase64,
        imagePreview: `data:${value.type};base64,${imageBase64}`,
      }));
      return;
    }

    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = validateClientForm(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSaving(true);
    try {
      if (isEditMode) await updateClient(values, session.userId);
      else await createClient(values, session.userId);
      feedback.showSuccess(isEditMode ? 'Cliente actualizado correctamente.' : 'Cliente creado correctamente.');
      navigate(APP_ROUTES.CLIENTS, { replace: true });
    } catch (apiError) {
      feedback.showError(normalizeApiError(apiError));
    } finally {
      setSaving(false);
    }
  };

  const headerAvatar = (
    <Avatar
      src={values.imagePreview || undefined}
      alt={values.firstName ? `${values.firstName} ${values.lastName}` : APP_TEXT.CLIENT_MAINTENANCE_TITLE}
      sx={{
        width: 56,
        height: 56,
        bgcolor: values.imagePreview ? 'background.paper' : 'grey.100',
        color: 'text.secondary',
        border: '1px solid',
        borderColor: 'divider',
        flexShrink: 0,
        '& .MuiAvatar-img': {
          objectFit: 'cover',
        },
      }}
    >
      <PersonIcon sx={{ fontSize: 30 }} />
    </Avatar>
  );

  return (
    <DashboardLayout username={session.username} onLogout={session.logout}>
      <PageHeader
        leading={headerAvatar}
        title={APP_TEXT.CLIENT_MAINTENANCE_TITLE}
        subtitle={PAGE_HINTS.CLIENTS_MAINTENANCE}
        actions={
          <Stack direction="row" spacing={1.5}>
            <AppButton
              type="submit"
              form="client-maintenance-form"
              startIcon={<SaveIcon />}
              disabled={saving}
            >
              {APP_TEXT.SAVE}
            </AppButton>
            <AppButton
              variant="outlined"
              startIcon={<ArrowBackIcon />}
              onClick={() => navigate(APP_ROUTES.CLIENTS)}
            >
              {APP_TEXT.BACK}
            </AppButton>
          </Stack>
        }
      />

      {loading ? <AppLoader /> : null}
      {!loading && pageError ? <Alert severity="error">{pageError}</Alert> : null}
      {!loading && !pageError ? (
        <ClientForm
          formId="client-maintenance-form"
          values={values}
          errors={errors}
          interests={interests}
          loadingInterests={loadingInterests}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      ) : null}
    </DashboardLayout>
  );
};
