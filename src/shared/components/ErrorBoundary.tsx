import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Box, Typography, Button } from '@mui/material';
import i18n from '@/i18n';

interface Props { children: ReactNode; }
interface State { hasError: boolean; }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State { return { hasError: true }; }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('ErrorBoundary caught:', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h5" gutterBottom>{i18n.t('common:errors.something_went_wrong')}</Typography>
          <Button variant="contained" onClick={() => window.location.reload()}>
            {i18n.t('common:errors.reload_page')}
          </Button>
        </Box>
      );
    }
    return this.props.children;
  }
}
