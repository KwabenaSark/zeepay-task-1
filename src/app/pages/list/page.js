"use client";

import Link from "next/link";
import {
  Box,
  Paper,
  List,
  ListItem,
  IconButton,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Stack,
} from "@mui/material";
import axios from "axios"
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";


  
export default function ListPage() {

//Use states to collect fetched data
const [fetched,setFetched] = useState([])





//fetch data function

const fetch = async()=>{

const res = await axios.get("/api/items")
setFetched(res.data)


}



// Delete function
const handleDelete = async(id)=>{


  await axios.delete('/api/items',{data:{id}});
  fetch()

}




// Selected row for details popup
const [selectedId, setSelectedId] = useState(null);


//selecting only the selected function from the fetched data
const selectedItem = selectedId
  ? fetched.find((item) => item.id === selectedId)
  : null;

const closePopup = () => setSelectedId(null);

useEffect(()=>{
  fetch()
})



return (
  <Box sx={{ p: 4, maxWidth: 720, mx: "auto" }}>
    <Typography variant="h4" fontWeight={700} gutterBottom>
      Job Applications List
    </Typography>

    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
      {fetched.length} application{fetched.length !== 1 ? "s" : ""} tracked
    </Typography>

    <List disablePadding>
      {fetched.map((item, index) => {
        const statusConfig = {
          Applied: { color: "#1976d2", bg: "#e3f2fd", label: "Applied" },
          Interview: { color: "#f57c00", bg: "#fff3e0", label: "Interview" },
          Offered: { color: "#388e3c", bg: "#e8f5e9", label: "Offered" },
          Rejected: { color: "#d32f2f", bg: "#ffebee", label: "Rejected" },
          Pending: { color: "#f9a825", bg: "#fffde7", label: "Pending" },
        };

        const status = statusConfig[item.status] ?? {
          color: "#757575",
          bg: "#f5f5f5",
          label: item.status,
        };

        return (
          <Paper
            key={item.id}
            elevation={0}
            onClick={()=> setSelectedId(item.id)}
            sx={{
              mb: 1.5,
              borderRadius: 3,
              border: "1px solid",
              borderColor: "rgba(0,0,0,0.08)",
              overflow: "hidden",
              transition: "box-shadow 0.2s ease",
              "&:hover": {
                boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
              },
            }}
          >
            <ListItem
              sx={{ py: 2, px: 2.5 }}
              secondaryAction={
                <IconButton
                  edge="end"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(item.id);
                  }}
                  sx={{
                    color: "text.disabled",
                    "&:hover": { color: "error.main", bgcolor: "#ffebee" },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              }
            >
              {/* Number badge */}
              <Box
                sx={{
                  minWidth: 32,
                  height: 32,
                  borderRadius: "50%",
                  bgcolor: "#f0f0f0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  mr: 2,
                  flexShrink: 0,
                }}
              >
                <Typography variant="caption" fontWeight={700} color="text.secondary">
                  {index + 1}
                </Typography>
              </Box>

              {/* Company + Job Title */}
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                  variant="subtitle1"
                  fontWeight={600}
                  noWrap
                  sx={{ lineHeight: 1.3 }}
                >
                  {item.companyName}
                </Typography>
                <Typography variant="body2" color="text.secondary" noWrap>
                  {item.jobTitle}
                </Typography>
              </Box>

              {/* Status chip */}
              <Box
                sx={{
                  ml: 2,
                  mr: 1,
                  px: 1.5,
                  py: 0.4,
                  borderRadius: "999px",
                  bgcolor: status.bg,
                  border: "1px solid",
                  borderColor: status.color + "40",
                  flexShrink: 0,
                }}
              >
                <Typography
                  variant="caption"
                  fontWeight={700}
                  sx={{ color: status.color, letterSpacing: "0.03em" }}
                >
                  {status.label}
                </Typography>
              </Box>
            </ListItem>
          </Paper>
        );
      })}
    </List>






{/* Details page */}
    <Dialog open={Boolean(selectedId)} onClose={closePopup} maxWidth="lg" sx={{
    "& .MuiDialog-paper": {
      height: "100vh",
      margin: 0,
    },
  }} fullWidth>
      <DialogTitle>Application details</DialogTitle>
      <DialogContent dividers>
        {selectedItem ? (
          <Stack spacing={1}>
            <Typography>
              <strong>Company:</strong> {selectedItem.companyName}
            </Typography>
            <Typography>
              <strong>Role:</strong> {selectedItem.jobTitle}
            </Typography>
            <Typography>
              <strong>Status:</strong> {selectedItem.status}
            </Typography>
            <Typography>
              <strong>Status:</strong> {selectedItem.dateApplied}
            </Typography>
            <Typography>
              <strong>Status:</strong> {selectedItem.jobLink}
            </Typography>
          </Stack>
        ) : (
          <Typography color="text.secondary">No item selected.</Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={closePopup} variant="contained">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  </Box>
);
}