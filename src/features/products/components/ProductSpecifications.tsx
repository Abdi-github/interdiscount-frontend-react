import { Box, Typography, Table, TableBody, TableRow, TableCell, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { Product } from '../products.types';

interface ProductSpecificationsProps {
  product: Product;
}

export function ProductSpecifications({ product }: ProductSpecificationsProps) {
  const specs = product.specification;
  const description = product.description;
  const hasSpecs = specs && Object.keys(specs).length > 0;

  if (!description && !hasSpecs) return null;

  return (
    <Box sx={{ mt: 3 }}>
      {description && (
        <Accordion defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={600}>Beschreibung</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
              {description}
            </Typography>
          </AccordionDetails>
        </Accordion>
      )}

      {hasSpecs && (
        <Accordion defaultExpanded disableGutters>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight={600}>Technische Daten</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ p: 0 }}>
            <Table size="small">
              <TableBody>
                {Object.entries(specs).map(([key, value]) => (
                  <TableRow key={key} sx={{ '&:nth-of-type(odd)': { bgcolor: 'action.hover' } }}>
                    <TableCell sx={{ fontWeight: 600, width: '40%', borderBottom: 0 }}>{key}</TableCell>
                    <TableCell sx={{ borderBottom: 0 }}>{String(value)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionDetails>
        </Accordion>
      )}
    </Box>
  );
}
