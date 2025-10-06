// SpaceInfoDrawer.tsx
import CloseIcon from '@mui/icons-material/Close';
import { ClickAwayListener, IconButton, Paper } from '@mui/material';
import { useEffect } from 'react';
import { useSelectedSpace } from '../context/SelectedSpaceContext';

export function SpaceInfoDrawer() {
  const { selectedSpace, clearSelectedSpace } = useSelectedSpace();
  const open = !!selectedSpace;

  // Close on Esc
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') clearSelectedSpace();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, clearSelectedSpace]);

  if (!open) return null;

  return (
    <ClickAwayListener
      onClickAway={(e) => {
        const mapRoot = document.getElementById('map-root');
        if (mapRoot && e.target instanceof Node && mapRoot.contains(e.target))
          return;
        clearSelectedSpace();
      }}
    >
      <Paper
        elevation={3}
        sx={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: 320,
          height: '100vh',
          borderTopLeftRadius: '20px',
          borderBottomLeftRadius: '20px',
          bgcolor: 'oklch(96.7% 0.003 264.542)',
          zIndex: (theme) => theme.zIndex.drawer,
          pointerEvents: 'none',
        }}
      >
        <div className="h-screen p-5" style={{ pointerEvents: 'auto' }}>
          <div className="flex items-center justify-between px-0 py-2">
            <h2 className="text-lg font-semibold">ინფორმაცია</h2>
            <IconButton size="small" onClick={clearSelectedSpace}>
              <CloseIcon />
            </IconButton>
          </div>

          <ul className="mt-3 flex w-max flex-col gap-6 px-5 text-sm">
            <div className="flex flex-col items-center justify-center gap-3">
              <li>
                <b>მფლობელი:</b> {selectedSpace!['owner']}
              </li>
              <img
                className="rounded-full bg-cover"
                src={selectedSpace!.image}
                alt={selectedSpace!['owner']}
              />
            </div>
            <div className="flex flex-col gap-2">
              <li>
                <b>ID:</b> {selectedSpace!['id']}
              </li>
              <li>
                <b>იჯარის ღირებულება:</b> {selectedSpace!['leasingCost']} ₾
              </li>
              <li>
                <b>ელექტროობის გადასახადი:</b>{' '}
                {selectedSpace!['electricityBill']} ₾
              </li>
              <li>
                <b>იჯარის დავალიანება:</b> {selectedSpace!['leasingDebt']} ₾
              </li>
              <li>
                <b>ფართობი:</b> {selectedSpace!['area']} მ²
              </li>
            </div>
          </ul>
        </div>
      </Paper>
    </ClickAwayListener>
  );
}
