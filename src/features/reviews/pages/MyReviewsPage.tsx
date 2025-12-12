import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Rating,
  IconButton,
  Chip,
  Pagination,
  CircularProgress,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RateReviewIcon from '@mui/icons-material/RateReview';
import { useTranslation } from 'react-i18next';
import { useSnackbar } from 'notistack';
import EmptyState from '@/shared/components/EmptyState';
// Note: MyReviewsPage - displaying user review history
// TODO: Implement review sorting by rating and date
import {
  useGetMyReviewsQuery,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} from '../reviews.api';
import { useLocaleNavigate } from '@/shared/hooks/useLocalePath';
import type { Review, UpdateReviewPayload, ReviewProduct } from '../reviews.types';

export default function MyReviewsPage() {
  const { t } = useTranslation('reviews');
  const navigate = useLocaleNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetMyReviewsQuery({ page, limit: 10 });
  const [updateReview, { isLoading: updating }] = useUpdateReviewMutation();
  const [deleteReview] = useDeleteReviewMutation();

  // Edit dialog state
  const [editReview, setEditReview] = useState<Review | null>(null);
  const [editForm, setEditForm] = useState({ rating: 5, title: '', comment: '' });

  // Delete confirmation
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const reviews = data?.data ?? [];

  const openEdit = (review: Review) => {
    setEditReview(review);
    setEditForm({ rating: review.rating, title: review.title, comment: review.comment });
  };

  const handleUpdate = async () => {
    if (!editReview) return;
    try {
      await updateReview({ id: editReview._id, ...editForm }).unwrap();
      enqueueSnackbar(t('my_reviews.updated'), { variant: 'success' });
      setEditReview(null);
    } catch {
      enqueueSnackbar(t('my_reviews.update_error'), { variant: 'error' });
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteReview(deleteId).unwrap();
      enqueueSnackbar(t('my_reviews.deleted'), { variant: 'success' });
      setDeleteId(null);
    } catch {
      enqueueSnackbar(t('my_reviews.delete_error'), { variant: 'error' });
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {t('my_reviews.title')}
      </Typography>

      {isLoading ? (
        <Box sx={{ textAlign: 'center', py: 6 }}><CircularProgress /></Box>
      ) : reviews.length === 0 ? (
        <EmptyState
          icon={<RateReviewIcon sx={{ fontSize: 64 }} />}
          title={t('my_reviews.empty_title')}
          subtitle={t('my_reviews.empty_subtitle')}
          action={t('my_reviews.browse_products')}
          onAction={() => navigate('/')}
        />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {reviews.map((review) => (
            <Paper
              key={review._id}
              elevation={0}
              variant="outlined"
              sx={{ p: 2.5, borderRadius: 2 }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box sx={{ flex: 1 }}>
                  {typeof review.product_id === 'object' && (
                    <Typography
                      variant="caption"
                      color="primary"
                      sx={{ cursor: 'pointer', '&:hover': { textDecoration: 'underline' } }}
                      onClick={() => navigate(`/products/${(review.product_id as ReviewProduct).slug}`)}
                    >
                      {(review.product_id as ReviewProduct).name}
                    </Typography>
                  )}
                  <Typography variant="subtitle2" fontWeight={600}>
                    {review.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                    <Rating value={review.rating} readOnly size="small" />
                    <Chip
                      label={review.is_approved ? t('my_reviews.approved') : t('my_reviews.pending')}
                      color={review.is_approved ? 'success' : 'warning'}
                      size="small"
                    />
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  <Tooltip title={t('my_reviews.edit')}>
                    <IconButton size="small" onClick={() => openEdit(review)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={t('my_reviews.delete')}>
                    <IconButton size="small" color="error" onClick={() => setDeleteId(review._id)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>
              {review.comment && (
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {review.comment}
                </Typography>
              )}
              <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                {new Date(review.created_at).toLocaleDateString()}
              </Typography>
            </Paper>
          ))}

          {(data?.pagination?.total_pages ?? 1) > 1 && (
            <Pagination
              count={data?.pagination?.total_pages}
              page={page}
              onChange={(_, v) => setPage(v)}
              color="primary"
              sx={{ mx: 'auto', mt: 2 }}
            />
          )}
        </Box>
      )}

      {/* Edit dialog */}
      <Dialog open={!!editReview} onClose={() => setEditReview(null)} maxWidth="sm" fullWidth>
        <DialogTitle>{t('my_reviews.edit_title')}</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 1 }}>
            <Typography variant="body2" gutterBottom>{t('form.rating_label')}</Typography>
            <Rating
              value={editForm.rating}
              onChange={(_, v) => setEditForm((f) => ({ ...f, rating: v ?? 1 }))}
              size="large"
            />
            <TextField
              fullWidth
              size="small"
              label={t('form.title_label')}
              value={editForm.title}
              onChange={(e) => setEditForm((f) => ({ ...f, title: e.target.value }))}
              sx={{ mt: 2 }}
            />
            <TextField
              fullWidth
              size="small"
              multiline
              rows={3}
              label={t('form.body_label')}
              value={editForm.comment}
              onChange={(e) => setEditForm((f) => ({ ...f, comment: e.target.value }))}
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditReview(null)}>{t('my_reviews.cancel')}</Button>
          <Button variant="contained" onClick={handleUpdate} disabled={updating}>
            {t('my_reviews.save')}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete confirmation */}
      <Dialog open={!!deleteId} onClose={() => setDeleteId(null)}>
        <DialogTitle>{t('my_reviews.delete_title')}</DialogTitle>
        <DialogContent>
          <Typography>{t('my_reviews.delete_confirm')}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteId(null)}>{t('my_reviews.cancel')}</Button>
          <Button variant="contained" color="error" onClick={handleDelete}>
            {t('my_reviews.delete')}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
