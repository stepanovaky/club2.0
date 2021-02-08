import React, { useState, useEffect } from "react";
import { useFieldArray } from "react-hook-form";
import SecondaryOwnerArray from "./SecondaryOwnerArray";
import { Form, Button, Segment, Divider } from "semantic-ui-react";
import APIService from "../../../helpers/apiCalls";

export default function Fields({
  control,
  register,
  setValue,
  getValues,
  handleSend,
}) {
  const [dogName, setDogName] = useState("");
  const [message, setMessage] = useState();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "dogs",
  });

  const addDog = () => {
    append({ name: "append" });
  };

  const handleDogName = () => {
    const name = document.getElementById("dogName").value;
    setDogName(name);
  };

  useEffect(() => {
    addDog();
  }, []);

  const findDogByCallName = () => {
    const callName = document.getElementById("call").value;
    fetchDogByCallName(callName.toLowerCase());
  };

  const fetchDogByCallName = async (name) => {
    const res = await APIService.findDog({
      findDogs: "callName * preferred",
      dogItem: name,
    });
    const response = await res.json();
    if (response.dog?.dog) {
      setMessage("Call Name Taken");
      handleSend(false);
    } else {
      setMessage("");
      handleSend(true);
    }
 
  };

  return (
    <>
      {fields.map((item, index) => {
        return (
          <div key={item.id}>
            <Segment color="purple">
              <Divider horizontal>
                secondary owner(s) for Dog{" "}
                {dogName === "" ? index + 1 : dogName}
              </Divider>
              <SecondaryOwnerArray
                nestIndex={index}
                {...{ control, register }}
              />
            </Segment>
            <Segment color="violet">
              <Divider horizontal>Dog {index + 1} INFORMATION</Divider>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>
                    Registered name *
                    <input
                      id="dogName"
                      onChange={handleDogName}
                      required
                      type="text"
                      placeholder="Registered name"
                      name={`dogs[${index}].registeredName`}
                      ref={register({ required: true })}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label>
                    Call name *
                    <input
                      onChange={findDogByCallName}
                      required
                      id="call"
                      type="text"
                      placeholder="Call name"
                      name={`dogs[${index}].callName`}
                      ref={register({ required: true })}
                    />
                  </label>
                  <p>{message}</p>
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>
                    Registration number *
                    <input
                      required
                      type="text"
                      placeholder="Registration number"
                      name={`dogs[${index}].registrationNumber`}
                      ref={register({ required: true })}
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
                      ref={register()}
                    />
                  </label>
                </Form.Field>
                <Form.Field>
                  <label>
                    Breed *
                    <input
                      required
                      type="text"
                      placeholder="Breed"
                      name={`dogs[${index}].breed`}
                      ref={register({ required: true })}
                    />
                  </label>
                </Form.Field>
              </Form.Group>
              <Form.Group widths="equal">
                <Form.Field>
                  <label>
                    DOB *
                    <input
                      required
                      type="date"
                      placeholder="DOB"
                      name={`dogs[${index}].dob`}
                      ref={register({ required: true })}
                    />
                  </label>{" "}
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <Form.Field>
                  <label>
                    Gender *
                    <select
                      required
                      name={`dogs[${index}].gender`}
                      ref={register({ required: true })}
                    >
                      <option value="" disabled selected>
                        Select Gender
                      </option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </select>
                  </label>
                </Form.Field>
                <Form.Field>
                  <label>
                    Registration Papers *
                    <select
                      required
                      name={`dogs[${index}].registrationPapers`}
                      ref={register({ required: false })}
                    >
                      <option value="" disabled selected>
                        Select Registration Papers
                      </option>
                      <option value="AKC">AKC</option>
                      <option value="NGA">NGA</option>
                      <option value="AKC ILP">AKC PAL</option>
                      <option value="NALLA">NALLA</option>
                      <option value="CKC">CKC</option>
                      <option value="Other"> Other</option>
                      <option value="None"> None added</option>
                    </select>
                  </label>
                </Form.Field>
              </Form.Group>
              <Form.Group>
                <input
                  type="file"
                  name={`dogs[${index}].file`}
                  ref={register({ required: false })}
                  accept="image/jpeg, application/pdf"
                />
              </Form.Group>{" "}
              <Button
                fluid
                basic
                color="blue"
                type="button"
                onClick={() => remove(index)}
              >
                Delete Dog
              </Button>
            </Segment>
          </div>
        );
      })}

      <section className="center-button-dog">
        <Button color="blue" type="button" onClick={addDog}>
          Add Another Dog
        </Button>
      </section>
    </>
  );
}
