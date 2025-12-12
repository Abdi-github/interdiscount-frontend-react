import { IconButton, CircularProgress } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useGetFavoritesQuery, useAddFavoriteMutation, useRemoveFavoriteMutation } from '../favorites.api';

interface FavoriteButtonProps {
  productId: string;
}

export function FavoriteButton({ productId }: FavoriteButtonProps) {
  const { data } = useGetFavoritesQuery();
  const [add, { isLoading: isAdding }] = useAddFavoriteMutation();
  const [remove, { isLoading: isRemoving }] = useRemoveFavoriteMutation();

  const isFav = data?.data?.some((f) => f.product_id === productId) ?? false;
  const isLoading = isAdding || isRemoving;

  const toggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFav) {
      const fav = data?.data?.find((f) => f.product_id === productId);
      if (fav) remove(fav._id);
    } else {
      add(productId);
    }
  };

  return (
    <IconButton size="small" onClick={toggle} disabled={isLoading} aria-label="Favorit">
      {isLoading ? (
        <CircularProgress size={18} />
      ) : isFav ? (
        <FavoriteIcon fontSize="small" color="error" />
      ) : (
        <FavoriteBorderIcon fontSize="small" />
      )}
    </IconButton>
  );
}
