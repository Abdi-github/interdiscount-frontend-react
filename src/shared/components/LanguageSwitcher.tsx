import { useState } from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import LanguageIcon from '@mui/icons-material/Language';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setLanguage } from '@/shared/state/uiSlice';
import type { AppLocale } from '@/shared/state/uiSlice';

const LOCALES: { code: AppLocale; label: string }[] = [
  { code: 'de', label: 'DE' },
  { code: 'fr', label: 'FR' },
  { code: 'it', label: 'IT' },
  { code: 'en', label: 'EN' },
];

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  const dispatch = useAppDispatch();
  const language = useAppSelector((s) => s.ui.language);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpen = (e: React.MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const handleSelect = (locale: AppLocale) => {
    dispatch(setLanguage(locale));
    i18n.changeLanguage(locale);
    handleClose();
  };

  return (
    <>
      <Button
        size="small"
        color="inherit"
        startIcon={<LanguageIcon fontSize="small" />}
        endIcon={<KeyboardArrowDownIcon fontSize="small" />}
        onClick={handleOpen}
        sx={{ minWidth: 0, textTransform: 'uppercase', fontWeight: 600 }}
      >
        {language}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {LOCALES.map((l) => (
          <MenuItem
            key={l.code}
            selected={l.code === language}
            onClick={() => handleSelect(l.code)}
            sx={{ minWidth: 80, fontWeight: l.code === language ? 700 : 400 }}
          >
            {l.label}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
