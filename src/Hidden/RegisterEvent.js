import React from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container } from "semantic-ui-react";

function RegisterEvent() {
  const { register, handleSubmit, errors } = useForm();
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
      {/* onSubmit={handleSubmit(onSubmit)} */}
      <Form>
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
        </Container>
      </Form>
    </div>
  );
}

export default RegisterEvent;
