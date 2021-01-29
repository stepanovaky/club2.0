import React from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { Container, Segment } from "semantic-ui-react";

function PaymentContainer(props) {
  return (
    <Segment>
      <Container>
        <p>Total: ${props.userPays}.00</p>
        <div style={{ width: "200px" }}>
          <PayPalButton
            style={{
              color: "white",
              layout: "horizontal",
              shape: "pill",
              size: "25",
            }}
            // amount={props.userPays}
            amount="0.01"
            options={{
              shippingPreference: "NO_SHIPPING",
            }}
            onSuccess={(details, data) => {
              props.handleSuccess(details, data);
            }}
          />
        </div>
      </Container>
    </Segment>
  );
}

export default PaymentContainer;
