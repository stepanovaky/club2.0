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

  console.log(selectedEvent? selectedEvent: null)
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
    if (selectedEvent.pdfUrl === undefined) {
      const url = await APIService.getPdfUrl(data.eventPdf);
       data.eventPdfUrl = url;
    const res = APIService.updateEvents(data);
    } else {
      const res = APIService.updateEvents(data);
    }
    
   
    setMessage("Event successfully updated");
  };

  const { register, handleSubmit, errors } = useForm();
 
 const downloadInfo = async () => {
   const res = await APIService.getEventInfo(selectedEvent);
   window.open(res.url, "_self")

 }

  return (
    <div className="find-event">
      <Button onClick={downloadInfo}>Get Event Registration Information</Button>
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
                defaultValue={
                  selectedEvent!== undefined? selectedEvent.sanctionedPrice : null
                }
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
                defaultValue = {
                  selectedEvent !== undefined? selectedEvent.unsanctionedPrice: null
                }
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
                defaultValue={selectedEvent !== undefined ? selectedEvent.pdfUrl: null}
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
