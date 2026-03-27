"use client";

import Link from "next/link";
import { Box, Button, Stack, Typography } from "@mui/material";

export default function DetailPage() {
  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Detail Page
      </Typography>
      <Typography sx={{ mb: 2 }}>
        This is a sample detail view for your Next.js app.
      </Typography>
      <Stack direction="row" spacing={2}>
        <Button component={Link} href="/" variant="contained">
          Back Home
        </Button>
        <Button component={Link} href="/add" variant="outlined">
          Go to Add
        </Button>
      </Stack>
    </Box>
  );
}
