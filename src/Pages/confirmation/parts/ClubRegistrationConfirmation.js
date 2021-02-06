import React, { useState, useContext } from "react";
import { Form, Button, Header, Segment } from "semantic-ui-react";
import { useForm, useFieldArray } from "react-hook-form";
import { format } from "date-fns";
import APIService from "../../../helpers/apiCalls";
import { throttle, debounce } from "throttle-debounce";
import { apiContext } from "../../../App";

// import { storageRef } from "../../../firebase";
// import { apiUrl } from "../../helpers/backend";

function ClubRegistrationConfirmation(props) {
  const [api, setApi] = useContext(apiContext);
  const [counter, setCounter] = useContext(apiContext);
  //   console.log(props);
  const success = props.success;
  const owner = props.data.owner;
  const dogs = props.data.dogs;
  const secondary = props.data.dogOwner;
  const handleNumDogs = props.handleNumDogs;
  //   console.log(owners, dogs, secondary);

  const counter1 = props.counter;
  console.log(props);

  console.log(api);

  const {
    control,
    register,
    handleSubmit,
    getValues,
    errors,
    reset,
    setValue,
  } = useForm();

  const [isDisabled, setIsDisabled] = useState(true);
  const [theData, setTheData] = useState({ data: props.data });
  //   console.log(theData);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dogs",
  });

  //counter, if the counter is not zero, don't make api call
  //^ not great

  //execute only when payment process is done
  //fires off when component re-renders

  if (success && api === 0 && counter === 0) {
    console.log("call");

    dogs.map((dog, index) => {
      if (dog.file === undefined || dog.file.length === 0) {
        console.log("thing");
      } else {
        APIService.getPdfUrl(dog.file).then((res) => {
          dogs[index].pdfUrl = res;
        });
      }
    });
    console.log(dogs);
    APIService.registerDogAndOwner({ data: { owner, dogs, secondary } });
    setApi(api + 1);
    setCounter(counter + 1);
  } else {
    console.log("call stopped");
  }

  const onSubmit = async (form) => {
    if (isDisabled === false) {
      console.log(form.owners, form.dogs, form.dogOwner);
      //   handleNumDogs(data.dogs.length);
      setTheData({
        data: {
          dogs: form.dogs,
          owner: form.owner,
          secondary: form.dogOwner,
        },
      });
    } else {
      //   console.log({ data: { owners, dogs, secondary } });
      setTheData({ data: { owner, dogs, secondary } });
    }
  };

  const removeDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  //   const amountOfDogs = dogs.length;
  //   const paymentAmount = 15.0 * amountOfDogs;
  return (
    <div className="club-registration-confirmation">
      <div className="container">
        <div className="frame">
          <Header as="h1">Confirmation for Club Sanction Application</Header>{" "}
          <Form onChange={handleSubmit(onSubmit)}>
            <Header as="h2">Primary Owner Information</Header>
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
                      name={`owner.firstName`}
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
                      name={`owner.lastName`}
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
                    name={`owner.email`}
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
                      name={`owner.mobile`}
                      ref={register({
                        required: true,
                        minLength: 6,
                        maxLength: 12,
                      })}
                      disabled={isDisabled}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label>
                    Home phone number{" "}
                    <input
                      defaultValue={owner.landline}
                      type="tel"
                      placeholder="Landline"
                      name={`owner.landline`}
                      ref={register}
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
                      name={`owner.addressOne`}
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
                      name={`owner.addressTwo`}
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
                      name={`owner.zipCode`}
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
                      name={`owner.city`}
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
                      name={`owner.state`}
                      ref={register({ required: true })}
                      disabled={isDisabled}
                    />
                  </label>
                </Form.Field>
              </Form.Group>
            </Segment>
            <Header as="h2">Dog Information</Header>
            {dogs.map((dog, index) => {
              return (
                <Segment>
                  <p>
                    <strong>{dog.registeredName}</strong>
                  </p>

                  {/* placeholder */}
                  {secondary ? (
                    <Header as="h5">
                      {dog.registeredName}'s Secondary Owner(s)
                    </Header>
                  ) : null}
                  {secondary
                    ? secondary.map((owner) => {
                        return owner.secondary.map((own, k) => {
                          return secondary.indexOf(owner) === index ? (
                            <Segment>
                              <Form.Group widths="equal">
                                <Form.Field>
                                  <label>
                                    First name{" "}
                                    <input
                                      defaultValue={own.firstName}
                                      type="text"
                                      placeholder="First name"
                                      name={`dogOwner[${index}].secondary[${k}].firstName`}
                                      ref={register({
                                        required: true,
                                        maxLength: 80,
                                      })}
                                      disabled={isDisabled}
                                    />
                                  </label>
                                </Form.Field>
                                <Form.Field>
                                  <label>
                                    Last name{" "}
                                    <input
                                      defaultValue={own.lastName}
                                      type="text"
                                      placeholder="Last name"
                                      name={`dogOwner[${index}].secondary[${k}].lastName`}
                                      ref={register({
                                        required: true,
                                        maxLength: 100,
                                      })}
                                      disabled={isDisabled}
                                    />
                                  </label>
                                </Form.Field>
                                <Form.Field>
                                  <label>
                                    Email
                                    <input
                                      defaultValue={own.email}
                                      type="text"
                                      placeholder="Email"
                                      name={`dogOwner[${index}].secondary[${k}].email`}
                                      ref={register({
                                        required: true,
                                        pattern: /^\S+@\S+$/i,
                                      })}
                                      disabled={isDisabled}
                                    />
                                  </label>
                                </Form.Field>
                              </Form.Group>
                            </Segment>
                          ) : null;
                        });
                      })
                    : null}

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
                          placeholder="Registration Number"
                          name={`dogs[${index}].registrationNumber`}
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
                          defaultValue={format(
                            new Date(dog.dob),
                            "MMM do yyyy"
                          )}
                          disabled={isDisabled}
                        />
                      </label>
                    </Form.Field>
                  </Form.Group>

                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>
                        Registration Papers
                        <input
                          type="text"
                          placeholder="Registration Papers"
                          name={`dogs[${index}].registrationPapers`}
                          ref={register}
                          defaultValue={dog.registrationPapers}
                          disabled={isDisabled}
                        />
                      </label>
                    </Form.Field>
                    {dog.file.length === 0 ? (
                      isDisabled === true ? (
                        <Form.Field>
                          <label>
                            Registration Papers
                            <input
                              type="text"
                              placeholder="Registration Papers"
                              name="registrationPapersAdded"
                              ref={register}
                              defaultValue="No registration papers added"
                              disabled={isDisabled}
                            />
                          </label>
                        </Form.Field>
                      ) : (
                        <Form.Field>
                          <label>
                            Registration Papers
                            <input
                              type="file"
                              placeholder="Registration Papers"
                              name={`dogs[${index}].file`}
                              ref={register}
                              defaultValue="No registration papers added"
                              disabled={isDisabled}
                            />
                          </label>
                        </Form.Field>
                      )
                    ) : (
                      <Form.Field>
                        <label>
                          Registration Papers
                          <input
                            type="text"
                            placeholder="Registration Papers"
                            name="file"
                            ref={register}
                            defaultValue={dog.file[0].name}
                            disabled={isDisabled}
                          />
                        </label>
                      </Form.Field>
                    )}
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
          <div id="paypal-button-container"></div>
        </div>{" "}
      </div>
    </div>
  );
}

export default ClubRegistrationConfirmation;
