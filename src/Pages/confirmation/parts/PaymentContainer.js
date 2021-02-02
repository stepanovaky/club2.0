import React, { useContext } from "react";
import { PayPalButton } from "react-paypal-button-v2";
import { Container, Segment } from "semantic-ui-react";
import { apiContext } from "../../../App";

function PaymentContainer(props) {
  const [api, setApi] = useContext(apiContext);

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
              setApi(api + 1);
            }}
          />
        </div>
      </Container>
    </Segment>
  );
}

export default PaymentContainer;
