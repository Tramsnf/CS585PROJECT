import MenuComponent from "./MenuComponent.js";
import {
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import EventsPageComponent from "./EventsPageComponent";
import ChatScreenComponent from "./ChatScreenComponent.js";
import EventsViewComponent from "./EventsViewComponents.js";
import UserAccountType from "./menu/UserAccountType.js";
import { useQuery } from "react-apollo";
import { getActiveProfile } from "../GraphQL/Queries.js";
import GetStartedComponent from "./GetStartedComponent.js";
import EventsCreateComponent from "./EventCreateComponents.js";
import { useStateValue } from "../utilities/StateProvider.js";

const HomeComponent = () => {

  const[{ user }, dispatch] = useStateValue();

  return (
    <div className='flex flex-row pt-20 h-full'>
      {user && user.type ? 
      <>
      <div className='basis-1/5'>
        <MenuComponent />
      </div>
      <div className='basis-4/5 bg-white border border-lightgray rounded-lg h-full overflow-y-scroll'>
        <Routes>
          <Route path='/' element={<EventsPageComponent />} />
          <Route path='/events/:profile' element={<EventsPageComponent />} />
          {/* <Route path='/profile' element={<GetStartedComponent />} /> */}
          <Route path='/meetings' element={<EventsViewComponent />} />
          <Route path='/meeting/create/:profile' element={<EventsCreateComponent />} />
          <Route path='/chat/:profile' element={<ChatScreenComponent />} />
          <Route path='/account' element={<UserAccountType />} />
          <Route path='*' element={<EventsPageComponent />}  />
        </Routes>
      </div>
      </> : 
      <GetStartedComponent />
}
    </div>
  );
};

export default HomeComponent;
