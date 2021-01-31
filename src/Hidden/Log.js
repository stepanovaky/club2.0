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

        <Table striped compact unstackable celled structured></Table>
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
