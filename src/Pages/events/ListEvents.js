import React, { useEffect, useState } from "react";
// import { apiUrl } from "../../helpers/backend";
import DisplayOneClubEvent from "../../Shared Components/display one club event/DisplayOneClubEvent";
import APIService from "../../helpers/apiCalls";

function Events() {
  const [events, setEvents] = useState([]);
  console.log(events);

  useEffect(() => {
    const getEvents = async () => {
      const eventsList = await APIService.getEvents();
      setEvents(eventsList);
    };

    getEvents();
  }, []);

  return (
    <div className="events">
      {events !== undefined ? <DisplayOneClubEvent events={events} /> : null}
    </div>
  );
}

export default Events;
