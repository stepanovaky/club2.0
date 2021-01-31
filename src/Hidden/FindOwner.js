import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { Form, Button, Container } from "semantic-ui-react";

function FindDog() {
  const [owner, setOwner] = useState([]);
  const { register, handleSubmit, errors } = useForm();
  // const onSubmit = async (data) => {
  //   console.log(data);
  //   const fetchOwner = await fetch(`${apiUrl}/api/find/owner`, {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //       data: JSON.stringify(data),
  //     },
  //   });
  //   const response = fetchOwner;

  //   if (response.status === 200) {
  //     const fetchResponse = await response.json();
  //     console.log(fetchResponse);
  //     setOwner([JSON.parse(fetchResponse.message)]);
  //   }
  //   if (response.status === 400) {
  //     const fetchResponse = await response.json();
  //     console.log(fetchResponse);
  //   }
  // };

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
        <li>Mobile phone number: {o.phoneNumberMobile}</li>
        <li>Home phone number: {o.phoneNumberLandline}</li>
        <li>
          Address: {o.address} {o.city}, {o.state} {o.zipCode}{" "}
        </li>

        <li>
          Dog Ids:{" "}
          {
            <ol>
              {o.dogIds.map((id) => {
                return <li>{id}</li>;
              })}
            </ol>
          }
        </li>
      </ul>
    );
  });

  return (
    <div className="find-owner">
      {/* onSubmit={handleSubmit(onSubmit)} */}
      <Form>
        <Container>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Owner type:
                <select name="findOwnerType" ref={register}>
                  <option value="primary">Primary</option>
                  <option value="secondary">Secondary</option>
                </select>
              </label>
            </Form.Field>
            <Form.Field>
              <label>
                Find owner by:
                <select name="findOwner" ref={register}>
                  <option value="email">Email * preferred</option>
                  <option value="id"> ID</option>
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
