"use client";

import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from "@mui/material";



//status option
const STATUS_OPTIONS = ["Applied", "Pending", "Interview", "Offered", "Rejected"];

export default function AddPage() {

  //use sate to campture the form
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    status: "",
    jobLink: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  //storing the form value
  const handleChange = async(event)=> {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  ////submit function
  const handleSubmit= async(event) => {
    event.preventDefault();
    setLoading(true);
    setError("");
    try {
      await axios.post("/api/items", formData);
      setSubmitted(true);
      setFormData({ companyName: "", jobTitle: "", status: "", jobLink: "" });
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{ p: 4, maxWidth: 520, mx: "auto" }}>
      <Typography variant="h4" fontWeight={700} gutterBottom>
        Add Application
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Fill in the details and submit.
      </Typography>

      <Box component="form" onSubmit={handleSubmit}>
        <Stack spacing={2.5}>
          <TextField
            label="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Job Title"
            name="jobTitle"
            value={formData.jobTitle}
            onChange={handleChange}
            required
            fullWidth
          />
          <TextField
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            fullWidth
            select
          >
            {STATUS_OPTIONS.map((opt) => (
              <MenuItem key={opt} value={opt}>
                {opt}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            label="Job Link"
            name="jobLink"
            value={formData.jobLink}
            onChange={handleChange}
            fullWidth
            placeholder="https://..."
          />

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{ py: 1.5, fontWeight: 600, borderRadius: 2 }}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </Stack>
      </Box>

      {submitted && (
        <Typography sx={{ mt: 2, color: "success.main", fontWeight: 600 }}>
          ✓ Application added successfully!
        </Typography>
      )}
      {error && (
        <Typography sx={{ mt: 2, color: "error.main" }}>{error}</Typography>
      )}
    </Box>
  );
}