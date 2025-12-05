import { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Button,
  TextField,
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import { useTranslation } from 'react-i18next';
import {
  useGetPaymentStatusQuery,
  useInitiatePaymentMutation,
  useSimulatePaymentMutation,
  useConfirmInvoicePaymentMutation,
} from '../payments.api';
import type { PaymentStatus } from '../payments.types';

interface PaymentProcessingProps {
  orderId: string;
  paymentMethod: string;
}

const statusColorMap: Record<string, 'default' | 'warning' | 'info' | 'success' | 'error'> = {
  PENDING: 'warning',
  PROCESSING: 'info',
  SUCCEEDED: 'success',
  FAILED: 'error',
  REFUNDED: 'default',
  CANCELLED: 'error',
  NO_PAYMENT: 'default',
};

const statusIconMap: Record<string, React.ReactNode> = {
  PENDING: <HourglassEmptyIcon fontSize="small" />,
  PROCESSING: <CircularProgress size={14} />,
  SUCCEEDED: <CheckCircleIcon fontSize="small" />,
  FAILED: <ErrorIcon fontSize="small" />,
};

export default function PaymentProcessing({ orderId, paymentMethod }: PaymentProcessingProps) {
  const { t } = useTranslation('checkout');
  const [transferNumber, setTransferNumber] = useState('');
  const [error, setError] = useState<string | null>(null);

  const { data: paymentData, isLoading: statusLoading } = useGetPaymentStatusQuery(orderId);
  const [initiatePayment, { isLoading: initiating }] = useInitiatePaymentMutation();
  const [simulatePayment, { isLoading: simulating }] = useSimulatePaymentMutation();
  const [confirmInvoice, { isLoading: confirming }] = useConfirmInvoicePaymentMutation();

  const paymentStatus = (paymentData?.data as { status: PaymentStatus })?.status ?? 'NO_PAYMENT';

  const handleInitiate = async () => {
    setError(null);
    try {
      await initiatePayment(orderId).unwrap();
    } catch {
      setError(t('payment.error_initiate'));
    }
  };

  const handleSimulate = async () => {
    setError(null);
    try {
      await simulatePayment(orderId).unwrap();
    } catch {
      setError(t('payment.error_simulate'));
    }
  };

  const handleInvoiceConfirm = async () => {
    setError(null);
    if (!transferNumber.trim()) return;
    try {
      await confirmInvoice({ orderId, transfer_number: transferNumber }).unwrap();
    } catch {
      setError(t('payment.error_invoice'));
    }
  };

  if (statusLoading) {
    return (
      <Box sx={{ textAlign: 'center', py: 3 }}>
        <CircularProgress size={24} />
      </Box>
    );
  }

  return (
    <Paper variant="outlined" sx={{ p: 3, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <PaymentIcon color="primary" />
        <Typography variant="subtitle1" fontWeight={700}>
          {t('payment.title')}
        </Typography>
        <Chip
          label={t(`payment.status.${paymentStatus.toLowerCase()}`)}
          color={statusColorMap[paymentStatus] ?? 'default'}
          size="small"
          icon={statusIconMap[paymentStatus] as React.ReactElement | undefined}
        />
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

      {paymentStatus === 'SUCCEEDED' && (
        <Alert severity="success" icon={<CheckCircleIcon />}>
          {t('payment.success_message')}
        </Alert>
      )}

      {paymentStatus === 'FAILED' && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {t('payment.failed_message')}
        </Alert>
      )}

      {/* No payment initiated yet */}
      {(paymentStatus === 'NO_PAYMENT' || paymentStatus === 'PENDING') &&
        paymentMethod !== 'invoice' && (
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant="contained"
              onClick={handleInitiate}
              disabled={initiating}
              startIcon={initiating ? <CircularProgress size={16} /> : <PaymentIcon />}
            >
              {t('payment.pay_now')}
            </Button>
            {/* Dev only: simulate button */}
            <Button
              variant="outlined"
              color="success"
              onClick={handleSimulate}
              disabled={simulating}
              size="small"
            >
              {simulating ? <CircularProgress size={16} /> : t('payment.simulate')}
            </Button>
          </Box>
        )}

      {/* Invoice payment */}
      {paymentMethod === 'invoice' && paymentStatus !== 'SUCCEEDED' && paymentStatus !== 'PROCESSING' && (
        <Box>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {t('payment.invoice_instructions')}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'flex-start' }}>
            <TextField
              size="small"
              label={t('payment.transfer_number')}
              value={transferNumber}
              onChange={(e) => setTransferNumber(e.target.value)}
              sx={{ flex: 1 }}
            />
            <Button
              variant="contained"
              onClick={handleInvoiceConfirm}
              disabled={confirming || !transferNumber.trim()}
            >
              {confirming ? <CircularProgress size={16} /> : t('payment.confirm_transfer')}
            </Button>
          </Box>
        </Box>
      )}

      {paymentStatus === 'PROCESSING' && paymentMethod === 'invoice' && (
        <Alert severity="info">{t('payment.invoice_processing')}</Alert>
      )}
    </Paper>
  );
}
