import { Box, Button } from "@mui/material";
import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import ReportPost from "components/user/ReportPost";

const PostManagement = () => {
  const token = useSelector((state) => state.adminState.adminToken);
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const [rows, setRows] = useState([]);
  const columns = [
    { field: "postId", headerName: "Post ID", width: 160 },
    { field: "reason", headerName: "Report Issue", width: 260 },
    { field: "count", headerName: "Report Count", width: 200 },
    {
      field: "Action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => (
        <Button
          onClick={() => {
            blockPost(params.row.postId);
          }}
          variant="contained"
          color="primary"
        >
          {params.row.status === true ? "Pending" : "Blocked"}
        </Button>
      ),
      width: 130,
    },
    { field: "status", headerName: "Status", width: 130, hidden: true },
  ];

  const getReports = async () => {
    const response = await fetch("http://localhost:3001/admin/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setReports(data);
    setLoading(true);
    getReportsDetails()
  };

  const getReportsDetails = () => {
    const data = reports.map((report) => ({
      postId: report._id,
      reason: report.report.map((r) => r.content).join(", "),
      count: report.report.length,
      status: report.status,
    }));
    setRows(data);
    setLoading(true)
  };

  const blockPost = async (postId) => {
    const response = await fetch(
      `http://localhost:3001/admin/posts/block/${postId}`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    console.log(data);
    setReports(data);

    setLoading(!loading);
  };

  useEffect(() => {
    getReports();
  }, [loading]);

  useEffect(() => {
    if (loading) {
      getReportsDetails();
    }
  }, [loading]);

  return (
    <Box sx={{ marginTop: "100px", marginLeft: "280px", marginRight: "25px" }}>
      <h1>POSTs</h1>
      <h3>Posts Report Management</h3>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableRowSelectionOnClick
          getRowId={(row) => row.postId}
        />
      </Box>
    </Box>
  );
};

export default PostManagement;
