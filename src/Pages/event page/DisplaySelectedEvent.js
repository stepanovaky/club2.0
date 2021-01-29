import React, { useEffect, useState } from "react";
import DisplayPdf from "../../Shared Components/display pdf/DisplayPdf";
import RegisterForEvent from "./parts/RegisterForEvent";
import { format, addDays } from "date-fns";
// import { apiUrl } from "../../helpers/backend";
import { Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

function EventPage(props) {
  const [events, setEvents] = useState([]);
  //api call to get specific event
  //   const fetchEvents = async () => {
  //     const getRequest = await fetch(`${apiUrl}/api/events`);

  //     const response = await getRequest.json();
  //     const responseParsed = JSON.parse(response.events);
  //     setEvents([responseParsed]);
  //   };

  const id = props.match.params.eventId;

  const event =
    events[0] !== undefined
      ? events[0].find((one) => id === one.eventId)
      : undefined;

  console.log(event);

  useEffect(() => {
    // fetchEvents();
  }, []);
  return (
    <div className="event-page">
      <div className="container">
        <div className="frame">
          <div className="title-bundle">
            <div className="caption">
              <h2>{event !== undefined ? event.eventName : null}</h2>
            </div>
            <h5>
              {event !== undefined
                ? format(addDays(new Date(event.startDate), 1), "MMM do")
                : null}
            </h5>
          </div>
          <div>
            {event !== undefined ? (
              event.pdfUrl !== undefined ? (
                event.startDate === "2021-01-24" ? null : (
                  <RegisterForEvent
                    id={event.eventId}
                    sanctionedPrice={event.sanctionedPrice}
                    unsanctionedPrice={event.unsanctionedPrice}
                  />
                )
              ) : null
            ) : null}
          </div>
          <div className="title-bundle">
            <h5>
              {event !== undefined ? (
                event.pdfUrl !== undefined ? (
                  <DisplayPdf pdfUrl={event.pdfUrl} />
                ) : (
                  "More Information Coming Soon!"
                )
              ) : null}
            </h5>
          </div>
          {event !== undefined ? (
            event.pdfUrl !== undefined ? (
              <a href={event.pdfUrl} target="_blank" download>
                <Button>Download Premium</Button>
              </a>
            ) : null
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default EventPage;
