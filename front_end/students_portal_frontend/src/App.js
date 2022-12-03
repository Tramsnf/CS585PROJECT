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
  faSpinner,
} from "@fortawesome/free-solid-svg-icons";
import UserService from "./utilities/UserService";
import Welcome from "./components/Welcome";
import { BrowserRouter } from "react-router-dom";

import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "react-apollo";
import { useStateValue } from "./utilities/StateProvider";

// add needed icons to library
library.add(
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
  faSpinner
);

function App() {
  
  const [{user}, dispatch] = useStateValue()
  const client = new ApolloClient({
    uri: 'http://66.228.58.96/api/graphql',
    cache: new InMemoryCache(),
  });

  return (
          UserService.isLoggedIn() ? 
                <ApolloProvider client={client}>
                    <BrowserRouter>
                      <div className='App h-screen w-screen'>
                        { user && <NavBar length='100' /> }
                        <HomeComponent />
                      </div>
                    </BrowserRouter>
              </ApolloProvider>
            : <Welcome />
  )
}

export default App;
