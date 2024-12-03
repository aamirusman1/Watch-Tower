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

function GroupConfig() {
  // State to store the data from the API
  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "Template Name", accessor: "templateName" },
      { Header: "Template Type", accessor: "templateType" },
      { Header: "Template Description", accessor: "templateDescription" },
      { Header: "Template Contents", accessor: "templateContents" },
      { Header: "Actions", accessor: "actions" },
    ],
    rows: [],
  });

  const [templateData, setTemplateData] = useState([]);

  // State for modal visibility and content
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState("");

  // State for adding a new template
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    templateName: "",
    templateType: "",
    templateDescription: "",
    templateContents: "",
  });

  // State for editable row
  const [editableRowId, setEditableRowId] = useState(null);
  const [editedRowData, setEditedRowData] = useState({});

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      const basicAuth = "Basic " + btoa("Administrator:manageaudit");
      try {
        const response = await fetch("http://172.20.150.134:5555/configuration/template", {
          headers: {
            Authorization: basicAuth,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        console.log("data is: " + data.templates);

        setTemplateData(data.templates);

        const rows = data.templates.map((template) => ({
          id: template.templateId,
          //templateId: template.templateId,
          templateName: template.templateName,
          templateType: template.templateType === "EMAIL" ? <EmailIcon /> : <SmsIcon />,
          templateDescription: template.templateDescription,
          templateContents: (
            <MDButton
              variant="outlined"
              color="info"
              size="small"
              onClick={() => handleOpen(template.templateContents)}
            >
              View Content
            </MDButton>
          ),

          //   actions: (
          //     <>
          //       <EditIcon color="info" style={{ cursor: "pointer" }} />
          //       {/* <DeleteIcon></DeleteIcon> */}
          //       <DeleteIcon style={{ cursor: "pointer", color: "red" }} />
          //     </>
          //   ),
          actions: renderActions(template.templateId), // Dynamic actions
        }));

        setDataTableData((prevData) => ({
          ...prevData,
          rows: rows,
        }));
        console.log("rows template name:" + rows.templatename);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    console.log("rows template name:" + rows.templatename);
    console.log("all parameters :" + templateData);
  }, []);

  // Render actions column dynamically
  const renderActions = (id) => {
    console.log("id :" + id + " editableRowId " + editableRowId);
    console.log("renderActions method called ");
    if (editableRowId === id) {
      return (
        <>
          <MDButton color="success" size="small" onClick={() => handleSaveRow(id)}>
            Save
          </MDButton>
          <MDButton color="error" size="small" onClick={() => handleCancelEdit()}>
            Cancel
          </MDButton>
        </>
      );
    }
    return (
      <>
        <EditIcon color="info" style={{ cursor: "pointer" }} onClick={() => handleEditRow(id)} />
        <DeleteIcon style={{ cursor: "pointer", color: "red" }} />
      </>
    );
  };

  // Function to handle modal open
  const handleOpen = (content) => {
    setModalContent(content);
    setOpen(true);
  };

  // Function to handle modal close
  const handleClose = () => {
    setOpen(false);
    setModalContent("");
  };

  // Function to handle opening the add modal
  const handleOpenAddModal = () => setOpenAddModal(true);
  const handleCloseAddModal = () => setOpenAddModal(false);

  // Function to handle input changes in the add modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTemplate((prev) => ({ ...prev, [name]: value }));
  };

  // Function to reset the form
  const handleReset = () => {
    setNewTemplate({
      templateName: "",
      templateType: "",
      templateDescription: "",
      templateContents: "",
    });
  };

  // Function to save the new template
  const handleSave = async () => {
    const basicAuth = "Basic " + btoa("Administrator:manageaudit");
    try {
      const response = await fetch("http://172.20.150.134:5555/configuration/template", {
        method: "POST",
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTemplate),
      });

      if (response.ok) {
        alert("Template saved successfully!");
        handleCloseAddModal();
        handleReset(); // Reset form after saving
      } else {
        alert("Failed to save template.");
      }
    } catch (error) {
      console.error("Error saving template:", error);
    }
  };

  // Handle edit row
  //   const handleEditRow = (id) => {
  //     const rowData = dataTableData.rows.find((row) => row.id === id);
  //     setEditableRowId(id);
  //     setEditedRowData(rowData);
  //     console.log("Edit click" + "id: " + id + "rowData: " + rowData);
  //   };

  const handleEditRow = (id) => {
    console.log("edit id: " + id);
    //setEditableRowId(id);
    console.log("editable row id from edit button " + editableRowId);
    const rowData = dataTableData.rows.find((row) => row.id === id);
    console.log("row data from edit button : " + rowData);
    if (rowData) {
      setEditableRowId(id);
      setEditedRowData({
        templateId: rowData.templateId,
        templateName: rowData.templateName,
        templateType: rowData.templateType === <EmailIcon /> ? "EMAIL" : "SMS",
        templateDescription: rowData.templateDescription,
        templateContents: rowData.templateContents.props.children, // Extract content
      });
    }
  };

  // Handle input change in editable row
  const handleInputChangeInRow = (e, field) => {
    setEditedRowData((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditableRowId(null);
    setEditedRowData({});
  };

  // Handle save row
  const handleSaveRow = async (id) => {
    console.log("calling handleSaveRow");
    const basicAuth = "Basic " + btoa("Administrator:manageaudit");
    try {
      const response = await fetch("http://localhost:5555/configuration/template", {
        method: "PUT",
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedRowData),
      });

      if (response.ok) {
        alert("Template updated successfully!");
        setEditableRowId(null);
        // Optionally, refetch the data to refresh the table
      } else {
        alert("Failed to update template.");
      }
    } catch (error) {
      console.error("Error updating template:", error);
    }
  };

  // Modify rows rendering based on editableRowId
  const rows = dataTableData.rows.map((row) => {
    if (row.id === editableRowId) {
      return {
        ...row,
        templateName: (
          <TextField
            value={editedRowData.templateName || ""}
            onChange={(e) => handleInputChangeInRow(e, "templateName")}
          />
        ),
        templateDescription: (
          <TextField
            value={editedRowData.templateDescription || ""}
            onChange={(e) => handleInputChangeInRow(e, "templateDescription")}
          />
        ),
        templateContents: (
          <TextField
            value={editedRowData.templateContents || ""}
            onChange={(e) => handleInputChangeInRow(e, "templateContents")}
          />
        ),
        actions: renderActions(row.id),
      };
    }
    return row;
  });

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              Templates
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
              Add Template
            </MDButton>
          </MDBox>
          <DataTable table={{ ...dataTableData, rows }} canSearch />
        </Card>
      </MDBox>
      <Footer />
      {/* Modal for displaying template content */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>Template Contents</DialogTitle>
        <DialogContent>
          <MDBox>
            <pre>{modalContent}</pre>
          </MDBox>
        </DialogContent>
        <DialogActions>
          <MDButton onClick={handleClose} color="primary">
            Close
          </MDButton>
        </DialogActions>
      </Dialog>
      {/* Modal for adding a new template */}
      <Dialog open={openAddModal} onClose={handleCloseAddModal} fullWidth maxWidth="sm">
        <DialogTitle>Add New Template</DialogTitle>
        <DialogContent>
          <MDBox component="form" px={3}>
            <TextField
              fullWidth
              label="Template Name"
              name="templateName"
              value={newTemplate.templateName}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              select
              label="Template Type"
              name="templateType"
              value={newTemplate.templateType}
              onChange={handleInputChange}
              fullWidth
              margin="dense"
              InputProps={{
                style: { padding: "12px 10px" },
              }}
            >
              <MenuItem selected value="EMAIL">
                EMAIL
              </MenuItem>
              <MenuItem value="SMS">SMS</MenuItem>
            </TextField>
            <TextField
              fullWidth
              label="Template Description"
              name="templateDescription"
              value={newTemplate.templateDescription}
              onChange={handleInputChange}
              margin="normal"
            />
            <TextField
              fullWidth
              label="Template Contents"
              name="templateContents"
              value={newTemplate.templateContents}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={4}
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
export default GroupConfig;
