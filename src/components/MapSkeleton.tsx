// src/components/MapSkeleton.tsx
import { Box, Paper, Skeleton, Stack } from '@mui/material';

const SIDEBAR_WIDTH = 340;

export default function MapSkeleton() {
  return (
    <div className="relative h-screen w-screen overflow-hidden bg-gray-100">
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: `${SIDEBAR_WIDTH}px`,
          zIndex: (t) => t.zIndex.drawer + 1,
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
            bgcolor: 'rgba(255,255,255,0.7)',
            backdropFilter: 'blur(6px)',
            px: 3,
            py: 2,
          }}
        >
          {/* Logo */}
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 1 }}>
            <Skeleton variant="rounded" width={140} height={36} />
          </Box>

          {/* Filters block */}
          <Stack spacing={2} sx={{ mt: 2 }}>
            <Skeleton variant="rounded" height={36} />
            <Skeleton variant="rounded" height={36} />
            <Skeleton variant="rounded" height={36} />
            <Skeleton variant="rounded" height={48} />
          </Stack>

          {/* Divider-ish block */}
          <Skeleton variant="rounded" height={1} sx={{ my: 3 }} />

          {/* Extra content placeholders */}
          <Stack spacing={2}>
            <Skeleton variant="text" width="60%" height={28} />
            <Skeleton variant="rounded" height={80} />
            <Skeleton variant="rounded" height={80} />
          </Stack>
        </Paper>

        {/* Sidebar handle button placeholder */}
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            right: -20,
            transform: 'translateY(-50%)',
          }}
        >
          <Skeleton variant="circular" width={36} height={36} />
        </Box>
      </Box>

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          p: 0,
        }}
      >
        <Box
          sx={{
            height: '100%',
            width: '100%',
            borderTopLeftRadius: 24,
            borderBottomLeftRadius: 24,
            overflow: 'hidden',
          }}
        >
          <Skeleton variant="rounded" width="100%" height="100%" />
        </Box>
      </Box>
    </div>
  );
}
