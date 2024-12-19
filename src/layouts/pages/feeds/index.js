import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import IconButton from "@mui/material/IconButton";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import { green, red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";

import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
import AddFeedPopup from "./AddFeedPopup";
import DeleteFeed from "./utils/DeleteFeed";
import { Switch } from "@mui/material";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";

function Feeds() {
  const [dataTableData, setDataTableData] = useState({
    columns: [
      { Header: <span style={{ fontSize: "15px" }}>Feed Name</span>, accessor: "feedName" },
      { Header: <span style={{ fontSize: "15px" }}>Is Active</span>, accessor: "isActive" },
      { Header: <span style={{ fontSize: "15px" }}>Action</span>, accessor: "action" },
    ],
    rows: [],
  });

  const [editingFeedId, setEditingFeedId] = useState(null);
  const [feedStatus, setFeedStatus] = useState({});
  const navigate = useNavigate();

  const handleDeleteFeed = (deletedFeedId) => {
    setDataTableData((prevData) => ({
      ...prevData,
      rows: prevData.rows.filter((row) => row.action.props.feedId !== deletedFeedId),
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      const basicAuth = "Basic " + btoa("Administrator:manageaudit");

      try {
        const response = await fetch("http://localhost:5555/feed/feed", {
          method: "GET",
          headers: {
            Authorization: basicAuth,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        const rows = data.registeredFeeds.map((feed) => ({
          feedName:
            editingFeedId === feed.regiseterFeedId ? (
              <TextField
                defaultValue={feed.feedName}
                onChange={(e) =>
                  setDataTableData((prev) => ({
                    ...prev,
                    rows: prev.rows.map((row) =>
                      row.action.props.feedId === feed.regiseterFeedId
                        ? { ...row, feedName: e.target.value }
                        : row
                    ),
                  }))
                }
                fullWidth
              />
            ) : (
              <MDTypography
                style={{ textDecoration: "none", color: "#1A73E8" }}
                component="a"
                href={`/monitors/${feed.regiseterFeedId}`}
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/monitors/${feed.regiseterFeedId}`);
                }}
                variant="subtitle2"
                color="secondary"
                sx={{ cursor: "pointer", textDecoration: "underline" }}
              >
                {feed.feedName}
              </MDTypography>
            ),
          isActive:
            editingFeedId === feed.regiseterFeedId ? (
              <Switch
                checked={
                  feedStatus[feed.regiseterFeedId] ||
                  feed.isActive === true ||
                  feed.isActive === "TRUE"
                }
                onChange={(e) => {
                  setFeedStatus((prevStatus) => ({
                    ...prevStatus,
                    [feed.regiseterFeedId]: e.target.checked,
                  }));
                }}
              />
            ) : feed.isActive === true || feed.isActive === "TRUE" ? (
              <IconButton>
                <CheckIcon sx={{ color: green[500] }} />
              </IconButton>
            ) : (
              <IconButton>
                <ClearIcon sx={{ color: red[500], fontSize: "1.5rem" }} />
              </IconButton>
            ),
          action:
            editingFeedId === feed.regiseterFeedId ? (
              <MDBox display="flex" justifyContent="space-evenly" alignItems="center" gap={2}>
                <MDButton
                  variant="contained"
                  color="info"
                  onClick={() => {
                    // Pass the updated status as string "TRUE" or "FALSE"
                    const updatedIsActive = feedStatus[feed.regiseterFeedId] ? "TRUE" : "FALSE";

                    setDataTableData((prevData) => ({
                      ...prevData,
                      rows: prevData.rows.map((row) =>
                        row.action.props.feedId === feed.regiseterFeedId
                          ? { ...row, isActive: updatedIsActive }
                          : row
                      ),
                    }));
                    setEditingFeedId(null);
                    // Here, call the API to update the backend
                    updateFeedInBackend(feed.regiseterFeedId, updatedIsActive);
                  }}
                >
                  Submit
                </MDButton>
                <MDButton
                  variant="outlined"
                  color="secondary"
                  onClick={() => setEditingFeedId(null)}
                >
                  Cancel
                </MDButton>
              </MDBox>
            ) : (
              <MDBox display="flex" justifyContent="space-evenly">
                <IconButton color="info" onClick={() => setEditingFeedId(feed.regiseterFeedId)}>
                  <EditIcon />
                </IconButton>
                <DeleteFeed feedId={feed.regiseterFeedId} onDeleteSuccess={handleDeleteFeed} />
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
  }, [editingFeedId, feedStatus]);

  const updateFeedInBackend = async (feedId, isActive) => {
    const basicAuth = "Basic " + btoa("Administrator:manageaudit");
    const apiUrl = `http://localhost:5555/feed/feed/${feedId}`;

    try {
      const response = await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Authorization: basicAuth,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          isActive: isActive, // Ensure this is either "TRUE" or "FALSE"
        }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(result.message || "Feed updated successfully!");
      } else {
        alert("Failed to update feed. Please try again.");
      }
    } catch (error) {
      console.error("Error updating feed:", error);
      alert("An error occurred while updating the feed. Please try again.");
    }
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox pt={6} pb={3}>
        <Card>
          <MDBox p={3} display="flex" justifyContent="space-between" alignItems="center">
            <MDTypography variant="h2" fontWeight="medium">
              Feeds
            </MDTypography>
            <AddFeedPopup
              onAddFeed={(newFeed) => {
                setDataTableData((prevData) => ({
                  ...prevData,
                  rows: [
                    ...prevData.rows,
                    {
                      feedName: (
                        <MDTypography
                          component="a"
                          href="#"
                          onClick={(e) => e.preventDefault()}
                          variant="subtitle2"
                          color="secondary"
                          sx={{ cursor: "pointer", textDecoration: "underline" }}
                        >
                          {newFeed.feedName}
                        </MDTypography>
                      ),
                      isActive: newFeed.isActive ? (
                        <IconButton>
                          <CheckIcon sx={{ color: green[500] }} />
                        </IconButton>
                      ) : (
                        <IconButton>
                          <ClearIcon sx={{ color: red[500] }} />
                        </IconButton>
                      ),
                      action: (
                        <MDBox display="flex" justifyContent="space-evenly">
                          <IconButton color="info" onClick={() => setEditingFeedId(newFeed.feedId)}>
                            <EditIcon />
                          </IconButton>
                          <DeleteFeed feedId={newFeed.feedId} onDeleteSuccess={handleDeleteFeed} />
                        </MDBox>
                      ),
                    },
                  ],
                }));
              }}
            />
          </MDBox>
          <DataTable table={{ columns: dataTableData.columns, rows: dataTableData.rows }} />
        </Card>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Feeds;
