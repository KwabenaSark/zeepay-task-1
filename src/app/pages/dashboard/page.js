"use client";

import Link from "next/link";
import { Box, Button, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios"

export default function DashboardPage() {

  //use state
  const[statData,setStats] = useState([])

//fetch the stats data

const fetch = async()=>{
const res = await axios.get("/api/stat")
setStats(res.data)

}

useEffect(()=>{

  fetch()
})


  return (
    <Box sx={{ p: 4, maxWidth: 720, mx: "auto" }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
      4 tracked data
    </Typography>



    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>

{/* Total Applications */}
<Box
  sx={{
    flex: 1,
    minWidth: 140,
    p: 2.5,
    borderRadius: 3,
    bgcolor: "#f0f4ff",
    border: "1px solid #c7d7fc",
  }}
>
  <Typography variant="caption" fontWeight={600} color="#4a6cf7" sx={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>
    Total
  </Typography>
  <Typography variant="h4" fontWeight={800} color="#1a1a2e" sx={{ mt: 0.5 }}>
    {statData.totalApplications}
  </Typography>
  <Typography variant="body2" color="text.secondary">Applications</Typography>
</Box>

{/* Pending */}
<Box
  sx={{
    flex: 1,
    minWidth: 140,
    p: 2.5,
    borderRadius: 3,
    bgcolor: "#fffbea",
    border: "1px solid #f7d96c",
  }}
>
  <Typography variant="caption" fontWeight={600} color="#d4a017" sx={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>
    Pending
  </Typography>
  <Typography variant="h4" fontWeight={800} color="#1a1a2e" sx={{ mt: 0.5 }}>
    {statData.pending}
  </Typography>
  <Typography variant="body2" color="text.secondary">Awaiting response</Typography>
</Box>

{/* Interview */}
<Box
  sx={{
    flex: 1,
    minWidth: 140,
    p: 2.5,
    borderRadius: 3,
    bgcolor: "#fff4ec",
    border: "1px solid #f7b26c",
  }}
>
  <Typography variant="caption" fontWeight={600} color="#e07a2f" sx={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>
    Interview
  </Typography>
  <Typography variant="h4" fontWeight={800} color="#1a1a2e" sx={{ mt: 0.5 }}>
    {statData.interviews}
  </Typography>
  <Typography variant="body2" color="text.secondary">In progress</Typography>
</Box>

{/* Rejected */}
<Box
  sx={{
    flex: 1,
    minWidth: 140,
    p: 2.5,
    borderRadius: 3,
    bgcolor: "#fff0f0",
    border: "1px solid #f7a0a0",
  }}
>
  <Typography variant="caption" fontWeight={600} color="#d32f2f" sx={{ textTransform: "uppercase", letterSpacing: "0.05em" }}>
    Rejected
  </Typography>
  <Typography variant="h4" fontWeight={800} color="#1a1a2e" sx={{ mt: 0.5 }}>
    {statData.rejected}
  </Typography>
  <Typography variant="body2" color="text.secondary">Not selected</Typography>
</Box>

</Box>

      
    </Box>
  );
}
