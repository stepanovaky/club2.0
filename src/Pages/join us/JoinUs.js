import React from "react";
import { useForm } from "react-hook-form";
import OwnerArray from "./parts/OwnerArray";
import DogArray from "./parts/DogArray";
import { Container, Header, Button, Form } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

function NestedRegistrationForm() {
  const {
    control,
    register,
    handleSubmit,
    getValues,
    errors,
    setValue,
  } = useForm();
  const history = useHistory();
  const onSubmit = async (data) => {
    history.push("/confirm", { clubRegistration: data });
  };

  return (
    <div>
      <Container text>
        <Header as="h1">Owner and Dog Registration</Header>
        <p>
          Primary owners own all the added dogs and will be notified every time
          a dog is registered for an event. Secondary owners can be customized
          to the dog and also have the ability to register a dog for an event.
          You can only add two secondary owners per dog.
        </p>
        <p>$15 per dog added</p>
        <p>* fields are required</p>
      </Container>
      <div className="registration-container">
        <Container>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <OwnerArray
              {...{ control, register, getValues, setValue, errors }}
            />
            <DogArray {...{ control, register, getValues, setValue, errors }} />
            <Button type="submit"> Submit </Button>{" "}
          </Form>{" "}
        </Container>
      </div>
    </div>
  );
}

export default NestedRegistrationForm;
