// /**
// =========================================================
// * Material Dashboard 2 PRO React - v2.2.1
// =========================================================

// * Product Page: https://www.creative-tim.com/product/material-dashboard-pro-react
// * Copyright 2024 Creative Tim (https://www.creative-tim.com)

// Coded by www.creative-tim.com

//  =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
// */

// // @mui material components
// import Grid from "@mui/material/Grid";
// import Tooltip from "@mui/material/Tooltip";
// import Icon from "@mui/material/Icon";

// // Material Dashboard 2 PRO React components
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";

// // Material Dashboard 2 PRO React examples
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import Footer from "examples/Footer";
// import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
// import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
// import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
// import BookingCard from "examples/Cards/BookingCard";

// // Anaytics dashboard components
// import SalesByCountry from "layouts/dashboards/analytics/components/SalesByCountry";

// // Data
// import reportsBarChartData from "layouts/dashboards/analytics/data/reportsBarChartData";
// import reportsLineChartData from "layouts/dashboards/analytics/data/reportsLineChartData";

// // Images
// import booking1 from "assets/images/products/product-1-min.jpg";
// import booking2 from "assets/images/products/product-2-min.jpg";
// import booking3 from "assets/images/products/product-3-min.jpg";

// function Analytics() {
//   const { sales, tasks } = reportsLineChartData;

//   // Action buttons for the BookingCard
//   const actionButtons = (
//     <>
//       <Tooltip title="Refresh" placement="bottom">
//         <MDTypography
//           variant="body1"
//           color="primary"
//           lineHeight={1}
//           sx={{ cursor: "pointer", mx: 3 }}
//         >
//           <Icon color="inherit">refresh</Icon>
//         </MDTypography>
//       </Tooltip>
//       <Tooltip title="Edit" placement="bottom">
//         <MDTypography variant="body1" color="info" lineHeight={1} sx={{ cursor: "pointer", mx: 3 }}>
//           <Icon color="inherit">edit</Icon>
//         </MDTypography>
//       </Tooltip>
//     </>
//   );

//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <MDBox py={3}>
//         <Grid container>
//           <SalesByCountry />
//         </Grid>
//         <MDBox mt={6}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6} lg={4}>
//               <MDBox mb={3}>
//                 <ReportsBarChart
//                   color="info"
//                   title="website views"
//                   description="Last Campaign Performance"
//                   date="campaign sent 2 days ago"
//                   chart={reportsBarChartData}
//                 />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={4}>
//               <MDBox mb={3}>
//                 <ReportsLineChart
//                   color="success"
//                   title="daily sales"
//                   description={
//                     <>
//                       (<strong>+15%</strong>) increase in today sales.
//                     </>
//                   }
//                   date="updated 4 min ago"
//                   chart={sales}
//                 />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={4}>
//               <MDBox mb={3}>
//                 <ReportsLineChart
//                   color="dark"
//                   title="completed tasks"
//                   description="Last Campaign Performance"
//                   date="just updated"
//                   chart={tasks}
//                 />
//               </MDBox>
//             </Grid>
//           </Grid>
//         </MDBox>
//         <MDBox mt={1.5}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={1.5}>
//                 <ComplexStatisticsCard
//                   color="dark"
//                   icon="weekend"
//                   title="Bookings"
//                   count={281}
//                   percentage={{
//                     color: "success",
//                     amount: "+55%",
//                     label: "than lask week",
//                   }}
//                 />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={1.5}>
//                 <ComplexStatisticsCard
//                   icon="leaderboard"
//                   title="Today's Users"
//                   count="2,300"
//                   percentage={{
//                     color: "success",
//                     amount: "+3%",
//                     label: "than last month",
//                   }}
//                 />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={1.5}>
//                 <ComplexStatisticsCard
//                   color="success"
//                   icon="store"
//                   title="Revenue"
//                   count="34k"
//                   percentage={{
//                     color: "success",
//                     amount: "+1%",
//                     label: "than yesterday",
//                   }}
//                 />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={3}>
//               <MDBox mb={1.5}>
//                 <ComplexStatisticsCard
//                   color="primary"
//                   icon="person_add"
//                   title="Followers"
//                   count="+91"
//                   percentage={{
//                     color: "success",
//                     amount: "",
//                     label: "Just updated",
//                   }}
//                 />
//               </MDBox>
//             </Grid>
//           </Grid>
//         </MDBox>
//         <MDBox mt={2}>
//           <Grid container spacing={3}>
//             <Grid item xs={12} md={6} lg={4}>
//               <MDBox mt={3}>
//                 <BookingCard
//                   image={booking1}
//                   title="Cozy 5 Stars Apartment"
//                   description='The place is close to Barceloneta Beach and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Barcelona.'
//                   price="$899/night"
//                   location="Barcelona, Spain"
//                   action={actionButtons}
//                 />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={4}>
//               <MDBox mt={3}>
//                 <BookingCard
//                   image={booking2}
//                   title="Office Studio"
//                   description='The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the night life in London, UK.'
//                   price="$1.119/night"
//                   location="London, UK"
//                   action={actionButtons}
//                 />
//               </MDBox>
//             </Grid>
//             <Grid item xs={12} md={6} lg={4}>
//               <MDBox mt={3}>
//                 <BookingCard
//                   image={booking3}
//                   title="Beautiful Castle"
//                   description='The place is close to Metro Station and bus stop just 2 min by walk and near to "Naviglio" where you can enjoy the main night life in Milan.'
//                   price="$459/night"
//                   location="Milan, Italy"
//                   action={actionButtons}
//                 />
//               </MDBox>
//             </Grid>
//           </Grid>
//         </MDBox>
//       </MDBox>
//       <Footer />
//     </DashboardLayout>
//   );
// }

