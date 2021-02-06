import React, { useEffect, useState } from "react";
// import { apiUrl } from "../helpers/backend";
import { useForm } from "react-hook-form";
import { format, addDays } from "date-fns";
import { Form, Button, Container } from "semantic-ui-react";
import APIService from "../helpers/apiCalls";

function FindEvent() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState();
  const [message, setMessage] = useState("");
  // const fetchEvents = async () => {
  //   const getRequest = await fetch(`${apiUrl}/api/events`);

  //   const response = await getRequest.json();
  //   const responseParsed = JSON.parse(response.events);
  //   setEvents([responseParsed]);
  // };

  useEffect(() => {
    const getEvents = async () => {
      const eventsList = await APIService.getEvents();
      setEvents(eventsList);
    };

    getEvents();
  }, []);

  const sortedOptions = (arr) => {
    console.log(arr);
    let temp;
    if (arr !== undefined) {
      for (let i = arr.length - 1; i > 0; i--) {
        for (let j = 0; j < i; j++) {
          if (
            new Date(arr[j].startDate).getTime() >
            new Date(arr[j + 1].startDate).getTime()
          ) {
            temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
          }
        }
      }
    }
    //
  };

  sortedOptions(events);
  console.log(events);

  const eventsOptions =
    events !== undefined
      ? events.map((option) => {
          return (
            <option key={option.eventId} value={option.eventId}>
              {option.eventName},{" "}
              {format(addDays(new Date(option.startDate), 1), "MMM dd")}{" "}
            </option>
          );
        })
      : null;

  const handleOptionChange = () => {
    const select = document.getElementById("eventOption");
    const theEvent = events.find((event) => select.value === event.eventId);
    setSelectedEvent(theEvent);
  };

  const onSubmit = async (data) => {
    const url = await APIService.getPdfUrl(data.eventPdf);
    data.eventPdfUrl = url;
    const res = APIService.updateEvents(data);
    console.log(res.status);
    setMessage("Event successfully updated");
  };

  const { register, handleSubmit, errors } = useForm();
  // const onSubmit = async (data) => {
  //   console.log(data);
  //   if (data.eventPdf === undefined || data.eventPdf.length === 0) {
  //     console.log("hello");
  //   } else {
  //     //code to upload eventjpg
  //     const uploadTask = await storageRef
  //       .child(`${data.eventPdf[0].name}`)
  //       .put(data.eventPdf[0]);

  //     uploadTask.ref.getDownloadURL().then((res) => {
  //       data = { ...data, pdfUrl: res };
  //       updateEvent(data);
  //     });
  //   }
  // };

  // const updateEvent = async (data) => {
  //   console.log(data);
  //   const sendEvent = await fetch(`${apiUrl}/api/update/event`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify(data),
  //   });
  // };

  return (
    <div className="find-event">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <Form.Field>
            <label>
              Choose Event:
              <select
                id="eventOption"
                name="eventOption"
                onChange={handleOptionChange}
                ref={register}
              >
                {" "}
                <option value="" disabled selected>
                  Select Event
                </option>
                {events[0] !== undefined ? eventsOptions : null}
              </select>
            </label>
          </Form.Field>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Event name:
                <input
                  defaultValue={
                    selectedEvent !== undefined ? selectedEvent.eventName : null
                  }
                  type="text"
                  placeholder="Event name"
                  name="eventName"
                  ref={register({ required: true })}
                />
              </label>
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field>
              <label>
                Event start date:
                <input
                  defaultValue={
                    selectedEvent !== undefined ? selectedEvent.startDate : null
                  }
                  type="date"
                  placeholder="Start date"
                  name="startDate"
                  ref={register({ required: true })}
                />
              </label>
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <label>
                Price of Sanctioned Dog Registration:
                <input
                  type="number"
                  placeholder="Sanctioned Price"
                  name="sanctionedPrice"
                  ref={register({ required: true })}
                />
              </label>
            </Form.Field>
            <Form.Field>
              <label>
                Price of Unsanctioned Dog Registration:
                <input
                  type="number"
                  placeholder="Unsanctioned Price"
                  name="unsanctionedPrice"
                  ref={register({ required: true })}
                />
              </label>
            </Form.Field>
          </Form.Group>

          <Form.Group widths="equal">
            <Form.Field>
              <label>
                {" "}
                Add .pdf file
                <input
                  ref={register}
                  name="eventPdf"
                  type="file"
                  accept="application/pdf"
                />
              </label>
            </Form.Field>
          </Form.Group>
          <Button type="submit">Submit</Button>
          <p>{message}</p>
        </Container>
      </Form>
    </div>
  );
}

export default FindEvent;
