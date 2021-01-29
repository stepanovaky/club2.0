import React, { useState, useEffect } from "react";
// import { apiUrl } from "../../helpers/backend";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { addDays } from "date-fns";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

function MyCalendar(props) {
  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState([]);

  //api call to get all events
  //   const fetchEvents = async () => {
  //     const getRequest = await fetch(`${apiUrl}/api/events`);

  //     const response = await getRequest.json();
  //     const responseParsed = JSON.parse(response.events);
  //     setEvents([responseParsed]);
  //   };

  useEffect(() => {
    // fetchEvents();
  }, []);

  const mapEvents =
    events[0] !== undefined
      ? events[0].map((one) => {
          return {
            title: one.name,
            start: addDays(new Date(one.startDate), 1),
            end: addDays(new Date(one.startDate), 1),
          };
        })
      : null;

  console.log(mapEvents);

  const myEventsList = events[0] !== undefined ? mapEvents : null;

  return (
    <div className="calendar">
      <div className="container">
        {events[0] !== undefined ? (
          <Calendar
            localizer={localizer}
            events={myEventsList}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
          />
        ) : null}
      </div>
    </div>
  );
}

export default MyCalendar;
