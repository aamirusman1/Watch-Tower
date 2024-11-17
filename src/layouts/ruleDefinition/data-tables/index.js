import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";

function DataTables() {
  // State to store the data from the API
  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: "Rule Name", accessor: "ruleName" },
      { Header: "Audit System", accessor: "auditSystemName" },
      { Header: "Rule ID", accessor: "ruleId", width: "20%" },
      { Header: "Audit ID", accessor: "auditId", width: "20%" },

      { Header: "Audit Description", accessor: "auditDescription" },

      { Header: "Is Violated", accessor: "isViolated" },
      { Header: "Is Active", accessor: "isActive" },
      { Header: "Execute On", accessor: "executeOn" },
    ],
    rows: [],
  });

  // Fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      const basicAuth = "Basic " + btoa("Administrator:manageaudit");

      try {
        const response = await fetch(
          "http://localhost:5555/restv2/BInUI.restful.rules:rules/rules/all",
          {
            headers: {
              Authorization: basicAuth,
              "Content-Type": "application/json",
            },
          }
        ); // Replace with your actual API URL
        const data = await response.json();

        // Map the API response to the format expected by the DataTable
        const rows = data.auditorRules.map((rule) => ({
          ruleId: rule.ruleId,
          auditId: rule.auditId,
          auditSystemName: rule.auditSystemName,
          auditDescription: rule.auditDescription,
          ruleName: rule.ruleName,
          isViolated: rule.isViolated,
          isActive: rule.isActive,
          executeOn: rule.executeOn,
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

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3} lineHeight={1}>
            <MDTypography variant="h5" fontWeight="medium">
              Rules
            </MDTypography>
            <MDTypography variant="button" color="text">
              A lightweight, extendable, dependency-free javascript HTML table plugin.
            </MDTypography>
          </MDBox>
          <DataTable table={dataTableData} canSearch />
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default DataTables;
