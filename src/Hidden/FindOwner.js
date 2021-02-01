import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Form, Button, Container } from "semantic-ui-react";
import APIService from "../helpers/apiCalls";

function FindDog() {
  const [owner, setOwner] = useState([]);
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    const res = await APIService.findOwner(data);
    const response = await res.json();
    console.log(response);
    setOwner([response.owner]);
  };

  const displayOwner = owner.map((o) => {
    console.log(o);
    return (
      <ul>
        <li>Full name: {o.fullName}</li>
        <li>Email: {o.email}</li>
        <li>
          Is email validated?{" "}
          {o.emailValid ? "Email is validated" : "Email yet to be validated"}
        </li>
        <li>Owner ID: {o.id}</li>
        <li>Mobile phone number: {o.mobile}</li>
        <li>Home phone number: {o.landline}</li>
        <li>
          Address: {o.address} {o.city}, {o.state} {o.zipCode}{" "}
        </li>

        {/* <li>
          Dog Ids:{" "}
          {
            <ol>
              {o.dogIds.map((id) => {
                return <li>{id}</li>;
              })}
            </ol>
          }
        </li> */}
      </ul>
    );
  });

  return (
    <div className="find-owner">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Form.Group widths="equal">
            {/* <Form.Field>
              <label>
                Owner type:
                <select name="findOwnerType" ref={register}>
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                </select>
              </label>
            </Form.Field> */}
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
      <div>{owner !== undefined ? displayOwner : null}</div>
    </div>
  );
}

export default FindDog;
