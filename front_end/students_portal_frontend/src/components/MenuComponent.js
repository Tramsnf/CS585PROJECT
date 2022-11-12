import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import ContactMenuComponent from "./menu/ContactMenuComponent";
import SearchComponent from "./SearchComponent";

const MenuComponent = (props) => {
  return (
    <div className="h-full overflow-y-scroll">
      <div className='p-3 pb-0'>
        <div>
          <SearchComponent />
        </div>
        <div className='p-0.5 text-left font-semibold text-base '>
          Recently Contacted
        </div>
        <div className='bg-white border border-gray border-opacity-20 rounded-lg'>
          <ContactMenuComponent
            name={"Cameron Williamson"}
            registrationNumber={"2022 B-COM"}
            chat={"chatId"}
            events={"eventsId"}
          />
          <ContactMenuComponent
            name={"Cameron Williamson"}
            registrationNumber={"2022 B-COM"}
            chat={"chatId"}
            events={"eventsId"}
          />
          <ContactMenuComponent
            name={"Cameron Williamson"}
            registrationNumber={"2022 B-COM"}
            chat={"chatId"}
            events={"eventsId"}
          />
        </div>
      </div>
      <hr className='pl-1 mt-3 h-px border-0' />
      <div className='p-3'>
        <div className='p-0.5 text-left font-semibold text-base '>
          Frequently Contacted
        </div>
        <div className='bg-white border border-gray border-opacity-20 rounded-lg'>
          <ContactMenuComponent
            name={"Cameron Williamson"}
            registrationNumber={"2022 B-COM"}
            chat={"chatId"}
            events={"eventsId"}
          />
          <ContactMenuComponent
            name={"Cameron Williamson"}
            registrationNumber={"2022 B-COM"}
            chat={"chatId"}
            events={"eventsId"}
          />
          <ContactMenuComponent
            name={"Cameron Williamson"}
            registrationNumber={"2022 B-COM"}
            chat={"chatId"}
            events={"eventsId"}
          />
        </div>
      </div>
    </div>
  );
};

export default MenuComponent;
