import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Checkbox, Segment } from "semantic-ui-react";
import APIService from "../helpers/apiCalls";

function RenderDog(props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [message, setMessage] = useState();
  const dog = props?.dog;
  const owner = props?.owner;


  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    if (isDisabled === true) {
      setMessage("Please toggle to edit");
    } else {
      APIService.updateDog(data);
      setMessage("Action performed successfully");
    }
  };

  const onDelete = () => {
    APIService.deleteDog(dog);
    setMessage("Action performed successfully");
  };

  const handleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  return (
    <div key={dog?.callName} className="render-dog">
      <Segment>
        <p>
          <strong>{dog?.registeredName}</strong>
        </p>
        <p>Toggle to edit fields or delete dog</p>{" "}
        <Checkbox toggle onChange={handleDisabled} />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Registered name
                <input
                  defaultValue={dog?.registeredName}
                  type="text"
                  placeholder="Registered Name"
                  name="registeredName"
                  ref={register}
                  disabled={isDisabled}
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label>
                Call Name
                <input
                  defaultValue={dog?.callName}
                  type="text"
                  placeholder="Call Name"
                  name="callName"
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
                  defaultValue={dog?.registrationNumber}
                  type="text"
                  placeholder="AKC Number"
                  name="akcNumber"
                  ref={register}
                  disabled={isDisabled}
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label>
                Sanction ID
                <input
                  type="text"
                  placeholder="Sanction ID"
                  name="sanctionId"
                  ref={register}
                  defaultValue={dog?.sanctionId}
                  disabled={isDisabled}
                />
              </label>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Registration Status
                <input
                  type="text"
                  placeholder="Registration Status"
                  name="registered"
                  ref={register}
                  defaultValue={dog?.registrationStatus}
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
                  name="registrationPapersType"
                  ref={register}
                  defaultValue={dog?.registrationPapers}
                  disabled={isDisabled}
                />
              </label>
            </Form.Field>
            {dog.registrationPapersUrl === "" ? (
              <Form.Field>
                <label>
                  Upload Registration Papers
                  <input type="file" name="file" ref={register} />
                </label>
              </Form.Field>
            ) : (
              <Button>
                <a href={dog?.registrationPapersUrl} target="_blank" download>
                  Download/View Registration Papers
                </a>
              </Button>
            )}
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Primary Owner
                <input
                  type="text"
                  placeholder="Owner Name"
                  name="ownerName"
                  defaultValue={owner?.fullName}
                  ref={register}
                  disabled={isDisabled}
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label>
                Primary Owner's Email
                <input
                  type="text"
                  placeholder="Owner Email"
                  name="ownerEmail"
                  defaultValue={owner?.email}
                  ref={register}
                  disabled={isDisabled}
                />
              </label>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Group>
              {dog.secondaryOwners?.map((owner, index) => {
                return (
                  <>
                    <Form.Field>
                      <label>
                        Secondary Owner Name {index + 1}
                        <input
                          type="text"
                          placeholder="Secondary Owner Name"
                          name={`secondary[${index}].ownerName`}
                          defaultValue={owner.fullName}
                          ref={register}
                          disabled={isDisabled}
                        />
                      </label>
                    </Form.Field>
                    <Form.Field>
                      <label>
                        Secondary Owner Email {index + 1}
                        <input
                          type="text"
                          placeholder="Secondary Owner Email"
                          name={`secondary[${index}].ownerEmail`}
                          defaultValue={owner.email}
                          ref={register}
                          disabled={isDisabled}
                        />
                      </label>
                    </Form.Field>
                  </>
                );
              })}
            </Form.Group>
            <Segment>
              <p>
                <strong>Add Times</strong>
              </p>
              <Form.Group>
                <Form.Field>
                  <label>
                    Date
                    <input
                      type="date"
                      placeholder="Date"
                      name="date"
                      ref={register}
                      disabled={isDisabled}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label>
                    Weight
                    <input
                      type="text"
                      placeholder="Weight"
                      name="weight"
                      ref={register}
                      disabled={isDisabled}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label>
                    Time
                    <input
                      type="text"
                      placeholder="Time"
                      name="time"
                      ref={register}
                      disabled={isDisabled}
                    />
                  </label>
                </Form.Field>
              </Form.Group>
            </Segment>

          
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

export default RenderDog;
