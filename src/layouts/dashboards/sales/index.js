import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import { exportToCSV } from "./utils/exportToCSV";
import ChannelCell from "./ChannelCell";
import TopBar from "./utils/TopBar";

function Alerts() {
  const [originalData, setOriginalData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "Rule Name", accessor: "ruleName" },
      { Header: "Alert Timestamp", accessor: "alertTimestamp" },
      { Header: "Priority", accessor: "priority" },
      {
        Header: "Channel",
        accessor: "channel",
        Cell: ChannelCell,
      },
      { Header: "Receiver", accessor: "receiver" },
      { Header: "Description", accessor: "description" },
      { Header: "Status", accessor: "status" },
    ],
    rows: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const basicAuth = "Basic " + btoa("Administrator:manageaudit");
      try {
        const response = await fetch(
          "http://localhost:5555/restv2/BInUI.restful.monitorRulesAlerts:monitorRulesAlerts/monitorRulesAlerts/all",
          {
            method: "GET",
            headers: {
              Authorization: basicAuth,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();
        const rows = data.monitorRulesAlerts.map((alert) => ({
          ruleName: alert.ruleName,
          alertTimestamp: alert.alertTimestamp,
          priority: alert.priority,
          channel: alert.channel,
          receiver: alert.receiver,
          description: alert.description,
          status: alert.status,
        }));
        setOriginalData(rows);
        setFilteredData(rows); // Initialize filteredData with the original data
        setDataTableData((prevData) => ({
          ...prevData,
          rows,
        }));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (query) => {
    setFilteredData(
      originalData.filter((row) => row.ruleName.toLowerCase().includes(query.toLowerCase()))
    );
  };

  const handleStatusChange = (selectedStatuses) => {
    if (selectedStatuses.length === 0) {
      setFilteredData(originalData); // Reset to original data if no filter applied
    } else {
      setFilteredData(originalData.filter((row) => selectedStatuses.includes(row.status)));
    }
  };

  const handlePriorityChange = (selectedPriorities) => {
    if (selectedPriorities.length === 0) {
      setFilteredData(originalData); // Reset to original data if no filter applied
    } else {
      setFilteredData(originalData.filter((row) => selectedPriorities.includes(row.priority)));
    }
  };

  const handleChannelChange = (selectedChannels) => {
    if (selectedChannels.length === 0) {
      setFilteredData(originalData); // Reset to original data if no filter applied
    } else {
      setFilteredData(originalData.filter((row) => selectedChannels.includes(row.channel)));
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={3} pb={3}>
        <MDBox display="flex" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <MDBox flex="1">
            <TopBar
              onSearchChange={handleSearchChange}
              onStatusChange={handleStatusChange}
              onPriorityChange={handlePriorityChange}
              onChannelChange={handleChannelChange}
            />
          </MDBox>
          <MDBox ml={1}>
            <MDButton
              variant="contained"
              color="primary"
              onClick={() => exportToCSV(dataTableData.rows, dataTableData.columns)}
            >
              <Icon>description</Icon>
              &nbsp;Export CSV
            </MDButton>
          </MDBox>
        </MDBox>

        <Card>
          <MDBox>
            <DataTable
              table={{ columns: dataTableData.columns, rows: filteredData }}
              entriesPerPage={10}
              showTotalEntries
            />
          </MDBox>
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Alerts;
