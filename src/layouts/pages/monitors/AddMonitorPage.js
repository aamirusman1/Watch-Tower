import React, { useState } from "react";
import PropTypes from "prop-types"; // Import PropTypes for validation
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import MDButton from "components/MDButton";
import { InputAdornment } from "@mui/material";
import { ArrowDropDown } from "@mui/icons-material";

function AddMonitorPage({ onAddMonitor }) {
  const [open, setOpen] = useState(false);
  const [auditSystemName, setAuditSystemName] = useState("");
  const [auditDescription, setAuditDescription] = useState("");
  const [measure, setMeasure] = useState("");
  const [measureFieldPath, setMeasureFieldPath] = useState("");
  const [identityFieldPath, setIdentityFieldPath] = useState("");
  const [chronoFieldPath, setChronoFieldPath] = useState("");
  const [chronoFieldFormat, setChronoFieldFormat] = useState("");

  const handleSave = async () => {
    if (!auditSystemName || !auditDescription || !measure || !measureFieldPath) {
      alert("Please fill in all fields.");
      return;
    }

    const newMonitor = {
      auditSystemName,
      auditDescription,
      measure,
      measureFieldPath,
      identityFieldPath,
      chronoFieldPath,
      chronoFieldFormat,
    };

    try {
      const response = await fetch(
        "http://localhost:5555/rad/BInRestInterface.restful.provider:monitor/feed/monitor",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newMonitor),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert("Monitor added successfully!");

        // Call the parent callback to update the table (optional)
        onAddMonitor(result);

        // Reset form and close dialog
        handleReset();
        setOpen(false);
      } else {
        const errorText = await response.text();
        alert(`Failed to add monitor. Error: ${errorText}`);
      }
    } catch (error) {
      console.error("Error adding monitor:", error);
      alert("An error occurred while adding the monitor. Please try again.");
    }
  };
  const handleReset = () => {
    setAuditSystemName("");
    setAuditDescription("");
    setMeasure("");
    setMeasureFieldPath("");
    setIdentityFieldPath("");
    setChronoFieldPath("");
    setChronoFieldFormat("");
  };

  return (
    <div>
      <MDButton variant="contained" color="info" onClick={() => setOpen(true)}>
        Add Monitor
      </MDButton>
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add Monitor</DialogTitle>
        <DialogContent>
          <TextField
            label="Monitor Name"
            fullWidth
            margin="normal"
            value={auditSystemName}
            onChange={(e) => setAuditSystemName(e.target.value)}
          />
          <TextField
            label="Monitor Description"
            fullWidth
            margin="normal"
            value={auditDescription}
            onChange={(e) => setAuditDescription(e.target.value)}
          />
          <TextField
            label="Measure"
            fullWidth
            margin="normal"
            select
            value={measure}
            onChange={(e) => setMeasure(e.target.value)}
          >
            <MenuItem value="TRANSACTION">TRANSACTION</MenuItem>
            <MenuItem value="IDENTITY">IDENTITY</MenuItem>
            <MenuItem value="VALUE">VALUE</MenuItem>
          </TextField>
          <TextField
            label="Measure Field Path"
            fullWidth
            margin="normal"
            value={measureFieldPath}
            onChange={(e) => setMeasureFieldPath(e.target.value)}
          />
          <TextField
            label="Identity Field Path"
            fullWidth
            margin="normal"
            value={identityFieldPath}
            onChange={(e) => setIdentityFieldPath(e.target.value)}
          />
          <TextField
            label="Chrono Field Path"
            fullWidth
            margin="normal"
            value={chronoFieldPath}
            onChange={(e) => setChronoFieldPath(e.target.value)}
          />
          <TextField
            label="Chrono Field Format"
            fullWidth
            margin="normal"
            value={chronoFieldFormat}
            onChange={(e) => setChronoFieldFormat(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleSave} color="info" variant="contained">
            Save
          </MDButton>
          <MDButton onClick={handleReset} color="secondary" variant="outlined">
            Reset
          </MDButton>
          <MDButton onClick={() => setOpen(false)} color="error" variant="outlined">
            Cancel
          </MDButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}

// PropTypes validation
AddMonitorPage.propTypes = {
  onAddMonitor: PropTypes.func.isRequired, // Ensure onAddMonitor is passed as a required function
};

export default AddMonitorPage;
