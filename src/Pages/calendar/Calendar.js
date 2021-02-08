import React, { useState, useEffect } from "react";
// import { apiUrl } from "../../helpers/backend";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { addDays } from "date-fns";
import APIService from "../../helpers/apiCalls";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

function MyCalendar(props) {
  const localizer = momentLocalizer(moment);

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const getEvents = async () => {
      const eventsList = await APIService.getEvents();
      setEvents(eventsList);
    };

    getEvents();
  }, []);

  const mapEvents =
    events !== undefined
      ? events.map((one) => {
          return {
            title: `${one.eventName}`,
            start: addDays(new Date(one.startDate), 1),
            end: addDays(new Date(one.startDate), 1),
          };
        })
      : null;


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
