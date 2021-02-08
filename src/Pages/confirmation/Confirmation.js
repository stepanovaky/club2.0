import React, { useEffect, useState, useContext } from "react";
import ClubRegistrationConfirmation from "./parts/ClubRegistrationConfirmation";
import SanctionedEventRegistration from "./parts/SanctionedEventRegistration";
import UnsanctionedEventRegistration from "./parts/UnsanctionedEventRegistration";

// import { PayPalButton } from "react-paypal-button-v2";
// import { Container, Segment } from "semantic-ui-react";

import PaymentContainer from "./parts/PaymentContainer";

// const PayPalButton = paypal.Buttons.driver("react", { React, ReactDOM });

function ConfirmationPage(props) {
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState();
  // const [counter, setCounter] = useState(0);
  //if parent re-renders, child re-renders


  let numDogs;

  if (props.location.state.clubRegistration) {
    numDogs = props.location.state.clubRegistration.dogs.length;
  } else if (props.location.state.sanctionedEventRegistration) {
    numDogs = props.location.state.sanctionedEventRegistration.length;
  } else if (props.location.state.nonsanctionedEventRegistration) {
    numDogs = props.location.state.nonsanctionedEventRegistration.dogs.length;
  }

  //
  const [price, setPrice] = useState();

  const userPays = price * numDogs;

  useEffect(() => {
    if (props.location.state.clubRegistration) {
      setPrice(15);
    } else if (props.location.state.sanctionedEventRegistration) {
      setPrice(props.location.state.sanctionedPrice);
    } else {
      setPrice(props.location.state.nonsanctionedPrice);
    }
  }, []);

  // let counter = 0;

  const handleSuccess = (details, data) => {
    setSuccess(true);
    setMessage(
      "Success! " + "Transaction completed by " + details.payer.name.given_name
    );
    // setCounter(counter + 1);
  };

  return (
    <div className="confirmation-page">
      {props.location.state.clubRegistration ? (
        <ClubRegistrationConfirmation
          success={success}
          data={props.location.state.clubRegistration}
        />
      ) : null}
      {props.location.state.sanctionedEventRegistration ? (
        <SanctionedEventRegistration
          eventId={props.location.state.eventId}
          success={success}
          data={props.location.state.sanctionedEventRegistration}
        />
      ) : null}
      {props.location.state.nonsanctionedEventRegistration ? (
        <UnsanctionedEventRegistration
          data={props.location.state.nonsanctionedEventRegistration}
          dogs={props.location.state.nonsanctionedEventRegistration.dogs}
          owners={props.location.state.nonsanctionedEventRegistration.owners}
          eventId={props.location.state.eventId}
          success={success}
        />
      ) : null}

     
      <PaymentContainer handleSuccess={handleSuccess} userPays={userPays} />
     
      <h5>{message}</h5>
    </div>
  );
}

export default ConfirmationPage;
