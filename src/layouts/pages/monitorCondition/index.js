// @mui material components
import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { useParams } from "react-router-dom";

import AddMonitorCondition from "./AddMonitorCondition";

function MonitorCondition() {
  // State to store the data from the API
  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "Serial Number", accessor: "serialNumber" },
      { Header: "Feed Path Name", accessor: "feedPathName" },
      { Header: "Condition Operator", accessor: "conditionOperator" },
      { Header: "Comparator", accessor: "comparator" },
      { Header: "Group Operator", accessor: "groupOperator" },
      { Header: "Action", accessor: "action" },
    ],
    rows: [],
  });

  const { auditId } = useParams();

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const basicAuth = "Basic " + btoa("Administrator:manageaudit");

      try {
        const response = await fetch(
          "http://localhost:5555/rad/BInRestInterface.restful.provider:monitor/feed/monitorCondition",
          {
            method: "GET", // Use the required method
            headers: {
              Authorization: basicAuth,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ auditId }),
          }
        ); // Replace with your actual API URL
        const data = await response.json();

        // Map the API response to the format expected by the DataTable
        const rows = data.auditConditions.map((monitorcondition) => ({
          serialNumber: monitorcondition.serialNumber,
          feedPathName: monitorcondition.feedPathName,
          conditionOperator: monitorcondition.conditionOperator,
          comparator: monitorcondition.comparator,
          groupOperator: monitorcondition.groupOperator,
          action: (
            <MDBox display="flex" justifyContent="space-evenly">
              <IconButton color="info" onClick={() => handleEdit(feed.regiseterFeedId)}>
                <EditIcon />
              </IconButton>
              <IconButton color="secondary" onClick={() => handleDelete(feed.regiseterFeedId)}>
                <DeleteIcon />
              </IconButton>
            </MDBox>
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
  }, []); // Empty dependency array means this runs once when the component is mounted

  // Function to handle editing
  const handleEdit = (id) => {
    console.log("Edit clicked for ID:", id);
    // Add your edit logic here
  };

  // Function to handle deletion
  const handleDelete = (id) => {
    console.log("Delete clicked for ID:", id);
    // Add your delete logic here
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3} display="flex" justifyContent="space-between" alignItems="center">
            <MDTypography variant="h2" fontWeight="medium">
              Monitor Condition
            </MDTypography>
            <AddMonitorCondition />
          </MDBox>
          <DataTable table={dataTableData} canSearch />
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default MonitorCondition;
