import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";

import {
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Button,
  TextField,
  Grid,
  Checkbox,
  ListItemText,
  DialogActions,
} from "@material-ui/core";

import Popup from "../../../components/Popup";
import PageHeader from "../../../components/PageHeader";
import { PeopleAltTwoTone, PeopleOutlineTwoToneIcon } from "@material-ui/icons";
import TicketForm from "./TicketForm";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Controls from "../../../components/controls/Controls";
import useTable from "../../../components/useTable";
import { Search } from "@material-ui/icons";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import api from "../../../Services/api";
import PopDialog from "../../../components/PopDialog";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(2),
  },
  searchInput: {
    width: "50%",
    height: 40,
  },

  newButton: {
    position: "absolute",
    right: "36px",
  },
}));
export default function index() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [recordForRemove, setRecordForRemove] = useState(null);
  const [listrecordData, setlistRecordData] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [captionDialog, setCaptionDialog] = useState("");
  const headCells = [
    { id: "week", label: "Week" },
    { id: "type", label: "Type" },
    { id: "site", label: "Site" },
    { id: "subject", label: "Subject" },
    { id: "raisedby", label: "Raisedby" },
    { id: "status", label: "Status" },
    { id: "hitmiss", label: "Hit/Miss" },
    { id: "sla", label: "SLA" },
    { id: "actions", label: "Actions", disableSorting: true },
  ];

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(listrecordData, headCells, filterFn);

  const DelopenHandlerDialog = (item) => {
    setRecordForRemove(item);
    setCaptionDialog(item.customer_code);
    setOpenDialog(true);
  };
  const removeItem = () => {
    api.instance
      .delete("/wms/customer/customer-destroy/" + recordForRemove.id)
      .then((resp) => {
        console.log(resp.data);
        refreshListData();
      })
      .catch((err) => {
        console.log(err);
      });
    setOpenDialog(false);
  };
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter(
            (x) =>
              x.customer_code.toLowerCase().includes(target.value) ||
              x.customer_name.toLowerCase().includes(target.value) ||
              x.customer_category.toLowerCase().includes(target.value)
          );
      },
    });
  };
  const onSubmit = (values, resetForm) => {
    if (values.id == 0)
      api.instance
        .post("/wms/customer/customer-store", values)
        .then((resp) => {
          console.log(resp.data);
          refreshListData();
        })
        .catch((err) => {
          console.log(err);
        });
    else {
      api.instance
        .put("/wms/customer/customer-update/" + values.id, values)
        .then((resp) => {
          console.log(resp.data);
          refreshListData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };
  const refreshListData = () => {
    //const utoken = localStorage.getItem("token");
    api.instance
      .get("/core/dailytasklist", {
        // headers: {
        //   Authorization: `Bearer ${utoken}`,
        //   Accept: "application/json",
        // },
      })

      .then((resp) => {
        setlistRecordData(resp.data);
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
  //get week of the month
  function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(((d - yearStart) / 86400000 + 1) / 7);
    // Return array of year and week number
    return [d.getUTCFullYear(), weekNo];
  }
  const result = getWeekNumber(new Date());
  //end get week by month

  useEffect(() => {
    refreshListData();
  }, []);
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Link color="inherit" href="/technical-team/">
          IT Technical Team
        </Link>
        <Typography color="textPrimary">Daily Task Monitoring</Typography>
      </Breadcrumbs>

      <div>
        <Toolbar>
          <Controls.Button
            text="Add New"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
      </div>

      <Paper className={classes.pageContent}>
        <Controls.Input
          label="Search"
          className={classes.searchInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={handleSearch}
        />
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.customer_code}</TableCell>
                <TableCell>{item.customer_name}</TableCell>
                <TableCell>{item.freshness_requirement}</TableCell>
                <TableCell>{item.freshness_unit}</TableCell>
                <TableCell>{item.customer_category}</TableCell>
                <TableCell>
                  {item.status == 1 ? (
                    <CheckCircleIcon />
                  ) : (
                    <RadioButtonUncheckedRoundedIcon />
                  )}
                </TableCell>

                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      DelopenHandlerDialog(item);
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <PopDialog
        title="Delete Customer"
        description={
          "Are you sure do want to delete Supplier code " + captionDialog
        }
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      >
        <DialogActions>
          {/* <Button color="primary">Disagree</Button> */}
          <Button onClick={removeItem} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </PopDialog>

      <Popup
        title={"Week " + result[1] + " Ticket Form"}
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <TicketForm recordForEdit={recordForEdit} addOrEdit={onSubmit} />
      </Popup>
    </>
  );
}
