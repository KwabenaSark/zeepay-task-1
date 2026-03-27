"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import {
  Box,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  Fade,
  CircularProgress,
} from "@mui/material";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";

function PageLoader({ label }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        gap: 2,
        color: "text.secondary",
      }}
    >
      <CircularProgress size={36} thickness={3} />
      <Typography variant="body2">Loading {label}...</Typography>
    </Box>
  );
}

const Dashboard = dynamic(() => import("./pages/dashboard/page"), {
  loading: () => <PageLoader label="Dashboard" />,
  ssr: false,
});

const AddPage = dynamic(() => import("./pages/add/page"), {
  loading: () => <PageLoader label="Add" />,
  ssr: false,
});

const ListPage = dynamic(() => import("./pages/list/page"), {
  loading: () => <PageLoader label="List" />,
  ssr: false,
});

const NAV_ITEMS = [
  { id: "dashboard", label: "Home", icon: <DashboardIcon /> },
  {
    id: "add",
    label: "Add",
    icon: (
      <AddCircleIcon
        sx={{
          fontSize: 44,
          color: "primary.main",
          filter: "drop-shadow(0 2px 6px rgba(99,102,241,0.5))",
        }}
      />
    ),
    isMain: true,
  },
  { id: "list", label: "List", icon: <ListAltIcon /> },
];

export default function Home() {
  const [activePage, setActivePage] = useState("dashboard");

  const renderPage = () => {
    switch (activePage) {
      case "dashboard":
        return <Dashboard />;
      case "add":
        return <AddPage />;
      case "list":
        return <ListPage />;
    }
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pb: "100px" }}>
      {/* Page Content */}
      <Fade in key={activePage} timeout={300}>
        <Box>{renderPage()}</Box>
      </Fade>

      {/* Floating Dock */}
      <Paper
        elevation={8}
        sx={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          alignItems: "center",
          gap: 1,
          px: 3,
          py: 1.5,
          borderRadius: "999px",
          bgcolor: "background.paper",
          backdropFilter: "blur(12px)",
          border: "1px solid",
          borderColor: "divider",
          zIndex: 1300,
          boxShadow: "0 8px 32px rgba(0,0,0,0.18)",
        }}
      >
        {NAV_ITEMS.map((item) => (
          <Tooltip key={item.id} title={item.label} placement="top" arrow>
            <IconButton
              onClick={() => setActivePage(item.id)}
              disableRipple={item.isMain}
              sx={{
                flexDirection: "column",
                gap: 0.25,
                px: item.isMain ? 0.5 : 1.5,
                py: 0.5,
                borderRadius: "14px",
                transition: "all 0.18s ease",
                bgcolor:
                  activePage === item.id && !item.isMain
                    ? "action.selected"
                    : "transparent",
                "&:hover": {
                  bgcolor: item.isMain ? "transparent" : "action.hover",
                  transform: item.isMain ? "scale(1.1)" : "translateY(-2px)",
                },
              }}
            >
              <Box
                sx={{
                  color:
                    activePage === item.id ? "primary.main" : "text.secondary",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "color 0.18s ease",
                }}
              >
                {item.icon}
              </Box>
              {!item.isMain && (
                <Typography
                  variant="caption"
                  sx={{
                    fontSize: "0.6rem",
                    fontWeight: activePage === item.id ? 700 : 400,
                    color:
                      activePage === item.id ? "primary.main" : "text.disabled",
                    letterSpacing: "0.04em",
                    lineHeight: 1,
                  }}
                >
                  {item.label}
                </Typography>
              )}
            </IconButton>
          </Tooltip>
        ))}
      </Paper>
    </Box>
  );
}