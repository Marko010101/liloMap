import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Box, IconButton, Paper } from '@mui/material';
import { useMemo, useState } from 'react';
import AreaRangeFilter from './AreaRangeFilter';
import HeaderLogo from './HeaderLogo';
import SectionSelector from './SectionSelector';
import LeasingDebtLayer from './ui/LeasingDebtLayer';
import ClearFilter from './ui/ClearFilter';
import SearchField from './ui/SearchField';

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const sidebarWidth = '335px';
  const handleOffset = 13;

  const sidebarWidthNum = parseInt(sidebarWidth, 10);

  const translateX = useMemo(
    () => (open ? 0 : -(sidebarWidthNum - handleOffset)),
    [open, sidebarWidthNum],
  );

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        width: sidebarWidth,
        transform: `translateX(${translateX}px)`,
        transition: 'transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
        pointerEvents: 'none',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          height: '100%',
          width: '100%',
          borderTopLeftRadius: '20px',
          borderBottomLeftRadius: '20px',
          bgcolor: 'oklch(96.7% 0.003 264.542)',
          pointerEvents: open ? 'auto' : 'none',
          position: 'relative',
        }}
      >
        <aside className="flex h-screen w-max shrink-0 flex-col items-center gap-5 border-r border-gray-200 bg-white/70 px-8 py-4 backdrop-blur">
          <HeaderLogo />
          <ClearFilter />
          <AreaRangeFilter />
          <SectionSelector />
          <LeasingDebtLayer />

          {/* <SearchField /> */}
        </aside>
      </Paper>

      <IconButton
        aria-label={open ? 'Close sidebar' : 'Open sidebar'}
        onClick={() => setOpen((v) => !v)}
        sx={{
          position: 'absolute',
          top: '50%',
          right: -20,
          transform: 'translateY(-50%)',
          bgcolor: 'background.paper',
          boxShadow: 2,
          border: '1px solid',
          borderColor: 'divider',
          width: 36,
          height: 36,
          '&:hover': { bgcolor: 'background.paper' },
          pointerEvents: 'auto',
          zIndex: (theme) => theme.zIndex.drawer + 2,
        }}
      >
        {open ? <ChevronLeft /> : <ChevronRight />}
      </IconButton>
    </Box>
  );
};

export default Sidebar;
