import React, { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { Form, Button } from "semantic-ui-react";

function SecondaryOwnerArray({ nestIndex, control, register }) {
  const { fields, remove, append } = useFieldArray({
    control,
    name: `secondaryOwner[${nestIndex}].nestedArray`,
  });
  const [num, setNum] = useState(0);
  const isDisabled = num === 2 ? true : false;

  const addSecondary = () => {
    console.log("here");
    //fields aren't used but necessary for this to work
    append({ field1: "field1", field2: "field2" });
    setNum(num + 1);
  };
  const removeSecondary = (num) => {
    remove(num);
    setNum(num - 1);
  };

  return (
    <div>
      {fields.map((item, k) => {
        return (
          <div key={item.id} style={{ marginLeft: 20 }}>
            <label>Secondary Owner:</label>
            <Form.Group widths="equal">
              <Form.Field>
                <label>
                  First name *{" "}
                  <input
                    required
                    type="text"
                    placeholder="First name"
                    name={`dogOwner[${nestIndex}].secondary[${k}].firstName`}
                    ref={register({ required: true, maxLength: 80 })}
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label>
                  Last name *{" "}
                  <input
                    required
                    type="text"
                    placeholder="Last name"
                    name={`dogOwner[${nestIndex}].secondary[${k}].lastName`}
                    ref={register({ required: true, maxLength: 100 })}
                  />
                </label>
              </Form.Field>
              <Form.Field>
                <label>
                  Email *
                  <input
                    required
                    type="text"
                    placeholder="Email"
                    name={`dogOwner[${nestIndex}].secondary[${k}].email`}
                    ref={register({ required: true, pattern: /^\S+@\S+$/i })}
                  />
                </label>
              </Form.Field>
            </Form.Group>
            <Button
              fluid
              basic
              color="blue"
              type="button"
              onClick={() => removeSecondary(k)}
            >
              Delete Secondary Owner
            </Button>
          </div>
        );
      })}
      <section className="center-button-secondary">
        <Button
          color="teal"
          type="button"
          onClick={addSecondary}
          disabled={isDisabled}
        >
          Add Secondary Owner
        </Button>
      </section>
    </div>
  );
}

export default SecondaryOwnerArray;

// export default ({ nestIndex, control, register }) => {
//   const { fields, remove, append } = useFieldArray({
//     control,
//     name: `dogOwner[${nestIndex}].nestedArray`,
//   });

//   const [num, setNum] = useState(0);

//   let secondaryNum = 0;
//   const isDisabled = num === 2 ? true : false;

//   const addSecondary = () => {
//     console.log("here");
//     append();
//     setNum(num + 1);
//   };

//   const removeSecondary = (num) => {
//     remove(num);
//     setNum(num - 1);
//   };

//   return (
//     <div>
//       {fields.map((item, k) => {
//         return (
//           <div key={item} style={{ marginLeft: 20 }}>
//             <label>Secondary Owner:</label>
//             <Form.Group widths="equal">
//               <Form.Field>
//                 <label>
//                   First name *{" "}
//                   <input
//                     required
//                     type="text"
//                     placeholder="First name"
//                     name={`dogOwner[${nestIndex}].secondary[${k}].firstName`}
//                     ref={register({ required: true, maxLength: 80 })}
//                   />
//                 </label>
//               </Form.Field>
//               <Form.Field>
//                 <label>
//                   Last name *{" "}
//                   <input
//                     required
//                     type="text"
//                     placeholder="Last name"
//                     name={`dogOwner[${nestIndex}].secondary[${k}].lastName`}
//                     ref={register({ required: true, maxLength: 100 })}
//                   />
//                 </label>
//               </Form.Field>
//               <Form.Field>
//                 <label>
//                   Email *
//                   <input
//                     required
//                     type="text"
//                     placeholder="Email"
//                     name={`dogOwner[${nestIndex}].secondary[${k}].email`}
//                     ref={register({ required: true, pattern: /^\S+@\S+$/i })}
//                   />
//                 </label>
//               </Form.Field>
//             </Form.Group>
//             <Button
//               fluid
//               basic
//               color="blue"
//               type="button"
//               onClick={() => removeSecondary(k)}
//             >
//               Delete Secondary Owner
//             </Button>
//           </div>
//         );
//       })}

//       <section className="center-button-secondary">
//         <Button
//           color="teal"
//           type="button"
//           onClick={addSecondary}
//           disabled={isDisabled}
//         >
//           Add Secondary Owner
//         </Button>
//       </section>
//     </div>
//   );
// };
