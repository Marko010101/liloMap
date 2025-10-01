import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";

export default function MapSkeleton() {
  return (
    <div className="flex h-full flex-col gap-4 bg-gray-100">
      <header className="px-4 pt-4">
        <Box sx={{ display: "flex", justifyContent: "center", mb: 1 }}>
          <Skeleton variant="text" width={140} height={28} />
        </Box>

        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          sx={{ px: 1, mb: 1 }}
        >
          <Skeleton variant="rounded" width={120} height={32} />
          <Skeleton variant="rounded" width={360} height={36} />
          <Skeleton variant="rounded" width={120} height={32} />
        </Stack>

        <Skeleton variant="rounded" height={60} sx={{ mx: 1 }} />
      </header>
      <Box
        sx={{
          height: "70vh",
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          overflow: "hidden",
          mx: 0,
        }}
      >
        <Skeleton variant="rounded" width="100%" height="100%" />
      </Box>
    </div>
  );
}
