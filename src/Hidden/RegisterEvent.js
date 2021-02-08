import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container } from "semantic-ui-react";
import APIService from "../helpers/apiCalls";

function RegisterEvent() {
  const { register, handleSubmit, errors } = useForm();
  const [message, setMessage] = useState();

  const onSubmit = (data) => {
    APIService.addEvent(data);
    setMessage("Action performed successfully");
  };

  // const onSubmit = (data) => {
  //   const postEvent = fetch(`${apiUrl}/api/create/event`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
  // };

  return (
    <div className="register-event">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Event name:
                <input
                  type="text"
                  placeholder="Event name"
                  name="eventName"
                  ref={register({ required: true })}
                />
              </label>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Event start date:
                <input
                  type="date"
                  placeholder="Start date"
                  name="startDate"
                  ref={register({ required: true })}
                />
              </label>
            </Form.Field>
          </Form.Group>

          <Button type="submit">Submit</Button>
          <p>{message}</p>
        </Container>
      </Form>
    </div>
  );
}

export default RegisterEvent;
