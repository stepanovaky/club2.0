import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./Shared Components/header/Header";
import Footer from "./Shared Components/footer/Footer";
import Main from "./Pages/main/Main";
import About from "./Pages/about/About";
import NotFound from "./Pages/not found/NotFound";
import JoinUs from "./Pages/join us/JoinUs";
import Results from "./Pages/results/Results";
import Merchandise from "./Pages/merchandise/Merchandise";
import Confirmation from "./Pages/confirmation/Confirmation";
import ListEvents from "./Pages/events/ListEvents";
import DisplaySelectedEvent from "./Pages/event page/DisplaySelectedEvent";
import Calendar from "./Pages/calendar/Calendar";
import Resources from "./Pages/resources/Resources";
import Admin from "./Hidden/Admin";
import "./modal.scss";
import "./main.scss";

export const apiContext = React.createContext();

function App(props) {
  const [api, setApi] = useState(0);
  const [counter, setCounter] = useState(props.counter);
  // const [counter, setCounter] = useState();

  return (
    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/about" component={About} />
          <Route path="/joinclub" component={JoinUs} />
          <Route path="/events" component={ListEvents} />
          <Route path="/eventpage/:eventId" component={DisplaySelectedEvent} />
          <Route path="/calendar" component={Calendar} />
          <Route path="/results" component={Results} />
          <Route path="/merchandise" component={Merchandise} />{" "}
          <Route path="/admin" component={Admin} />
          <Route path="/resources" component={Resources} />
          <apiContext.Provider value={([api, setApi], [counter, setCounter])}>
            <Route path="/confirm" component={Confirmation} />
          </apiContext.Provider>
          {/* Admin compontents */}
          <Route component={NotFound} />
        </Switch>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
