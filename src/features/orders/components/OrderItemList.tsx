import { Box, Typography, Divider } from '@mui/material';
import { formatPrice } from '@/shared/utils/formatters';
import type { OrderItem } from '../orders.types';

interface OrderItemListProps {
  items: OrderItem[];
}

export function OrderItemList({ items }: OrderItemListProps) {
  return (
    <Box>
      {items.map((item, idx) => (
        <Box key={item._id}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, py: 1.5 }}>
            {item.image_url && (
              <Box sx={{ width: 56, height: 56, flexShrink: 0, border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
                <img src={item.image_url} alt={item.product_name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
              </Box>
            )}
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="body2" fontWeight={500}>{item.product_name}</Typography>
              <Typography variant="caption" color="text.secondary">
                {item.quantity} × {formatPrice(item.unit_price)}
              </Typography>
            </Box>
            <Typography variant="subtitle2" fontWeight={700}>{formatPrice(item.total_price)}</Typography>
          </Box>
          {idx < items.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );
}
