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
import APIService from "../../../helpers/apiCalls";

function SanctionedRegistration(props) {
  const { register, handleSubmit } = useForm();
  const [message, setMessage] = useState();
  const [sanction, setSanction] = useState();
  const [addedDogs, setAddedDogs] = useState([]);
  const [callNameOfDog, setCallName] = useState();
  const [repeatMessage, setRepeatMessage] = useState();
  const [disableAddDog, setDisableAddDog] = useState(false);

  const history = useHistory();

  const onSubmit = async () => {
    const res = await APIService.checkIfEventRegistered({eventId: props.eventId, sanctioned: addedDogs})


    if (res === true) {
      history.push('/confirm', {
        eventId : props.eventId,
        sanctionedEventRegistration: addedDogs,
        sanctionedPrice : props.sanctionedPrice,
      });
    } else if (res !== true) {
      const response = await res.json()
      console.log(response.response);
      const messageResponse = response.response
      for (const item of messageResponse) {
        setMessage([message, item.callName] + ' already registered for this event ')
      }

    }
    //check to see if dog was previously entered
    //API call to server to check for dogs
   
  };

  const findDogByCallName = () => {
    const callName = document.getElementById("call").value.toLowerCase();

    for (const dog of addedDogs) {
      if (callName === dog.callName) {
        setRepeatMessage("Dog already added");
        setDisableAddDog(true);
      } else if (callName !== dog.callName) {
        setDisableAddDog(false);
        setRepeatMessage("");
      }
    }
    fetchDogByCallName(callName.toLowerCase());
  };

  const fetchDogByCallName = async (name) => {
    const res = await APIService.findDog({
      findDogs: "callName * preferred",
      dogItem: name,
    });
    const response = await res.json();
    setSanction(response.dog?.dog?.sanctionId);

  };

  

  const findDogBySanctionId = () => {
    const sanctionId = document.getElementById("sanction").value.toLowerCase();

    for (const dog of addedDogs) {
      if (sanctionId === dog.sanctionId) {
        setRepeatMessage("Dog already added");
        setDisableAddDog(true);
      } else if (sanctionId !== dog.sanctionId) {
        setDisableAddDog(false);
        setRepeatMessage("");
      }
    }
    fetchDogBySanctionId(sanctionId.toLowerCase());
  };

  const fetchDogBySanctionId = async (sanctionId) => {
    const res = await APIService.findDog({
      findDogs: "sanctionId",
      dogItem: sanctionId,
    });
    const response = await res.json();
    setCallName(response.dog?.dog?.callName);
  };

  const addSanctionedDog = (data) => {
    setCallName("");
    setSanction("");
    setSanction("");

    document.getElementById("form").reset();

    setAddedDogs((addedDogs) => [...addedDogs, data]);
  };

  const resetAddedDogs = () => {
    setAddedDogs([]);
  };

  return (
    <div className="sanctioned-registration">
      <Segment vertical>
        <Form id="form">
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Call Name *
                <input
                  onChange={findDogByCallName}
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
                Sanction ID (only lower case)
                <input
                  id="sanction"
                  onChange={findDogBySanctionId}
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
              onClick={handleSubmit(addSanctionedDog)}
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
                <Button onClick={resetAddedDogs}>Reset</Button>
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
