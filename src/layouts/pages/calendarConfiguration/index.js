import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

export default function CalendarConfiguration() {
  const { calendarId } = useParams();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Typography variant="h6">This is Calendar Configuration {calendarId}</Typography>
    </Box>
  );
}
