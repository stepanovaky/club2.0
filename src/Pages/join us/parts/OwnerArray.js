import React, { useEffect } from "react";
import { useFieldArray, Controller } from "react-hook-form";
import { Form, Button, Segment, Divider } from "semantic-ui-react";

export default function Fields({ control, register, setValue, getValues }) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "owners",
  });

  const addPrimaryOwner = () => {
    append({ name: "append" });
  };

  useEffect(() => {
    addPrimaryOwner();
  }, []);

  return (
    <>
      {/* {fields.map((item, index) => {
        return (
          <Segment key={item.id} color="teal">
            <Divider horizontal>Primary Owner INFORMATION</Divider>
            <Form.Group widths="equal">
              <Form.Field>
                <label>
                  First name *{" "}
                  <input
                    required
                    type="text"
                    placeholder="First name"
                    name={`owners[${index}].firstName`}
                    ref={register({ required: true, maxLength: 80 })}
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label>
                  Last name *
                  <input
                    required
                    type="text"
                    placeholder="Last name"
                    name={`owners[${index}].lastName`}
                    ref={register({ required: true, maxLength: 100 })}
                  />
                </label>
              </Form.Field>
            </Form.Group>
            <Form.Field>
              <label>
                Email *{" "}
                <input
                  required
                  type="text"
                  placeholder="Email"
                  name={`owners[${index}].email`}
                  ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                />
              </label>
            </Form.Field>
            <Form.Group widths="equal">
              <Form.Field>
                <label>
                  Mobile number *{" "}
                  <input
                    required
                    type="tel"
                    placeholder="Mobile number"
                    name={`owners[${index}].mobile`}
                    ref={register({
                      required: true,
                      minLength: 6,
                      maxLength: 12,
                    })}
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label>
                  Home phone number{" "}
                  <input
                    type="tel"
                    placeholder="Landline"
                    name={`owners[${index}].landline`}
                    ref={register}
                  />
                </label>
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>
                  Address Line 1 *{" "}
                  <input
                    required
                    type="text"
                    placeholder="Address Line 1"
                    name={`owners[${index}].addressOne`}
                    ref={register({ required: true })}
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label>
                  Address Line 2{" "}
                  <input
                    type="text"
                    placeholder="Address Line 2"
                    name={`owners[${index}].addressTwo`}
                    ref={register}
                  />
                </label>
              </Form.Field>
            </Form.Group>
            <Form.Group widths="equal">
              <Form.Field>
                <label>
                  Zip code *{" "}
                  <input
                    required
                    type="number"
                    placeholder="Zip code"
                    name={`owners[${index}].zipCode`}
                    ref={register({ required: true })}
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label>
                  City *{" "}
                  <input
                    required
                    type="text"
                    placeholder="City"
                    name={`owners[${index}].city`}
                    ref={register({ required: true })}
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label>
                  State *{" "}
                  <select
                    required
                    placeholder="State"
                    name={`owners[${index}].state`}
                    ref={register({ required: true })}
                  >
                    <option value="" disabled selected>
                      Select State *
                    </option>
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
                    <option value="WY'">WY</option>
                  </select>
                </label>
              </Form.Field>
            </Form.Group>

            {/* <Button
              fluid
              basic
              color="blue"
              type="button"
              onClick={() => remove(index)}
            >
              Delete Primary Owner
            </Button> */}
      {/* </Segment> */}
      {/* ); */}
      {/* })} */}
      <Segment color="teal">
        <Divider horizontal>Primary Owner INFORMATION</Divider>
        <Form.Group widths="equal">
          <Form.Field>
            <label>
              First name *{" "}
              <input
                required
                type="text"
                placeholder="First name"
                name={`owner.firstName`}
                ref={register({ required: true, maxLength: 80 })}
              />
            </label>
          </Form.Field>
          <Form.Field>
            <label>
              Last name *
              <input
                required
                type="text"
                placeholder="Last name"
                name={`owner.lastName`}
                ref={register({ required: true, maxLength: 100 })}
              />
            </label>
          </Form.Field>
        </Form.Group>
        <Form.Field>
          <label>
            Email *{" "}
            <input
              required
              type="text"
              placeholder="Email"
              name={`owner.email`}
              ref={register({ required: true, pattern: /^\S+@\S+$/i })}
            />
          </label>
        </Form.Field>
        <Form.Group widths="equal">
          <Form.Field>
            <label>
              Mobile number *{" "}
              <input
                required
                type="tel"
                placeholder="Mobile number"
                name={`owner.mobile`}
                ref={register({
                  required: true,
                  minLength: 6,
                  maxLength: 12,
                })}
              />
            </label>
          </Form.Field>
          <Form.Field>
            <label>
              Home phone number{" "}
              <input
                type="tel"
                placeholder="Landline"
                name={`owner.landline`}
                ref={register}
              />
            </label>
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>
              Address Line 1 *{" "}
              <input
                required
                type="text"
                placeholder="Address Line 1"
                name={`owner.addressOne`}
                ref={register({ required: true })}
              />
            </label>
          </Form.Field>
          <Form.Field>
            <label>
              Address Line 2{" "}
              <input
                type="text"
                placeholder="Address Line 2"
                name={`owner.addressTwo`}
                ref={register}
              />
            </label>
          </Form.Field>
        </Form.Group>
        <Form.Group widths="equal">
          <Form.Field>
            <label>
              Zip code *{" "}
              <input
                required
                type="number"
                placeholder="Zip code"
                name={`owner.zipCode`}
                ref={register({ required: true })}
              />
            </label>
          </Form.Field>
          <Form.Field>
            <label>
              City *{" "}
              <input
                required
                type="text"
                placeholder="City"
                name={`owner.city`}
                ref={register({ required: true })}
              />
            </label>
          </Form.Field>
          <Form.Field>
            <label>
              State *{" "}
              <select
                required
                placeholder="State"
                name={`owner.state`}
                ref={register({ required: true })}
              >
                <option value="" disabled selected>
                  Select State *
                </option>
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
                <option value="WY'">WY</option>
              </select>
            </label>
          </Form.Field>
        </Form.Group>

        {/* <Button
              fluid
              basic
              color="blue"
              type="button"
              onClick={() => remove(index)}
            >
              Delete Primary Owner
            </Button> */}
      </Segment>

      <section className="center-button-primary"></section>
    </>
  );
}
