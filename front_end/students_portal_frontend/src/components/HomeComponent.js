import MenuComponent from "./MenuComponent.js";
import {
  Routes, //replaces "Switch" used till v5
  Route,
} from "react-router-dom";
import EventsPageComponent from "./EventsPageComponent";
import ChatScreenComponent from "./ChatScreenComponent.js";

const HomeComponent = () => {
  return (
      <div className='flex flex-row pt-20 h-full'>
        <div className='basis-1/5'>
          <MenuComponent />
        </div>
        <div className='basis-4/5 bg-white border border-lightgray rounded-lg'>
          <Routes>
            <Route path='/' element={<EventsPageComponent />} />
            <Route path='/chat' element={<ChatScreenComponent />} />
          </Routes>
        </div>
      </div>
  );
};

export default HomeComponent;
