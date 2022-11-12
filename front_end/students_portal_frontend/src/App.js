import "./App.css";
import HomeComponent from "./components/HomeComponent";
import NavBar from "./components/nav/NavBar";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faCheck,
  faCalendar,
  faCalendarPlus,
  faPaperPlane,
  faPlus,
  faShapes,
  faBell,
  faGear,
  faArrowRightFromBracket,
  faCircleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Keycloak from "keycloak-js";
import UserService from "./utilities/UserService";
import Welcome from "./components/Welcome";
import { BrowserRouter } from "react-router-dom";

// add needed icons to library
library.add(faCheck, faCalendar, faCalendarPlus, faPaperPlane, faPlus, faShapes, faBell, faGear, faArrowRightFromBracket, faCircleExclamation);

function App() {

  return (
    UserService.isLoggedIn() ?


    <BrowserRouter>
      <div className='App h-screen w-screen'>
          <NavBar length='100' />
          <HomeComponent />
      </div>
    </BrowserRouter>

    :

    <Welcome />


  );
}

export default App;
