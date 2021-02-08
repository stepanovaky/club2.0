import React, { useState } from "react";
import { Form, Segment, Button, Checkbox } from "semantic-ui-react";
import { useForm } from "react-hook-form";
import APIService from "../helpers/apiCalls";

function RenderOwner(props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [message, setMessage] = useState();

  const { register, handleSubmit, errors } = useForm();

  const owner = props?.owner;

  const onSubmit = (data) => {
    if (isDisabled === true) {
      setMessage("Please toggle to edit");
    } else {
      APIService.updateOwner(data);
      setMessage("Action performed successfully");
    }
  };

  const onDelete = () => {
    APIService.deleteOwner(owner);
    setMessage("Action performed successfully");
  };

  const handleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <div className="render-owner">
      <Segment>
        <p>Toggle to edit fields</p>{" "}
        <Checkbox toggle onChange={handleDisabled} />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Name
                <input
                  defaultValue={owner.fullName}
                  type="text"
                  placeholder="Owner Name"
                  name="fullName"
                  ref={register}
                  disabled={isDisabled}
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label>
                Email
                <input
                  defaultValue={owner.email}
                  type="text"
                  placeholder="Owner Email"
                  name="email"
                  ref={register}
                  disabled={isDisabled}
                />
              </label>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Mobile
                <input
                  defaultValue={owner.mobile}
                  type="text"
                  placeholder="Mobile Number"
                  name="mobile"
                  ref={register}
                  disabled={isDisabled}
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label>
                Landline
                <input
                  defaultValue={owner.email}
                  type="text"
                  placeholder="Landline Number"
                  name="landline"
                  ref={register}
                  disabled={isDisabled}
                />
              </label>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Address
                <input
                  defaultValue={owner.address}
                  type="text"
                  placeholder="Address"
                  name="address"
                  ref={register}
                  disabled={isDisabled}
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label>
                City
                <input
                  defaultValue={owner.city}
                  type="text"
                  placeholder="City"
                  name="city"
                  ref={register}
                  disabled={isDisabled}
                />
              </label>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                State
                <input
                  defaultValue={owner.state}
                  type="text"
                  placeholder="State"
                  name="state"
                  ref={register}
                  disabled={isDisabled}
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label>
                Zipcode
                <input
                  defaultValue={owner.zipcode}
                  type="text"
                  placeholder="Zipcode"
                  name="zipcode"
                  ref={register}
                  disabled={isDisabled}
                />
              </label>
            </Form.Field>
          </Form.Group>
          <Button.Group>
            <Button negative onClick={handleSubmit(onDelete)}>
              Delete{" "}
            </Button>
            <Button.Or />
            <Button type="submit" positive>
              Submit Changes
            </Button>
          </Button.Group>
          <p>{message}</p>
        </Form>
      </Segment>
    </div>
  );
}

export default RenderOwner;
