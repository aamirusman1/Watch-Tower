import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTableNoPag";

//Material Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ArrowUpward } from "@mui/icons-material";
import SettingsIcon from "@mui/icons-material/Settings";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EmailIcon from "@mui/icons-material/Email";
import SmsIcon from "@mui/icons-material/Sms";

import Tooltip from "@mui/material/Tooltip";

import { Link } from "react-router-dom";

function Calendar() {
  // State to store the data from the API
  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "Calendar Name", accessor: "calandarName" },
      { Header: "Calendar Time Zone", accessor: "calandarTimeZone" },
      { Header: "Actions", accessor: "actions" },
    ],
    rows: [],
  });

  // State for modal visibility and content
  //const [open, setOpen] = useState(false);
  //const [modalContent, setModalContent] = useState("");

  // State for adding a new template
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newCalendar, setNewCalendar] = useState({
    calandarName: "",
    calandarTimeZone: "",
  });

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      const basicAuth = "Basic " + btoa("Administrator:manageaudit");
      try {
        const response = await fetch(
          "http://172.20.150.134:5555/restv2/BInRestInterface.restful.provider:ui/calendar/all",
          {
            headers: {
              Authorization: basicAuth,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        const rows =
          data.allCalandars?.map((calendar) => ({
            calandarName: calendar.calandarName,
            calandarTimeZone: calendar.calandarTimeZone,
            actions: (
              <>
                <EditIcon color="info" style={{ cursor: "pointer" }} />
                {/* <DeleteIcon></DeleteIcon> */}
                <DeleteIcon style={{ cursor: "pointer", color: "red" }} />
              </>
            ),
          })) || [];

        setDataTableData((prevData) => ({
          ...prevData,
          rows: rows,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle opening and closing the add modal
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  // Function to handle input changes in the add modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCalendar((prev) => ({ ...prev, [name]: value }));
  };

  // Function to reset the form
  const handleReset = () => {
    setNewCalendar({
      calandarName: "",
      calandarTimeZone: "",
    });
  };

  // Function to save the new user calendar
  const handleSave = async () => {
    const basicAuth = "Basic " + btoa("Administrator:manageaudit");
    try {
      const response = await fetch(
        "http://172.20.150.134:5555/restv2/BInRestInterface.restful.provider:ui/calendar/insert",
        {
          method: "POST",
          headers: {
            Authorization: basicAuth,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newCalendar),
        }
      );

      if (response.ok) {
        alert("User Calendar saved successfully!");
        handleCloseAddModal();
        handleReset(); // Reset form after saving
      } else {
        alert("Failed to save User Calendar.");
      }
    } catch (error) {
      console.error("Error saving User Calendar:", error);
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              User Calendar
            </MDTypography>
          </MDBox>
          <MDBox width="13.2rem" ml="auto">
            <MDButton
              style={{ marginLeft: 23 }}
              variant="gradient"
              color="info"
              size="medium"
              onClick={handleOpenAddModal}
            >
              Add Calendar
            </MDButton>
          </MDBox>
          <DataTable table={dataTableData} canSearch />
        </Card>
      </MDBox>
      <Footer />

      {/* Modal for adding a new group config */}
      <Dialog open={openAddModal} onClose={handleCloseAddModal} fullWidth maxWidth="sm">
        <DialogTitle>Add Calendar</DialogTitle>
        <DialogContent>
          <MDBox component="form" px={3}>
            <TextField
              fullWidth
              label="Calenar Name"
              name="calandarName"
              value={newCalendar.calandarName}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              label="Calendar Time Zone"
              name="calandarTimeZone"
              value={newCalendar.calandarTimeZone}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              // InputProps={{
              //   style: { padding: "12px 10px" },
              // }}
            />
          </MDBox>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleSave} variant="gradient" color="info">
            Save
          </MDButton>
          <MDButton onClick={handleReset} variant="outlined" color="secondary">
            Reset
          </MDButton>
          <MDButton onClick={handleCloseAddModal} variant="outlined" color="error">
            Cancel
          </MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}
export default Calendar;
