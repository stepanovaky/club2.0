import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Form, Button, Container } from "semantic-ui-react";
import RenderDog from "./RenderDog";
import APIService from "../helpers/apiCalls";

function FindDog() {
  const [dog, setDog] = useState([]);
  const [owner, setOwner] = useState();
  const [message, setMessage] = useState();
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    console.log(data);
    const res = await APIService.findDog(data);
    const response = await res.json();
    console.log(response);
    console.log(response.dog);
    setDog([response.dog.dog]);
    setOwner(response.dog.owner);
    // const response = JSON.parse(res);
  };

  console.log(owner);

  const displayDog =
    dog.length >= 1 && dog !== undefined
      ? dog === undefined
        ? null
        : dog.map((d, index) => {
            return (
              <div key={index}>
                <RenderDog dog={d} owner={owner} />
              </div>
            );
          })
      : null;

  return (
    <div className="find-dog">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Find Dog by:
                <select name="findDogs" ref={register}>
                  <option value="callName * preferred">
                    {" "}
                    Call Name * preferred
                  </option>
                  <option value="registrationNumber">
                    Registration Number
                  </option>
                  <option value="registeredName">Registered Name</option>
                  <option value="sanctionId"> Sanction ID</option>
                </select>
              </label>
            </Form.Field>
            <Form.Field>
              <label>
                Input
                <input type="text" name="dogItem" ref={register} />
              </label>
            </Form.Field>
          </Form.Group>
        </Container>{" "}
        <p>{message}</p>
        <Button type="submit">Submit</Button>
      </Form>

      <div>{dog.length === 0 ? null : displayDog}</div>
    </div>
  );
}

export default FindDog;
