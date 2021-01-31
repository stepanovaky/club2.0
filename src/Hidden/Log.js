import React, { useState, useEffect } from "react";
import { Icon, Table, Pagination, Button } from "semantic-ui-react";
import { format, addDays } from "date-fns";
import APIService from "../helpers/apiCalls";

function Log() {
  const [logs, setLog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(20);
  const [pageNumbers, setPageNumbers] = useState([]);

  // const fetchLog = async () => {
  //   const fetchLogItems = await fetch(`${apiUrl}/api/log/retrieve`);

  //   const response = fetchLogItems;
  //   const list = await response.json();
  //   console.log(list);
  //   setLog(list);
  // };

  console.log(logs);

  const bubbleSort = (arr) => {
    let temp;
    // console.log(new Date(arr[0].startDate).getTime());
    for (let i = arr.length - 1; i > 0; i--) {
      for (let j = 0; j < i; j++) {
        if (
          new Date(arr[j].transaction.timestamp._seconds).getTime() >
          new Date(arr[j + 1].transaction.timestamp._seconds).getTime()
        ) {
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
  console.log(sortedLogs);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = sortedLogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(logs.length / postsPerPage);

  useEffect(() => {
    const fetchLogs = async () => {
      const res = await APIService.getLogs();
      console.log(res);
      const response = await res.json();
      let setResponse = [...new Set(response.logs)];
      console.log(setResponse);
      setLog([setResponse]);
    };
    fetchLogs();
  }, []);

  // console.log(logs);

  // const handleDownload = async () => {
  //   const fetchExcel = fetch(`${apiUrl}/api/log/write/excel`);

  //   const response = await fetchExcel;
  //   console.log(response.url);
  //   window.open(response.url, "_self");
  // };

  return (
    <div className="log">
      <div className="container">
        {/* <Button onClick={handleDownload}>Download Log</Button> */}
        <Pagination
          onPageChange={onChange}
          defaultActivePage={1}
          totalPages={totalPages}
        />

        <Table striped compact unstackable celled structured>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Transaction ID</Table.HeaderCell>
              <Table.HeaderCell>Transaction Type</Table.HeaderCell>
              <Table.HeaderCell>Transaction Date and Time</Table.HeaderCell>
              <Table.HeaderCell>Event Name</Table.HeaderCell>
              <Table.HeaderCell>Event Date</Table.HeaderCell>
              <Table.HeaderCell>Owner Name</Table.HeaderCell>
              <Table.HeaderCell>Owner Email</Table.HeaderCell>
              <Table.HeaderCell>Owner Phone Number</Table.HeaderCell>
              <Table.HeaderCell>Owner Address</Table.HeaderCell>
              <Table.HeaderCell>Owner City</Table.HeaderCell>
              <Table.HeaderCell>Owner State</Table.HeaderCell>
              <Table.HeaderCell>Owner Zipcode</Table.HeaderCell>
              <Table.HeaderCell>Dogs</Table.HeaderCell>
              {/* <Table.HeaderCell>Dog Call Name</Table.HeaderCell>
              <Table.HeaderCell>Dog Registration Number</Table.HeaderCell>
              <Table.HeaderCell>Dog ID</Table.HeaderCell>
              <Table.HeaderCell>Dog Breed</Table.HeaderCell>
              <Table.HeaderCell>Dog DOB</Table.HeaderCell>
              <Table.HeaderCell>Dog Gender</Table.HeaderCell>
              <Table.HeaderCell>Dog Microchip</Table.HeaderCell>
              <Table.HeaderCell>Dog Sanction ID</Table.HeaderCell>
              <Table.HeaderCell>Dog Registration Papers Type</Table.HeaderCell>
              <Table.HeaderCell>Dog Registration Papers URL</Table.HeaderCell> */}
              <Table.HeaderCell>Secondary Owner Name</Table.HeaderCell>
              <Table.HeaderCell>Secondary Owner Email</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {currentPosts.map((log) => {
              return (
                <Table.Row key={log.transactionId}>
                  <Table.Cell>{log.transactionId}</Table.Cell>
                  <Table.Cell>{log.type}</Table.Cell>
                  {/* <Table.Cell>
                    {log.transaction.timestamp !== undefined
                      ? format(
                          addDays(log.transaction.timestamp._seconds, 1),
                          "MMM do, h:mm"
                        )
                      : format(
                          addDays(log.transaction.timeStamp._seconds, 1),
                          "MMM do, h:mm"
                        )}
                  </Table.Cell> */}
                  <Table.Cell>
                    {log.transaction.eventName
                      ? log.transaction.eventName
                      : null}
                  </Table.Cell>
                  <Table.Cell>
                    {log.transaction.eventDate
                      ? format(
                          new Date(log.transaction.eventDate),
                          "MMM do, yyyy"
                        )
                      : null}
                  </Table.Cell>
                  <Table.Cell>
                    {log.transaction.primary
                      ? log.transaction.primary.firstName +
                        " " +
                        log.transaction.primary.lastName
                      : typeof log.transaction.owner === "string" ||
                        log.transaction.owner instanceof String
                      ? null
                      : log.transaction.owner[0].firstName +
                        " " +
                        log.transaction.owner[0].lastName}
                  </Table.Cell>
                  <Table.Cell>
                    {log.transaction.primary
                      ? log.transaction.primary.email
                      : typeof log.transaction.owner === "string" ||
                        log.transaction.owner instanceof String
                      ? log.transaction.owner
                      : log.transaction.owner[0].email}
                  </Table.Cell>
                  <Table.Cell>
                    {log.transaction.primary
                      ? log.transaction.primary.phone
                      : typeof log.transaction.owner === "string" ||
                        log.transaction.owner instanceof String
                      ? null
                      : log.transaction.owner[0].mobile}
                  </Table.Cell>
                  <Table.Cell>
                    {log.transaction.primary
                      ? log.transaction.primary.address
                      : typeof log.transaction.owner === "string" ||
                        log.transaction.owner instanceof String
                      ? null
                      : log.transaction.owner[0].addressOne +
                        " " +
                        log.transaction.owner[0].addressTwo}
                  </Table.Cell>
                  <Table.Cell>
                    {log.transaction.primary
                      ? log.transaction.primary.city
                      : typeof log.transaction.owner === "string" ||
                        log.transaction.owner instanceof String
                      ? null
                      : log.transaction.owner[0].city}
                  </Table.Cell>
                  <Table.Cell>
                    {log.transaction.primary
                      ? log.transaction.primary.state
                      : typeof log.transaction.owner === "string" ||
                        log.transaction.owner instanceof String
                      ? null
                      : log.transaction.owner[0].state}
                  </Table.Cell>
                  <Table.Cell>
                    {log.transaction.primary
                      ? log.transaction.primary.zipCode
                      : typeof log.transaction.owner === "string" ||
                        log.transaction.owner instanceof String
                      ? null
                      : log.transaction.owner[0].zipCode}
                  </Table.Cell>
                  {log.transaction.dogs.map((dog) => {
                    return (
                      <div>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Registered Name</Table.HeaderCell>
                            <Table.HeaderCell>Call Name</Table.HeaderCell>
                            <Table.HeaderCell>
                              Registration Number
                            </Table.HeaderCell>
                            <Table.HeaderCell>ID</Table.HeaderCell>
                            <Table.HeaderCell>Breed</Table.HeaderCell>
                            <Table.HeaderCell>DOB</Table.HeaderCell>
                            <Table.HeaderCell>Gender</Table.HeaderCell>
                            <Table.HeaderCell>Microchip</Table.HeaderCell>
                            <Table.HeaderCell>Sanction ID</Table.HeaderCell>
                            <Table.HeaderCell>
                              Registration Papers
                            </Table.HeaderCell>
                            <Table.HeaderCell>
                              Registration Papers URL
                            </Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Row>
                          <Table.Cell>{dog.registeredName}</Table.Cell>
                          <Table.Cell> {dog.callName}</Table.Cell>
                          <Table.Cell>{dog.akcNumber}</Table.Cell>
                          <Table.Cell>{dog.id ? dog.id : null}</Table.Cell>
                          <Table.Cell>{dog.breed}</Table.Cell>
                          <Table.Cell>{dog.dob}</Table.Cell>
                          <Table.Cell>{dog.gender}</Table.Cell>
                          <Table.Cell>{dog.microchip}</Table.Cell>
                          <Table.Cell>
                            {dog.sanctionId ? dog.sanctionId : null}
                          </Table.Cell>
                          <Table.Cell>
                            {dog.registrationPapersType
                              ? dog.registrationPapersType
                              : null}
                          </Table.Cell>
                          <Table.Cell>
                            {dog.registrationPapersUrl
                              ? dog.registrationPapersUrl
                              : null}
                          </Table.Cell>
                        </Table.Row>
                      </div>
                    );
                  })}
                  {log.transaction.secondary
                    ? log.transaction.secondary.map((owner) => {
                        return (
                          <div>
                            <Table.Header>
                              <Table.Row>
                                <Table.HeaderCell>First Name</Table.HeaderCell>
                                <Table.HeaderCell>Last Name</Table.HeaderCell>
                                <Table.HeaderCell>Email</Table.HeaderCell>
                              </Table.Row>
                            </Table.Header>
                            <Table.Row>
                              <Table.Cell>{owner.firstName}</Table.Cell>
                              <Table.Cell>{owner.lastName}</Table.Cell>
                              <Table.Cell>{owner.email}</Table.Cell>
                            </Table.Row>
                          </div>
                        );
                      })
                    : null}
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}

export default Log;
{
  /* {log.map((l) => {
            return <p>{l.transactionId}</p>;
          })} */
}
