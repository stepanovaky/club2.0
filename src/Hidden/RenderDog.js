import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Checkbox, Segment } from "semantic-ui-react";

function RenderDog(props) {
  const [isDisabled, setIsDisabled] = useState(true);
  const [message, setMessage] = useState();
  const dog = props.d;

  const { register, handleSubmit, errors } = useForm();
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

  const onSubmit = () => {};

  const onDelete = () => {};

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
    <div key={dog.id} className="render-dog">
      <Segment>
        <p>
          <strong>{dog.registeredName}</strong>
        </p>
        <p>Toggle to edit fields or delete dog</p>{" "}
        <Checkbox toggle onChange={handleDisabled} />
        {/* onSubmit={handleSubmit(onSubmit)} */}
        <Form>
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
                AKC Number
                <input
                  defaultValue={dog.akcNumber}
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
                Dog ID
                <input
                  type="text"
                  placeholder="id"
                  name="id"
                  ref={register}
                  defaultValue={dog.id}
                  disabled={isDisabled}
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label>
                Registration Status
                <input
                  type="text"
                  placeholder="Registration Status"
                  name="registered"
                  ref={register}
                  defaultValue={
                    dog.registered ? "Registered" : "Not registered"
                  }
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
                  name="registrationPapersTypeP"
                  ref={register}
                  defaultValue={dog.registrationPapersType}
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
            {/* <label>
              Primary Owner IDs
              <ol>
                {dog.primaryIds.map((id, index) => {
                  return (
                    <Form.Field key={index}>
                      <input
                        type="text"
                        placeholder="Primary ID"
                        name={`primaryIds[${index}]`}
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
          <Form.Group widths="equal">
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
