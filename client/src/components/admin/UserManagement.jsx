import { Box, Button } from "@mui/material";
import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";



const UserManagement = () => {
  const [rows, setRows] = useState([]);
  const columns = [
    { field: "firstName", headerName: "First Name", width: 160 },
    { field: "lastName", headerName: "Last Name", width: 160 },
    { field: "email", headerName: "Email", width: 210 },
    { field: "accountType", headerName: "Account Type", width: 130 },
    { field: "occupation", headerName: "Occupation", width: 130 },
    {
      field: "Action",
      headerName: "Action",
      sortable: false,
      renderCell: (params) => (
        <Button onClick={() => {
          blockUser(params.row._id)
          
        }} variant="contained" color="primary">
         {params.row.status===true ? "Block" : "Unblock"}
        </Button>
      ),
      width: 130,
    },
    { field: "status", headerName: "Status", width: 130, hidden: true },
  ];
  const filteredColumns = columns.filter((col) => col.field !== "status");



  

  useEffect(() => {
    const getUsers = async () => {
      users.forEach((users) => {
        setRows((row) => [
          ...row,
          {
            id: users.email,
            firstName: users.firstName,
            lastName: users.lastName,
            email: users.email,
            accountType: users.accountType,
            occupation: users.occupation,
            status: users.status,
          },
        ]);
      });
    };

    getUsers();
  }, []);

  console.log("rows", rows);
  const token = useSelector((state) => state.adminState.adminToken);
  const [users, setUsers] = useState([]);

  const getUsers = async () => {
    const response = await fetch("http://localhost:3001/admin/users", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUsers(data);
    console.log(data);
  };

  const blockUser = async (userId) => {
    const response = await fetch(`http://localhost:3001/admin/users/block/${userId}`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUsers(data);

  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box sx={{ marginTop: "100px", marginLeft: "280px", marginRight: "25px" }}>
      <h1>USERs</h1>
      <h3>User Block / Unblock</h3>

      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={users}
          columns={filteredColumns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row._id}
        />
      </Box>
    </Box>
  );
};

export default UserManagement;
