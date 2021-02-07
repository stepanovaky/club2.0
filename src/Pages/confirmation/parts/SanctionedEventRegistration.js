import React, { useContext } from "react";
import {
  Container,
  Header,
  Button,
  Form,
  Segment,
  Label,
  Table,
} from "semantic-ui-react";
import APIService from "../../../helpers/apiCalls";
import { apiContext } from "../../../App";

// import { apiUrl } from "../../helpers/backend";

function SanctionedEventRegistration(props) {
  const [api, setApi] = useContext(apiContext);
  const [counter, setCounter] = useContext(apiContext);
  console.log(props);
  const addedDogs = props.data;
  console.log(addedDogs);

  if (props.success === true && api === 0 && counter === 0) {
    console.log("this far");
    const sendData = async () => {
      APIService.sanctionedRegistration({
        addedDogs: props.data,
        eventId: props.eventId,
      });
      setApi(api + 1);
      setCounter(counter + 1);
    };

    sendData();
    // console.log("almost");
    // const sendData = async () => {
    //   console.log("this far");
    //   const postDog = await fetch(`${apiUrl}/api/event/add/sanctioned`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ addedDogs: addedDogs, eventId: props.eventId }),
    //   });
    // };
    // sendData();
  }
  return (
    <div className="sanctioned-event-registration">
      {addedDogs.length !== 0 ? (
        <Segment>
          <p>
            <strong>Added Dogs:</strong>
          </p>
          <Table basic="very" collapsing padded columns={4}>
            <Table.Row>
              <Table.HeaderCell>
                <p>
                  <strong>Call Name</strong>
                </p>
              </Table.HeaderCell>
              <Table.HeaderCell>
                <p>
                  <strong>Sanction ID</strong>
                </p>
              </Table.HeaderCell>
            </Table.Row>
            <Table.Body>
              {addedDogs.map((dog) => {
                return (
                  <Table.Row>
                    <Table.Cell>
                      <p>{dog.callName !== undefined ? dog.callName : null}</p>
                    </Table.Cell>
                    <Table.Cell>
                      <p>{dog.sanctionId}</p>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table>
          {/* <Button.Group>
            <Button onClick={resetAddedDogs}>Reset</Button>
            <Button.Or />
            <Button onClick={onSubmit}>Submit</Button>
          </Button.Group> */}
        </Segment>
      ) : null}
    </div>
  );
}

export default SanctionedEventRegistration;
