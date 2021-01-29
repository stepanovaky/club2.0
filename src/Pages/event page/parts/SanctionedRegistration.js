import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Container,
  Header,
  Button,
  Form,
  Segment,
  Label,
  Table,
} from "semantic-ui-react";
// import { apiUrl } from "../../../helpers/backend";
import { useHistory } from "react-router-dom";

function SanctionedRegistration(props) {
  console.log(props);
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState();
  const [sanction, setSanction] = useState();
  const [addedDogs, setAddedDogs] = useState([]);
  const [callNameOfDog, setCallName] = useState();
  const [repeatMessage, setRepeatMessage] = useState();
  const [disableAddDog, setDisableAddDog] = useState(false);

  const history = useHistory();

  const onSubmit = async () => {
    console.log(addedDogs);
    history.push("/confirm", {
      eventId: props.eventId,
      sanctionedEventRegistration: addedDogs,
      sanctionedPrice: props.sanctionedPrice,
    });
  };

  //   const findDogByCallName = () => {
  //     const callName = document.getElementById("call");
  //     console.log(callName.value);

  //     for (const dog of addedDogs) {
  //       console.log(dog);
  //       if (callName.value === dog.callName) {
  //         // console.log("true");
  //         setRepeatMessage("Dog already added");
  //         setDisableAddDog(true);
  //       } else if (callName !== dog.callName) {
  //         setDisableAddDog(false);
  //         // console.log("false");
  //         setRepeatMessage("");
  //       }
  //     }
  //     fetchDogByCallName(callName.value.toLowerCase());
  //   };

  //   const findDogBySanctionId = () => {
  //     const sanctionId = document.getElementById("sanction");
  //     console.log(sanctionId.value);

  //     for (const dog of addedDogs) {
  //       console.log(dog);
  //       if (sanctionId.value === dog.sanctionId) {
  //         // console.log("true");
  //         setRepeatMessage("Dog already added");
  //         setDisableAddDog(true);
  //       } else if (sanctionId.value !== dog.sanctionId) {
  //         setDisableAddDog(false);
  //         // console.log("false");
  //         setRepeatMessage("");
  //       }
  //     }
  //     fetchDogBySanctionId(sanctionId.value.toLowerCase());
  //   };

  //   const addSanctionedDog = (data) => {
  //     console.log(data);
  //     // setCallName("");
  //     // setSanction("");
  //     setSanction("");

  //     document.getElementById("form").reset();

  //     setAddedDogs((addedDogs) => [...addedDogs, data]);
  //     console.log(addedDogs);
  //   };

  //   const resetAddedDogs = () => {
  //     setAddedDogs([]);
  //   };

  //   const fetchDogByCallName = async (name) => {
  //     const fetchDogByCallName = await fetch(
  //       `${apiUrl}/api/register/event/sanctioned/callname`,
  //       {
  //         method: "GET",
  //         headers: {
  //           dog: JSON.stringify(name),
  //         },
  //       }
  //     );
  //     const response = await fetchDogByCallName.json();
  //     console.log(response.message);
  //     if (response.message === "No such dog") {
  //       setSanction("");
  //       setMessage(response.message);
  //     } else {
  //       setMessage();
  //       setSanction(response.message);
  //     }
  //   };

  //   const fetchDogBySanctionId = async (id) => {
  //     const fetchDogBySanctionId = await fetch(
  //       `${apiUrl}/api/register/event/sanctioned/sanctionid`,
  //       {
  //         method: "GET",
  //         headers: {
  //           dog: JSON.stringify(id),
  //         },
  //       }
  //     );
  //     const response = await fetchDogBySanctionId.json();
  //     console.log(response.message);
  //     if (response.message === "No such dog") {
  //       setCallName("");
  //       setMessage(response.message);
  //     } else {
  //       setMessage();
  //       setCallName(response.message);
  //     }
  //   };

  return (
    <div className="sanctioned-registration">
      <Segment vertical>
        <Form id="form">
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Call Name *
                <input
                  //   onChange={findDogByCallName}
                  id="call"
                  type="text"
                  defaultValue={callNameOfDog}
                  placeholder="Call name"
                  name="callName"
                  ref={register()}
                />
              </label>
              <p>{message}</p>
              <p>{repeatMessage}</p>
            </Form.Field>
            <Form.Field>
              <label>
                Sanction ID
                <input
                  id="sanction"
                  //   onChange={findDogBySanctionId}
                  required
                  type="text"
                  defaultValue={sanction}
                  placeholder="Sanction ID"
                  name="sanctionId"
                  ref={register({ required: true })}
                />
              </label>
            </Form.Field>
          </Form.Group>
          <Button.Group>
            <Button
              disabled={disableAddDog}
              //   onClick={handleSubmit(addSanctionedDog)}
            >
              Add Dog
            </Button>
          </Button.Group>
          {addedDogs.length !== 0 ? (
            <Segment>
              <p>
                <strong>Added Dogs:</strong>
              </p>
              <Table basic="very" collapsing padded columns={2}>
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
                          <p>{dog.callName}</p>
                        </Table.Cell>
                        <Table.Cell>
                          <p>{dog.sanctionId}</p>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
              <Button.Group>
                {/* <Button onClick={resetAddedDogs}>Reset</Button> */}
                <Button.Or />
                <Button onClick={onSubmit}>Submit</Button>
              </Button.Group>
            </Segment>
          ) : null}
        </Form>
      </Segment>
    </div>
  );
}

export default SanctionedRegistration;
