import { useState, useCallback, useRef, useEffect } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { styled, alpha } from '@mui/material/styles';
import { useLocaleNavigate } from '@/shared/hooks/useLocalePath';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { useSearchSuggestionsQuery } from '../search.api';
import { useTranslation } from 'react-i18next';
import ClickAwayListener from '@mui/material/ClickAwayListener';

const SearchBar = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#fff',
  border: '1.5px solid #d0d0d0',
  '&:focus-within': {
    borderColor: theme.palette.primary.main,
    boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.15)}`,
  },
  flexGrow: 1,
  maxWidth: 640,
  display: 'flex',
  alignItems: 'center',
  [theme.breakpoints.down('sm')]: { display: 'none' },
}));

const StyledInputBase = styled(InputBase)(() => ({
  color: '#212121',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: '9px 12px 9px 44px',
    fontSize: '0.9rem',
  },
}));

export default function SearchAutocomplete() {
  const { t } = useTranslation('common');
  const navigate = useLocaleNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const debouncedValue = useDebounce(searchValue, 300);
  const inputRef = useRef<HTMLInputElement>(null);

  const shouldFetch = debouncedValue.trim().length >= 2;
  const { data, isFetching } = useSearchSuggestionsQuery(debouncedValue.trim(), {
    skip: !shouldFetch,
  });

  const suggestions = data?.data?.suggestions ?? [];

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const query = searchValue.trim();
      if (query) {
        navigate(`/search?q=${encodeURIComponent(query)}`);
        setSearchValue('');
        setOpen(false);
        inputRef.current?.blur();
      }
    },
    [searchValue, navigate],
  );

  const handleSelect = useCallback(
    (suggestion: string) => {
      navigate(`/search?q=${encodeURIComponent(suggestion)}`);
      setSearchValue('');
      setOpen(false);
      inputRef.current?.blur();
    },
    [navigate],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!open || suggestions.length === 0) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
      } else if (e.key === 'Enter' && selectedIndex >= 0) {
        e.preventDefault();
        handleSelect(suggestions[selectedIndex]);
      } else if (e.key === 'Escape') {
        setOpen(false);
        setSelectedIndex(-1);
      }
    },
    [open, suggestions, selectedIndex, handleSelect],
  );

  // Reset selection when suggestions change
  useEffect(() => {
    setSelectedIndex(-1);
  }, [suggestions]);

  const showDropdown = open && (suggestions.length > 0 || isFetching);

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center', mx: { xs: 1, md: 3 }, position: 'relative' }}
      >
        <SearchBar>
          <Box
            sx={{
              position: 'absolute',
              left: 12,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              color: 'text.secondary',
            }}
          >
            <SearchIcon fontSize="small" />
          </Box>
          <StyledInputBase
            placeholder={t('search_placeholder')}
            value={searchValue}
            onChange={(e) => {
              setSearchValue(e.target.value);
              setOpen(true);
            }}
            onFocus={() => {
              if (searchValue.trim().length >= 2) setOpen(true);
            }}
            onKeyDown={handleKeyDown}
            inputRef={inputRef}
            inputProps={{ 'aria-label': 'search', autoComplete: 'off' }}
          />
          {isFetching && (
            <CircularProgress size={18} sx={{ mr: 1 }} />
          )}
          <IconButton type="submit" size="small" sx={{ mr: 0.5 }}>
            <SearchIcon fontSize="small" />
          </IconButton>
        </SearchBar>

        {/* Suggestions dropdown */}
        {showDropdown && (
          <Paper
            elevation={6}
            sx={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              mt: 0.5,
              zIndex: 1300,
              maxHeight: 360,
              overflow: 'auto',
              borderRadius: 1,
            }}
          >
            <List dense disablePadding>
              {suggestions.map((suggestion, index) => (
                <ListItemButton
                  key={suggestion}
                  selected={index === selectedIndex}
                  onClick={() => handleSelect(suggestion)}
                  sx={{ py: 1 }}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    {debouncedValue.trim().length >= 2 ? (
                      <SearchIcon fontSize="small" color="action" />
                    ) : (
                      <HistoryIcon fontSize="small" color="action" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={suggestion}
                    primaryTypographyProps={{ variant: 'body2', noWrap: true }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        )}
      </Box>
    </ClickAwayListener>
  );
}
