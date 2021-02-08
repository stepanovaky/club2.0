import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Checkbox, Segment } from "semantic-ui-react";
import APIService from "../helpers/apiCalls";

function RenderDog(props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [message, setMessage] = useState();
  console.log(props);
  const dog = props?.dog;
  const owner = props?.owner;

  console.log(props);

  const { register, handleSubmit, errors } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    if (isDisabled === true) {
      setMessage("Please toggle to edit");
    } else {
      console.log(data);
      APIService.updateDog(data);
      setMessage("Action performed successfully");
    }
  };
  // const onSubmit = (data) => {
  //   if (data.akcNumber === undefined) {
  //     setMessage("Please toggle to edit");
  //   } else {
  //     if (data.file === undefined || data.file.length === 0) {
  //       console.log(data);
  //       setMessage();
  //       const toSend = async () => {
  //         const sendUpdate = fetch(`${apiUrl}/api/update/dog`, {
  //           method: "POST",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //           body: JSON.stringify(data),
  //         });

  //         const response = await sendUpdate;
  //         if (response.status === 200) {
  //           const fetchResponse = await response.json();
  //           console.log(fetchResponse.message);
  //           setMessage(fetchResponse.message);
  //         }
  //       };

  //       toSend();
  //     } else {
  //       const url = async () => {
  //         //   console.log("here");
  //         const uploadTask = await storageRef
  //           .child(`dog/${data.akcNumber}/${data.file[0].name}`)
  //           .put(data.file[0]);

  //         uploadTask.ref
  //           .getDownloadURL()
  //           .then((res) => {
  //             data = { ...data, registrationPapersUrl: res };
  //             return data;
  //           })
  //           .then((res) => {
  //             //copied from above, ideally seperate into seperate function
  //             const toSend = async () => {
  //               const sendUpdate = fetch(`${apiUrl}/api/update/dog`, {
  //                 method: "POST",
  //                 headers: {
  //                   "Content-Type": "application/json",
  //                 },
  //                 body: JSON.stringify(data),
  //               });
  //               const response = await sendUpdate;
  //               console.log(response);

  //               if (response.status === 200) {
  //                 const fetchResponse = await response.json();
  //                 console.log(fetchResponse.message);
  //                 setMessage(fetchResponse.message);
  //               }
  //             };

  //             toSend();
  //           });
  //       };

  //       url();
  //     }
  //   }
  // };

  const onDelete = () => {
    APIService.deleteDog(dog);
    setMessage("Action performed successfully");
  };

  const handleDisabled = () => {
    setIsDisabled(!isDisabled);
  };

  // const onDelete = async (data) => {
  //   if (data.akcNumber === undefined) {
  //     setMessage("Please toggle to delete");
  //   } else {
  //     const deleteDog = fetch(`${apiUrl}/api/delete/dog`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ akcNumber: data.akcNumber }),
  //     });
  //     const response = await deleteDog;

  //     if (response.status === 200) {
  //       setMessage("Dog successfully deleted!");
  //     } else {
  //       setMessage("Dog not deleted.");
  //     }
  //   }
  // };

  return (
    <div key={dog.callName} className="render-dog">
      <Segment>
        <p>
          <strong>{dog.registeredName}</strong>
        </p>
        <p>Toggle to edit fields or delete dog</p>{" "}
        <Checkbox toggle onChange={handleDisabled} />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Registered name
                <input
                  defaultValue={dog.registeredName}
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
                  defaultValue={dog.callName}
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
                  defaultValue={dog.registrationNumber}
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
                  defaultValue={dog.sanctionId}
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
                  defaultValue={dog.registrationStatus}
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
                  defaultValue={dog.registrationPapers}
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
                <a href={dog.registrationPapersUrl} target="_blank" download>
                  Download Registration Papers
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

            {/* <label>
              Secondary Owner IDs
              <ol>
                {dog.secondaryIds === null || dog.secondaryIds.length === 0
                  ? "No secondary owners"
                  : dog.secondaryIds.map((id, index) => {
                      return (
                        <Form.Field key={index}>
                          <input
                            type="text"
                            placeholder="Secondary ID"
                            name={`secondaryIds[${index}]`}
                            ref={register}
                            defaultValue={id}
                            disabled={isDisabled}
                          />
                        </Form.Field>
                      );
                    })}
              </ol>
            </label> */}
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
