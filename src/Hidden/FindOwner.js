import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import RenderOwner from "./RenderOwner";
import { Form, Button, Container } from "semantic-ui-react";
import APIService from "../helpers/apiCalls";

function FindOwner() {
  const [owner, setOwner] = useState();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const res = await APIService.findOwner(data);
    const response = await res.json();
    setOwner([response.owner]);
  };

  return (
    <div className="find-owner">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Find owner by:
                <select name="findOwner" ref={register}>
                  <option value="email">Email * preferred</option>
                </select>
              </label>
            </Form.Field>
            <Form.Field>
              <label>
                Input
                <input type="text" name="ownerItem" ref={register} />
              </label>
            </Form.Field>
          </Form.Group>
        </Container>{" "}
        <Button type="submit">Submit</Button>
      </Form>
      <div>{owner !== undefined ? <RenderOwner owner={owner[0]} /> : null}</div>
    </div>
  );
}

export default FindOwner;
