import React, { useState, useEffect } from "react";
import { Pagination, Button } from "semantic-ui-react";
import { format, addDays } from "date-fns";
import APIService from "../helpers/apiCalls";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";

function Log() {
  const [logs, setLog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [pageNumbers, setPageNumbers] = useState([]);


  const bubbleSort = (arr) => {
    let temp;
    for (let i = arr.length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        if (arr[j].id > arr[j + 1].id) {
          temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
        }
      }
    }
    return arr;
  };

  const onChange = (e, pageInfo) => {
    setCurrentPage(pageInfo.activePage);
  };

  const sortedLogs = bubbleSort(logs);

  const thing = (log) => {
    for (let i = 0; i < log.length; i++) {
      if (log[i] === log[i - 1]) {
      }
    }
  };

  thing(sortedLogs.reverse());

  //figure out code to remove duplicates

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedLogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(logs.length / postsPerPage);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await APIService.getLogs();
      const response = await res.json();

      setLog(response.log);
    };
    fetchLogs();
  }, []);

  // const handleDownload = async () => {
  //   const fetchExcel = fetch(`${apiUrl}/api/log/write/excel`);

  //   const response = await fetchExcel;
  //  
  // };

  const useRowStyles = makeStyles({
    root: {
      "& > *": {
        borderBottom: "unset",
      },
    },
  });

  function createData(
    transactionType,
    transactionDate,
    name,
    email,
    mobile,
    landline,
    address,
    city,
    state,
    zipcode,
    dogs
  ) {
    return {
      transactionType,
      transactionDate,
      name,
      email,
      mobile,
      landline,
      address,
      city,
      state,
      zipcode,
      dogs,
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useRowStyles();

    return (
      <React.Fragment>
        <TableRow className={classes.root}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell component="th" scope="row">
            {row.transactionType}
          </TableCell>
          <TableCell align="right">{row.transactionDate}</TableCell>
          <TableCell align="right">{row.name}</TableCell>
          <TableCell align="right">{row.email}</TableCell>
          <TableCell align="right">{row.mobile}</TableCell>
          <TableCell align="right"> {row.landline}</TableCell>
          <TableCell align="right">{row.address} </TableCell>
          <TableCell align="right">{row.city} </TableCell>
          <TableCell align="right">{row.state} </TableCell>
          <TableCell align="right">{row.zipcode} </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box margin={1}>
                <Typography variant="h6" gutterBottom component="div">
                  Dogs
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Call Name</TableCell>
                      <TableCell>Sanction ID</TableCell>
                      <TableCell>Exp </TableCell>
                      <TableCell>Registered Name </TableCell>
                      <TableCell>Registration Number </TableCell>
                      <TableCell>Registration Papers </TableCell>
                      <TableCell>Registration Papers URL </TableCell>
                      <TableCell>Breed </TableCell>
                      <TableCell>Gender </TableCell>
                      <TableCell>DOB </TableCell>
                      <TableCell>Microchip </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.dogs.map((dog) => (
                      <TableRow key={dog.callName}>
                        <TableCell component="th" scope="row">
                          {dog.callName}
                        </TableCell>
                        <TableCell>{dog.sanctionId}</TableCell>
                        <TableCell align="right">{dog.exp_seconds}</TableCell>
                        <TableCell align="right">
                          {dog.registeredName}
                        </TableCell>
                        <TableCell>{dog.registrationNumber} </TableCell>
                        <TableCell>{dog.registrationPapers} </TableCell>
                        <TableCell>
                          <a href={dog.registrationPapersUrl}>
                            Link to Registration Papers
                          </a>{" "}
                        </TableCell>
                        <TableCell>{dog.breed} </TableCell>
                        <TableCell>{dog.gender} </TableCell>
                        <TableCell>{dog.dob} </TableCell>
                        <TableCell>{dog.microchip} </TableCell>
                        <TableCell> Secondary Owners </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  const rows = sortedLogs.map((item) => {
    return createData(
      item.type,
      format(parseInt(item.id), "MMM/dd/yyy h:mm a"),
      item.fullName,
      item.email,
      item.mobile,
      item.landline,
      item.address,
      item.city,
      item.state,
      item.zipcode,
      item.dogs
    );
  });


  return (
    <div className="log">
      <div className="container">
        {/* <Button onClick={handleDownload}>Download Log</Button> */}
        {/* <Pagination
          onPageChange={onChange}
          defaultActivePage={1}
          totalPages={totalPages}
        /> */}

        <TableContainer component={Paper}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Transaction Type</TableCell>
                <TableCell align="right">Transaction Date</TableCell>
                <TableCell align="right">Name</TableCell>
                <TableCell align="right">Email </TableCell>
                <TableCell align="right">Mobile</TableCell>
                <TableCell align="right">Landline </TableCell>
                <TableCell align="right">Address </TableCell>
                <TableCell align="right">City </TableCell>
                <TableCell align="right">State </TableCell>
                <TableCell align="right">Zipcode </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              
              {rows.map((row, index) => (
                <Row key={index} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      
      </div>
    </div>
  );
}

export default Log;

