import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
//Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
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
function Parameters() {
  // State to store the data from the API
  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "Name", accessor: "name" },
      { Header: "Value", accessor: "value" },
      { Header: "Description", accessor: "description" },
      { Header: "Action", accessor: "actions" },
    ],
    rows: [],
  });
  // State for add new parameter
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newParameter, setNewParameter] = useState({
    name: "",
    value: "",
    description: "",
  });
  //state to track the row being edited:
  const [editingRow, setEditingRow] = useState(null);
  const [editingId, setEditingId] = useState(null);
  //Fetching all existing parameters
  const fetchData = async () => {
    const basicAuth = "Basic " + btoa("watchtower:watchtower");
    try {
      const response = await fetch(
        "http://localhost:5555/restv2/Default.Azhar.restful:ui/parameters/all",
        {
          headers: {
            Authorization: basicAuth,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      const rows = data.parameters.map((parameter) => {
        return editingId === parameter.paramId
          ? {
              name: (
                <TextField
                  fullWidth
                  name="name"
                  value={editingRow.name}
                  onChange={(e) => setEditingRow((prev) => ({ ...prev, name: e.target.value }))}
                />
              ),
              value: (
                <TextField
                  fullWidth
                  name="value"
                  value={editingRow.value}
                  onChange={(e) => setEditingRow((prev) => ({ ...prev, value: e.target.value }))}
                />
              ),
              description: (
                <TextField
                  fullWidth
                  name="description"
                  value={editingRow.description}
                  onChange={(e) =>
                    setEditingRow((prev) => ({ ...prev, description: e.target.value }))
                  }
                />
              ),
              actions: (
                <>
                  <MDButton variant="outlined" color="success" size="small" onClick={handleSaveRow}>
                    Submit
                  </MDButton>
                  <MDButton
                    variant="outlined"
                    color="error"
                    size="small"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </MDButton>
                </>
              ),
            }
          : {
              name: parameter.name,
              value: parameter.value,
              description: parameter.description,
              actions: (
                <>
                  <EditIcon
                    color="info"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleEditRow(parameter)}
                  />
                  <DeleteIcon
                    onClick={() => handleDelete(parameter.paramId)}
                    style={{ cursor: "pointer", color: "red" }}
                  />
                </>
              ),
            };
      });
      setDataTableData((prevData) => ({
        ...prevData,
        rows: rows,
      }));
      console.log("rows:" + rows);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [editingId, editingRow]);

  // Function to handle opening the add modal
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  // Function to handle input changes in the add modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewParameter((prev) => ({ ...prev, [name]: value }));
  };
  // Function to reset the form
  const handleReset = () => {
    setNewParameter({
      name: "",
      value: "",
      description: "",
    });
  };
  // Function to add new Parameter
  const handleSave = async () => {
    const basicAuth = "Basic " + btoa("watchtower:watchtower");
    try {
      const response = await fetch(
        "http://localhost:5555/restv2/Default.Azhar.restful:ui/parameters/add",
        {
          method: "POST",
          headers: {
            Authorization: basicAuth,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newParameter),
        }
      );
      if (response.ok) {
        alert("Parameter inserted successfully.");
        handleCloseAddModal();
        handleReset();
        await fetchData(); // Refresh the data
      } else {
        alert("Failed to insert parameter.");
      }
    } catch (error) {
      console.error("Error inserting parameter:", error);
    }
  };

  const handleEditRow = (row) => {
    setEditingRow({ ...row });
    setEditingId(row.paramId);
    console.log(" Edit clicked; editId: " + editingId + " editingRow: " + editingRow);
  };
  const handleCancelEdit = () => {
    setEditingRow(null);
    setEditingId(null);
  };
  // Handle save row

  const handleSaveRow = async () => {
    const basicAuth = "Basic " + btoa("watchtower:watchtower");
    try {
      const response = await fetch(
        "http://localhost:5555/restv2/Default.Azhar.restful:ui/parameters/update",
        {
          method: "PUT",
          headers: {
            Authorization: basicAuth,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editingRow),
        }
      );
      if (response.ok) {
        alert("Parameters updated successfully");
        setEditingId(null);
        setEditingRow(null);
        await fetchData(); // Refresh the data
      } else {
        alert("Failed to update parameters");
      }
    } catch (error) {
      console.error("Error updating parameter:", error);
    }
  };

  // Function to handle deleting a parameter

  const handleDelete = async (paramId) => {
    const basicAuth = "Basic " + btoa("watchtower:watchtower");
    if (window.confirm("Are you sure you want to delete this parameter?")) {
      try {
        const response = await fetch(
          "http://localhost:5555/restv2/Default.Azhar.restful:ui/parameters/delete",
          {
            method: "DELETE",
            headers: {
              Authorization: basicAuth,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ paramId }),
          }
        );
        if (response.ok) {
          alert("Parameter deleted successfully.");
          await fetchData(); // Refresh the data
        } else {
          alert("Failed to delete parameter.");
        }
      } catch (error) {
        console.error("Error deleting parameter:", error);
      }
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              Parameters
            </MDTypography>
          </MDBox>
          <MDBox width="13.2rem" ml="auto">
            <MDButton
              style={{ marginLeft: 45 }}
              variant="gradient"
              color="info"
              size="medium"
              onClick={handleOpenAddModal}
            >
              Add Parameter
            </MDButton>
          </MDBox>
          <DataTable table={dataTableData} canSearch />
        </Card>
      </MDBox>
      <Footer />
      <Dialog open={openAddModal} onClose={handleCloseAddModal} fullWidth maxWidth="sm">
        <DialogTitle>Add Parameter</DialogTitle>
        <DialogContent>
          <MDBox component="form" px={3}>
            <TextField
              fullWidth
              label="Parameter Name"
              name="name"
              value={newParameter.name}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Parameter Value"
              name="value"
              value={newParameter.value}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={newParameter.description}
              onChange={handleInputChange}
              margin="normal"
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
export default Parameters;
