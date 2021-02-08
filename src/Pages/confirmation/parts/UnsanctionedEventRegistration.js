import React, { useState, useContext } from "react";
import { Form, Button, Header, Segment } from "semantic-ui-react";
import { useForm, useFieldArray } from "react-hook-form";
import { format } from "date-fns";
import APIService from "../../../helpers/apiCalls";
import { apiContext } from "../../../App";

// import { apiUrl } from "../../helpers/backend";

function UnsanctionedEventRegistration(props) {
  const [api, setApi] = useContext(apiContext);
  const [counter, setCounter] = useContext(apiContext);
  const [owners, setOwner] = useState([props.owners]);
  const [dogs, setDogs] = useState(props.dogs);
  const [isDisabled, setIsDisabled] = useState(true);
  const {
    control,
    register,
    handleSubmit,
    getValues,
    errors,
    reset,
    setValue,
  } = useForm();

  const onSubmit = async (form) => {
    setOwner(form.owners);
    setDogs(form.dogs);
  };

  const removeDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  if (props.success ) {
    const sendInfo = async () => {
      APIService.unsanctionedRegistration({
        owners: owners,
        dogs: dogs,
        eventId: props.eventId,
      });
    };
    sendInfo();
    // const sendInfo = async () => {
    //   const postDog = await fetch(`${apiUrl}/api/event/add/unsanctioned`, {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       owners: owners,
    //       dogs: dogs,
    //       eventId: props.eventId,
    //     }),
    //   });
    // };
    // sendInfo();
  }

  return (
    <Form onChange={handleSubmit(onSubmit)}>
      <Header as="h2">Primary Owner Information</Header>
      {owners.map((owner, index) => {
        return (
          <Segment>
            <Form.Group widths="equal">
              <Form.Field>
                <label>
                  First name{" "}
                  <input
                    defaultValue={owner.firstName}
                    type="text"
                    placeholder="First name"
                    disabled={isDisabled}
                    name={`owners[${index}].firstName`}
                    ref={register({ required: true, maxLength: 80 })}
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label>
                  Last name
                  <input
                    defaultValue={owner.lastName}
                    type="text"
                    placeholder="Last name"
                    disabled={isDisabled}
                    name={`owners[${index}].lastName`}
                    ref={register({ required: true, maxLength: 100 })}
                  />
                </label>
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>
                Email{" "}
                <input
                  defaultValue={owner.email}
                  type="text"
                  placeholder="Email"
                  name={`owners[${index}].email`}
                  ref={register({
                    required: true,
                    pattern: /^\S+@\S+$/i,
                  })}
                  disabled={isDisabled}
                />
              </label>
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Field>
                <label>
                  Mobile number{" "}
                  <input
                    defaultValue={owner.mobile}
                    type="tel"
                    placeholder="Mobile number"
                    name={`owners[${index}].mobile`}
                    ref={register({
                      required: true,
                      minLength: 6,
                      maxLength: 12,
                    })}
                    disabled={isDisabled}
                  />
                </label>
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>
                  Address Line 1{" "}
                  <input
                    defaultValue={owner.addressOne}
                    type="text"
                    placeholder="Address Line 1"
                    name={`owners[${index}].addressOne`}
                    ref={register({ required: true })}
                    disabled={isDisabled}
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label>
                  Address Line 2{" "}
                  <input
                    defaultValue={owner.addressTwo}
                    type="text"
                    placeholder="Address Line 2"
                    name={`owners[${index}].addressTwo`}
                    ref={register}
                    disabled={isDisabled}
                  />
                </label>
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>
                  Zip code{" "}
                  <input
                    defaultValue={owner.zipCode}
                    type="number"
                    placeholder="Zip code"
                    name={`owners[${index}].zipCode`}
                    ref={register({ required: true })}
                    disabled={isDisabled}
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label>
                  City{" "}
                  <input
                    defaultValue={owner.city}
                    type="text"
                    placeholder="City"
                    name={`owners[${index}].city`}
                    ref={register({ required: true })}
                    disabled={isDisabled}
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label>
                  State{" "}
                  <input
                    defaultValue={owner.state}
                    type="text"
                    placeholder="State"
                    name={`owners[${index}].state`}
                    ref={register({ required: true })}
                    disabled={isDisabled}
                  />
                </label>
              </Form.Field>
            </Form.Group>
          </Segment>
        );
      })}
      <Header as="h2">Dog Information</Header>
      {dogs.map((dog, index) => {
        return (
          <Segment>
            <p>
              <strong>{dog.registeredName}</strong>
            </p>

            {/* placeholder */}

            <Form.Group widths="equal">
              <Form.Field>
                <label>
                  Registered name
                  <input
                    defaultValue={dog.registeredName}
                    type="text"
                    placeholder="Registered Name"
                    name={`dogs[${index}].registeredName`}
                    ref={register}
                    disabled={isDisabled}
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label>
                  Call Name
                  <input
                    defaultValue={dog.callName}
                    type="text"
                    placeholder="Call Name"
                    name={`dogs[${index}].callName`}
                    ref={register}
                    disabled={isDisabled}
                  />
                </label>
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>
                  Registration Number
                  <input
                    defaultValue={dog.akcNumber}
                    type="text"
                    placeholder="AKC Number"
                    name={`dogs[${index}].akcNumber`}
                    ref={register}
                    disabled={isDisabled}
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label>
                  Microchip
                  <input
                    type="text"
                    placeholder="Microchip"
                    name={`dogs[${index}].microchip`}
                    ref={register}
                    defaultValue={
                      dog.microchip === ""
                        ? "No microchip added"
                        : dog.microchip
                    }
                    disabled={isDisabled}
                  />
                </label>
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>
                  Gender
                  <input
                    defaultValue={dog.gender}
                    type="text"
                    placeholder="Gender"
                    name={`dogs[${index}].gender`}
                    ref={register}
                    disabled={isDisabled}
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label>
                  Breed
                  <input
                    type="text"
                    placeholder="Breed"
                    name={`dogs[${index}].breed`}
                    ref={register}
                    defaultValue={dog.breed}
                    disabled={isDisabled}
                  />
                </label>
              </Form.Field>

              <Form.Field>
                <label>
                  DOB
                  <input
                    type="text"
                    placeholder="DOB"
                    name={`dogs[${index}].dob`}
                    ref={register}
                    defaultValue={format(new Date(dog.dob), "MMM do yyyy")}
                    disabled={isDisabled}
                  />
                </label>
              </Form.Field>
            </Form.Group>
          </Segment>
        );
      })}{" "}
      <Button.Group>
        <Button negative onClick={removeDisabled}>
          Edit
        </Button>
      </Button.Group>
    </Form>
  );
}

export default UnsanctionedEventRegistration;
