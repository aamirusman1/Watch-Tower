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
import DataTable from "examples/Tables/DataTable";

//React Icons
import { RxCross2 } from "react-icons/rx";
import { FaCheck } from "react-icons/fa6";
import { ImCross } from "react-icons/im";
import { IoMdSettings } from "react-icons/io";
import { FaArrowUp } from "react-icons/fa6";
import { FaEdit } from "react-icons/fa";

//Material Icons
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { Link } from "react-router-dom";

function DataTables() {
  // State to store the data from the API
  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "Rule Name", accessor: "ruleName" },
      { Header: "Monitor Name", accessor: "auditSystemName" },
      { Header: "Status", accessor: "isViolated" },
      { Header: "Active", accessor: "isActive" },
      { Header: "Execute On", accessor: "executeOn" },
      { Header: "Calendar Name", accessor: "calandarName" },
      { Header: "Options", accessor: "options" },
    ],
    rows: [],
  });

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    ruleName: "",
    monitoredAuditsId: "",
    executeOn: "TRANSITION",
    doRemind: "FALSE",
    useCalendar: "FALSE",
    ruleIsActive: "TRUE",
  });

  //Edit
  const [editMode, setEditMode] = useState(false);
  const [editingRow, setEditingRow] = useState(null);

  //State to store monitors
  const [monitorFeeds, setMonitorFeeds] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchData = async () => {
      const basicAuth = "Basic " + btoa("Administrator:manageaudit");

      try {
        const response = await fetch(
          "http://172.20.150.134:5555/restv2/BInRestInterface.restful.provider.rules_.resources:rule/rule",
          {
            headers: {
              Authorization: basicAuth,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        const rows = data.auditorRules.map((rule) => ({
          isViolated: rule.isViolated === "TRUE" ? "VIOLATED" : "OK",
          auditSystemName: rule.auditSystemName,
          ruleName: (
            <Link
              //to={`/ruleDefinition/data-tables`}
              to={`/ruleDefinition/data-tables/${rule.ruleId}/${rule.auditType}`}
              style={{ textDecoration: "none", color: "blue" }}
            >
              {rule.ruleName}
            </Link>
          ),

          isActive: rule.isActive === "TRUE" ? <FaCheck /> : <ImCross />,
          executeOn: rule.executeOn,
          calandarName: rule.calandarName,
          options: (
            <>
              <IoMdSettings /> <FaArrowUp />{" "}
              <EditIcon onClick={() => handleOpenModal(rule)} style={{ cursor: "pointer" }} />{" "}
              <DeleteIcon></DeleteIcon>
            </>
          ),
        }));

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

  // Fetch monitor feeds data from the API
  useEffect(() => {
    const fetchMonitorFeeds = async () => {
      const basicAuth = "Basic " + btoa("Administrator:manageaudit");

      try {
        const response = await fetch("http://172.20.150.134:5555/rules/rule/monitor", {
          headers: {
            Authorization: basicAuth,
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setMonitorFeeds(data.monitoredAudits || []);
        } else {
          console.error("Failed to fetch monitor feeds.");
        }
      } catch (error) {
        console.error("Error fetching monitor feeds:", error);
      }
    };

    fetchMonitorFeeds();
  }, []);

  //const handleOpenModal = () => setOpenModal(true);
  const handleOpenModal = (row = null) => {
    if (row) {
      // Edit Mode
      setEditMode(true);
      setEditingRow(row);

      setFormData({
        ruleName: row.ruleName?.props?.children || "", // Safely extract text from Link
        monitoredAuditsId: row.auditSystemName || "",
        executeOn: row.executeOn || "TRANSITION",
        doRemind: row.doRemind === "TRUE" ? "TRUE" : "FALSE",
        useCalendar: row.useCalendar === "TRUE" ? "TRUE" : "FALSE",
        ruleIsActive: row.isActive === <FaCheck /> ? "TRUE" : "FALSE", // Adjust based on your isActive rendering logic
      });
    } else {
      // Add Mode
      setEditMode(false);
      setEditingRow(null);
      setFormData({
        ruleName: "",
        monitoredAuditsId: "",
        executeOn: "TRANSITION",
        doRemind: "FALSE",
        useCalendar: "FALSE",
        ruleIsActive: "TRUE",
      });
    }
    setOpenModal(true);
  };

  //const handleCloseModal = () => setOpenModal(false);
  const handleCloseModal = () => {
    setOpenModal(false);
    setEditMode(false);
    setEditingRow(null);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // const handleSubmit = async () => {
  //   const basicAuth = "Basic " + btoa("Administrator:manageaudit");
  //   try {
  //     const response = await fetch("http://172.20.150.134:5555/rules/rule", {
  //       method: "POST",
  //       headers: {
  //         Authorization: basicAuth,
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });

  //     if (response.ok) {
  //       alert("Rule added successfully!");
  //       handleCloseModal();
  //       setFormData({
  //         ruleName: "",
  //         monitoredAuditsId: "",
  //         executeOn: "",
  //         doRemind: "",
  //         useCalendar: "",
  //         ruleIsActive: "",
  //       });
  //     } else {
  //       alert("Failed to add rule!");
  //     }
  //   } catch (error) {
  //     console.error("Error submitting data:", error);
  //   }
  // };

  //Handle submit to incorporate edit mode
  const handleSubmit = async () => {
    const basicAuth = "Basic " + btoa("Administrator:manageaudit");
    const url = editMode
      ? `http://172.20.150.134:5555/rules/rule`
      : `http://172.20.150.134:5555/rules/rule`;
    const method = editMode ? "PUT" : "POST";

    const payload = {
      ruleName: formData.ruleName,
      monitoredAuditsId: formData.monitoredAuditsId,
      ruleIsActive: formData.ruleIsActive === "TRUE",
      execution: formData.executeOn,
      doRemind: formData.doRemind === "TRUE",
      useCalandar: formData.useCalendar === "TRUE",
      calandarName: formData.calandarName || "",
      ...(editMode && { ruleId: editingRow.ruleId }), // Include ruleId only in edit mode
    };

    try {
      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert(editMode ? "Rule updated successfully!" : "Rule added successfully!");
        handleCloseModal();
        setFormData({
          ruleName: "",
          monitoredAuditsId: "",
          executeOn: "",
          doRemind: "",
          useCalendar: "",
          ruleIsActive: "",
        });
        // Optionally reload the table data
      } else {
        alert(editMode ? "Failed to update rule!" : "Failed to add rule!");
      }
    } catch (error) {
      console.error("Error submitting data:", error);
    }
  };

  const handleReset = () => {
    setFormData({
      ruleName: "",
      monitoredAuditsId: "",
      executeOn: "",
      doRemind: "",
      useCalendar: "",
      ruleIsActive: "",
    });
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              Rules
            </MDTypography>
          </MDBox>
          <MDBox width="13.2rem" ml="auto">
            <MDButton variant="gradient" color="info" size="small" onClick={handleOpenModal}>
              Add Rule
            </MDButton>
          </MDBox>
          <DataTable table={dataTableData} canSearch />
        </Card>
      </MDBox>
      <Footer />

      {/* Modal */}
      <Dialog open={openModal} onClose={handleCloseModal} fullWidth>
        <DialogTitle>{editMode ? "Edit Rule" : "Add New Rule"}</DialogTitle>
        <DialogContent>
          <TextField
            label="Rule Name"
            name="ruleName"
            value={formData.ruleName}
            onChange={handleChange}
            fullWidth
            margin="dense"
          />
          <TextField
            label="Monitor Feed"
            name="monitoredAuditsId"
            value={formData.monitoredAuditsId}
            onChange={handleChange}
            select
            fullWidth
            margin="dense"
            InputProps={{
              style: { padding: "12px 10px" },
            }}
          >
            {monitorFeeds.map((feed) => (
              <MenuItem key={feed.auditId} value={feed.auditId}>
                {feed.auditSystemName}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            label="Execute On"
            name="executeOn"
            value={formData.executeOn}
            onChange={handleChange}
            select
            fullWidth
            margin="dense"
            InputProps={{
              style: { padding: "12px 10px" },
            }}
          >
            <MenuItem value="EVENT">EVENT</MenuItem>
            <MenuItem selected value="TRANSITION">
              TRANSITION
            </MenuItem>
          </TextField>
          <TextField
            label="Do Remind"
            name="doRemind"
            value={formData.doRemind}
            onChange={handleChange}
            select
            fullWidth
            margin="dense"
            InputProps={{
              style: { padding: "12px 10px" },
            }}
          >
            <MenuItem selected value="FALSE">
              FALSE
            </MenuItem>
            <MenuItem value="TRUE">TRUE</MenuItem>
          </TextField>
          <TextField
            label="Use Calendar"
            name="useCalendar"
            value={formData.useCalendar}
            onChange={handleChange}
            select
            fullWidth
            margin="dense"
            InputProps={{
              style: { padding: "12px 10px" },
            }}
          >
            <MenuItem selected value="FALSE">
              FALSE
            </MenuItem>
            <MenuItem value="TRUE">TRUE</MenuItem>
          </TextField>
          <TextField
            label="Active"
            name="ruleIsActive"
            value={formData.ruleIsActive}
            onChange={handleChange}
            select
            fullWidth
            margin="dense"
            InputProps={{
              style: { padding: "12px 10px" },
            }}
          >
            <MenuItem value="FALSE" selected>
              FALSE
            </MenuItem>
            <MenuItem value="TRUE">TRUE</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <MDButton variant="gradient" color="info" onClick={handleSubmit}>
            Save
          </MDButton>
          <MDButton variant="outlined" color="secondary" onClick={handleReset}>
            Reset
          </MDButton>
          <MDButton variant="outlined" color="error" onClick={handleCloseModal}>
            Cancel
          </MDButton>
        </DialogActions>
      </Dialog>
    </DashboardLayout>
  );
}

export default DataTables;