// export default Analytics;

import DefaultDoughnutChart from "examples/Charts/DoughnutCharts/DefaultDoughnutChart";
import DefaultLineChart from "examples/Charts/LineCharts/DefaultLineChart";
import Card from "@mui/material/Card";
import DataTable from "examples/Tables/DataTable";

import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
// @mui material components
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 PRO React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

// Material Dashboard 2 PRO React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import BookingCard from "examples/Cards/BookingCard";

// Anaytics dashboard components
import SalesByCountry from "layouts/dashboards/analytics/components/SalesByCountry";

// Data
import reportsBarChartData from "layouts/dashboards/analytics/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboards/analytics/data/reportsLineChartData";
import defaultLineChartData from "layouts/pages/charts/data/defaultLineChartData";
import defaultDoughnutChartData from "layouts/pages/charts/data/defaultDoughnutChartData";

// Images
import booking1 from "assets/images/products/product-1-min.jpg";
import booking2 from "assets/images/products/product-2-min.jpg";
import booking3 from "assets/images/products/product-3-min.jpg";

//restful Services

import axios from "axios";
import React, { useEffect, useState } from "react";

function Analytics() {
  const { sales, tasks } = reportsLineChartData;
  const [counts, setCounts] = useState({
    totalFeedCount: 0,
    totalActiveFeedCount: 0,
    totalActiveMonitors: 0,
    totalMonitors: 0,
    totalRules: 0,
    totalActiveRules: 0,
    totalAlerts: 0,
  });

  //For violate Rules state

  const [dataTableData, setDataTableData] = useState({
    columns: [
      {
        Header: <span style={{ fontSize: "15px" }}>Rule Name</span>,
        accessor: "ruleName",
      },
      {
        Header: <span style={{ fontSize: "15px" }}>Monitor Name</span>,
        accessor: "auditSystemName",
      },
      {
        Header: <span style={{ fontSize: "15px" }}>Status</span>,
        accessor: "isViolated",
        width: "20%",
      },
    ],
    rows: [],
  });

  //CLose violate Rules state

  useEffect(() => {
    axios
      .get(
        "http://localhost:5555/restv2/BInRestInterface.restful.provider.dashboard_.resources.dashboard:getHomePageStats/dashboard/getHomePageStats",
        {
          auth: {
            username: "Administrator",
            password: "manageaudit",
          },
        }
      )
      .then((response) => {
        setCounts(response.data); // Update counts with the fetched data
      })
      .catch((error) => {
        console.error("Error fetching data:", error); // Log error for debugging
      });

    //For Rules Data

    const fetchData = async () => {
      const basicAuth = "Basic " + btoa("Administrator:manageaudit");

      try {
        const response = await fetch(
          "http://localhost:5555/restv2/BInRestInterface.restful.provider:ui/rule/all",
          {
            headers: {
              Authorization: basicAuth,
              "Content-Type": "application/json",
            },
          }
        ); // Replace with your actual API URL
        const data = await response.json();

        // Map the API response to the format expected by the DataTable
        const rows = data.auditorRules
          .filter((rule) => rule.isViolated === "TRUE") // Keep only violated rules
          .map((rule) => ({
            isViolated: rule.isViolated == "TRUE" ? "VIOLATED" : "OK",
            auditSystemName: rule.auditSystemName,
            ruleName: rule.ruleName,
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

    //Close Rules Data
  }, []);

  // Action buttons for the BookingCard
  const actionButtons = (
    <>
      <Tooltip title="Refresh" placement="bottom">
        <MDTypography
          variant="body1"
          color="primary"
          lineHeight={1}
          sx={{ cursor: "pointer", mx: 3 }}
        >
          <Icon color="inherit">refresh</Icon>
        </MDTypography>
      </Tooltip>
      <Tooltip title="Edit" placement="bottom">
        <MDTypography variant="body1" color="info" lineHeight={1} sx={{ cursor: "pointer", mx: 3 }}>
          <Icon color="inherit">edit</Icon>
        </MDTypography>
      </Tooltip>
    </>
  );

  //start reportsBarChartData
  const [defaultLineChartData1, setReportsBarChartData] = useState({
    labels: ["M", "T", "W", "T", "F", "S", "S"],
    datasets: [
      {
        label: "Transaction",
        data: [],
        color: "info",
      },
    ],
  });

  useEffect(() => {
    // Fetch data from the API
    axios
      .get("http://localhost:5555/restv2/ZAsif.restResource:graphDashboard/transaction", {
        auth: {
          username: "Administrator",
          password: "manageaudit",
        },
      })
      .then((response) => {
        // Parse the API response and update the state
        const apiData = response.data.results[0]?.sample_counts.split(",").map(Number);
        if (apiData) {
          setReportsBarChartData((prevData) => ({
            ...prevData,
            datasets: prevData.datasets.map((dataset) => ({
              ...dataset,
              data: apiData,
            })),
          }));
        }
      })
      .catch((error) => {
        console.error("Error fetching bar chart data:", error);
      });
  }, []);

  //end reportsBarChartData

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        {/*<Grid container>
          <SalesByCountry />
        </Grid>*/}
        <MDBox mt={1.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="dark"
                  icon="check_circle"
                  title="Active Feeds"
                  count={`${counts.totalActiveFeedCount}/${counts.totalFeedCount}`}
                  percentage={{
                    color: "success",
                    amount: "+55%",
                    label: "than last week",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  icon="leaderboard"
                  title="Active Monitor"
                  count={`${counts.totalActiveMonitors}/${counts.totalMonitors}`}
                  percentage={{
                    color: "success",
                    amount: "+3%",
                    label: "than last month",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="success"
                  icon="rule"
                  title="Active Rules"
                  count={`${counts.totalActiveRules}/${counts.totalRules}`}
                  percentage={{
                    color: "success",
                    amount: "+1%",
                    label: "than yesterday",
                  }}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <MDBox mb={1.5}>
                <ComplexStatisticsCard
                  color="primary"
                  icon="warning"
                  title="Generated Alerts"
                  count={counts.totalAlerts}
                  percentage={{
                    color: "success",
                    amount: "",
                    label: "Just updated",
                  }}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        <MDBox mt={6}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <DefaultLineChart
                  icon={{ component: <AccountBalanceIcon /> }}
                  title="Transaction"
                  height="14.5rem"
                  description="Transaction insights"
                  chart={defaultLineChartData1}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <DefaultLineChart
                  icon={{ component: "insights" }}
                  title="Line chart"
                  height="14.5rem"
                  description="Product insights"
                  chart={defaultLineChartData}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <DefaultDoughnutChart
                  icon={{ color: "success", component: "donut_small" }}
                  title="Doughnut chart"
                  height="14.5rem"
                  description="Affiliates program"
                  chart={defaultDoughnutChartData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Analytics;
