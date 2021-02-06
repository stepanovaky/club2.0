import React, { useState } from "react";
import {
  Form,
  Checkbox,
  Button,
  Header,
  Image,
  Modal,
} from "semantic-ui-react";
import SanctionedRegistration from "./SanctionedRegistration";
import UnsanctionedRegistration from "./UnsanctionedRegistration";

function RegisterForEvent(props) {
  const [ifRegistered, setIfRegistered] = useState();
  console.log(props);

  //Enter dogs with sanction ID
  //Enter dogs without sanction ID
  return (
    <div className="registration-event">
      {/* <Button color="black" onClick={() => setIfRegistered(!ifRegistered)}>
        {ifRegistered ? "I do not have a sanction ID" : "I have a sanction ID"}
      </Button> */}
      <Button color="black" onClick={() => setIfRegistered(true)}>
        Enter dogs with sanction ID
      </Button>
      <Button color="red" onClick={() => setIfRegistered(false)}>
        Enter dogs without sanction ID
      </Button>
      <p>
        You can add multiple dogs at a time, but they must be either all
        sanctioned or all nonsanctioned.
      </p>
      {ifRegistered === undefined ? null : ifRegistered ? (
        <SanctionedRegistration
          eventId={props.id}
          sanctionedPrice={props.sanctionedPrice}
        />
      ) : (
        <UnsanctionedRegistration
          eventId={props.id}
          unsanctionedPrice={props.unsanctionedPrice}
        />
      )}
    </div>
  );
}

export default RegisterForEvent;
