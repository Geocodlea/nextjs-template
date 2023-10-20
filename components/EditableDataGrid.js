"use client";

import { useState, useCallback } from "react";

import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";

import AlertMsg from "./AlertMsg";

function EditToolbar({ rows, setRows, setRowModesModel, uniqueColumn }) {
  const handleClick = () => {
    let id;
    if (rows.length === 0) {
      id = 1;
    } else {
      const lastId = rows[rows.length - 1].id;
      id = lastId + 1;
    }

    setRows((oldRows) => [...oldRows, { id, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: uniqueColumn },
    }));
  };

  return (
    <GridToolbarContainer
      sx={{ display: "flex", justifyContent: "space-between" }}
    >
      <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
        Add record
      </Button>
      <GridToolbarQuickFilter />
    </GridToolbarContainer>
  );
}

const EditableDataGrid = ({
  columnsData,
  data,
  apiURL,
  uniqueColumn,
  alertText,
}) => {
  const [alert, setAlert] = useState({ text: "", severity: "" });

  // Generate the columns array based on columnsData
  const columns = columnsData.map((item) => ({
    field: item.field,
    headerName: item.headerName,
    width: item.width,
    editable: item.editable,
  }));

  // Generate the initialRows array based on users and the dynamically generated columns
  const initialRows = data.map((item, index) => {
    const row = { id: index };

    columns.map((col) => {
      row[col.field] = item[col.field];
    });

    return row;
  });

  columns.push({
    field: "actions",
    type: "actions",
    headerName: "Actions",
    width: 100,
    cellClassName: "actions",
    getActions: ({ id }) => {
      const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

      if (isInEditMode) {
        return [
          <GridActionsCellItem
            icon={<SaveIcon />}
            label="Save"
            color="primary"
            onClick={handleSaveClick(id)}
          />,
          <GridActionsCellItem
            icon={<CancelIcon />}
            label="Cancel"
            className="textPrimary"
            onClick={handleCancelClick(id)}
          />,
        ];
      }

      return [
        <GridActionsCellItem
          icon={<EditIcon />}
          label="Edit"
          className="textPrimary"
          onClick={handleEditClick(id)}
        />,
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={handleDeleteClick(id)}
          color="error"
        />,
      ];
    },
  });

  const [rows, setRows] = useState(initialRows);
  const [rowModesModel, setRowModesModel] = useState({});

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => async () => {
    const rowToDelete = rows.find((row) => row.id === id);

    try {
      const response = await fetch(
        `/api/${apiURL}/${rowToDelete[uniqueColumn]}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        // Check for non-successful HTTP status codes
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      setAlert({
        text: `Successfully deleted ${alertText}`,
        severity: "success",
      });

      setRows(rows.filter((row) => row.id !== id));
    } catch (error) {
      // Handle any errors that occurred during the fetch operation
      setAlert({ text: `Error deleting ${alertText}`, severity: "error" });
    }
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const processRowUpdate = useCallback(async (newRow, oldRow) => {
    // Make the HTTP request to save in the backend
    const body = {};

    columnsData.map((col) => {
      body[col.field] = newRow[col.field];
    });

    if (newRow.isNew) {
      try {
        const response = await fetch(`/api/${apiURL}`, {
          method: "POST",
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          // Check for non-successful HTTP status codes
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        setAlert({
          text: `Successfully created ${alertText}`,
          severity: "success",
        });

        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
      } catch (error) {
        // Handle any errors that occurred during the fetch operation
        setAlert({ text: `Error creating ${alertText}`, severity: "error" });
      }
    } else {
      try {
        const response = await fetch(`/api/${apiURL}/${oldRow[uniqueColumn]}`, {
          method: "PUT",
          body: JSON.stringify(body),
        });

        if (!response.ok) {
          // Check for non-successful HTTP status codes
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        setAlert({
          text: `Successfully updated ${alertText}`,
          severity: "success",
        });

        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
      } catch (error) {
        // Handle any errors that occurred during the fetch operation
        setAlert({ text: `Error updating ${alertText}`, severity: "error" });
      }
    }
  });

  const handleProcessRowUpdateError = useCallback((error) => {
    setAlert({ text: `Error updating ${alertText}`, severity: "error" });
  }, []);

  return (
    <Box
      sx={{
        height: 500,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        disableColumnFilter
        disableColumnSelector
        disableDensitySelector
        processRowUpdate={processRowUpdate}
        onProcessRowUpdateError={handleProcessRowUpdateError}
        editMode="row"
        rowModesModel={rowModesModel}
        onRowModesModelChange={handleRowModesModelChange}
        onRowEditStop={handleRowEditStop}
        slots={{ toolbar: EditToolbar }}
        slotProps={{
          toolbar: {
            rows,
            setRows,
            setRowModesModel,
            uniqueColumn,
          },
        }}
      />
      <AlertMsg alert={alert} />
    </Box>
  );
};

export default EditableDataGrid;
