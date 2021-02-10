import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";
import {
  Container,
  Header,
  Form,
  Segment,
  Label,
  Divider,
} from "semantic-ui-react";
import { useHistory } from "react-router-dom";
import APIService from '../../../helpers/apiCalls'

function UnsanctionedRegistration(props) {
  const history = useHistory();
  const { control, register, handleSubmit } = useForm();
  const [message, setMessage] = useState();

  const { fields, append, remove } = useFieldArray({
    control,
    name: "dogs",
  });

  const goRegister = () => {};

  const addDog = () => {
    append({ name: "append" });
  };

  useEffect(() => {
    addDog();
  }, []);

  const onSubmit = async (data) => {
    console.log(data);
     const res = await APIService.checkIfEventRegistered({eventId: props.eventId, unsanctioned: data.dogs})
     console.log(res);
    if (res === true) {
    history.push("/confirm", {
      eventId: props.eventId,
      nonsanctionedEventRegistration: data,
      nonsanctionedPrice: props.unsanctionedPrice,
    });
    } else {
      const response = await res.json()
     console.log(response.response);
     const messageResponse = response.response
     for (const item of messageResponse) {
       setMessage([message, item.callName] + ' already registered for this event ')
     }
    }
  };
  return (
    <div className="nonsanctioned-registration">
      <p>Register for event</p>
      <Segment vertical>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <h5>Owner Fields</h5>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                First Name
                <input
                  error
                  required
                  type="text"
                  placeholder="First name"
                  name={`owners.firstName`}
                  ref={register({ required: true, maxLength: 80 })}
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label>
                Last Name
                <input
                  type="text"
                  placeholder="Last name"
                  name={`owners.lastName`}
                  ref={register({ required: true, maxLength: 100 })}
                />
              </label>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Email
                <input
                  type="text"
                  placeholder="Email"
                  name={`owners.email`}
                  ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label>
                Mobile Number
                <input
                  type="tel"
                  placeholder="Mobile number"
                  name={`owners.mobile`}
                  ref={register({
                    required: true,
                    minLength: 6,
                    maxLength: 12,
                  })}
                />
              </label>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Address Line 1
                <input
                  type="text"
                  placeholder="Address Line 1"
                  name={`owners.addressOne`}
                  ref={register({ required: true })}
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label>
                Address Line 2
                <input
                  type="text"
                  placeholder="Address Line 2"
                  name={`owners.addressTwo`}
                  ref={register}
                />
              </label>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Zip Code
                <input
                  type="number"
                  placeholder="Zip code"
                  name={`owners.zipCode`}
                  ref={register({ required: true })}
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label>
                City
                <input
                  type="text"
                  placeholder="City"
                  name={`owners.city`}
                  ref={register({ required: true })}
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label>
                State
                <select
                  name={`owners.state`}
                  ref={register({ required: true })}
                >
                  <option value="AL">AL</option>
                  <option value="AK">AK</option>
                  <option value="AS">AS</option>
                  <option value="AZ">AZ</option>
                  <option value="AR">AR</option>
                  <option value="CA">CA</option>
                  <option value="CO">CO</option>
                  <option value="CT">CT</option>
                  <option value="DE">DE</option>
                  <option value="DC">DC</option>
                  <option value="FM">FM</option>
                  <option value="FL">FL</option>
                  <option value="GA">GA</option>
                  <option value="GU">GU</option>
                  <option value="HI">HI</option>
                  <option value="ID">ID</option>
                  <option value="IL">IL</option>
                  <option value="IN">IN</option>
                  <option value="IA">IA</option>
                  <option value="KS">KS</option>
                  <option value="KY">KY</option>
                  <option value="LA">LA</option>
                  <option value="ME">ME</option>
                  <option value="MH">MH</option>
                  <option value="MD">MD</option>
                  <option value="MA">MA</option>
                  <option value="MI">MI</option>
                  <option value="MN">MN</option>
                  <option value="MS">MS</option>
                  <option value="MO">MO</option>
                  <option value="MT">MT</option>
                  <option value="NE">NE</option>
                  <option value="NV">NV</option>
                  <option value="NH">NH</option>
                  <option value="NJ">NJ</option>
                  <option value="NM">NM</option>
                  <option value="NY">NY</option>
                  <option value="NC">NC</option>
                  <option value="ND">ND</option>
                  <option value="MP">MP</option>
                  <option value="OH">OH</option>
                  <option value="OK">OK</option>
                  <option value="OR">OR</option>
                  <option value="PW">PW</option>
                  <option value="PA">PA</option>
                  <option value="PR">PR</option>
                  <option value="RI">RI</option>
                  <option value="SC">SC</option>
                  <option value="SD">SD</option>
                  <option value="TN">TN</option>
                  <option value="TX">TX</option>
                  <option value="UT">UT</option>
                  <option value="VT">VT</option>
                  <option value="VI">VI</option>
                  <option value="VA">VA</option>
                  <option value="WA">WA</option>
                  <option value="WV">WV</option>
                  <option value="WI">WI</option>
                  <option value="WY'">WY'</option>
                </select>
              </label>
            </Form.Field>
          </Form.Group>
          <h5>Dog Fields</h5>
          {fields.map((item, index) => {
            return (
              <div key={index}>
                <Segment color="violet">
                  <Divider horizontal>Dog {index + 1} INFORMATION</Divider>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>
                        Registered name *
                        <input
                          id="dogName"
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
                          required
                          type="text"
                          placeholder="Call name"
                          name={`dogs[${index}].callName`}
                          ref={register({ required: true })}
                        />
                      </label>
                    </Form.Field>
                  </Form.Group>
                  <Form.Group widths="equal">
                    <Form.Field>
                      <label>
                        Registration number *
                        <input
                          required
                          type="text"
                          placeholder="Registration Number"
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
                  </Form.Group>

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
          <Button type="submit">Submit</Button>
        </Form>
      </Segment>
    </div>
  );
}

export default UnsanctionedRegistration;
