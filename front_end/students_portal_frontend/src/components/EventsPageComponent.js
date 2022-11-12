/* eslint-disable jsx-a11y/alt-text */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLilius } from "use-lilius";
import MonthComponent from "./MonthComponent";
import SearchComponent from "./SearchComponent";
import MoreIcon from "../assets/Vector.svg";

const months = [
  {
    value: "0",
    name: "January",
    shortName: "Jan",
  },
  {
    value: "1",
    name: "February",
    shortName: "Feb",
  },
  {
    value: "2",
    name: "March",
    shortName: "Mar",
  },
  {
    value: "3",
    name: "April",
    shortName: "Apr",
  },
  {
    value: "4",
    name: "May",
    shortName: "May",
  },
  {
    value: "5",
    name: "June",
    shortName: "June",
  },
  {
    value: "6",
    name: "July",
    shortName: "July",
  },
  {
    value: "7",
    name: "August",
    shortName: "Aug",
  },
  {
    value: "8",
    name: "September",
    shortName: "Sept",
  },
  {
    value: "9",
    name: "October",
    shortName: "Oct",
  },
  {
    value: "10",
    name: "November",
    shortName: "Nov",
  },
  {
    value: "11",
    name: "December",
    shortName: "Dec",
  },
];

const EventsPageComponent = (props) => {
  const {
    calendar,
    selected,
    setSelected,
    isSelected,
    viewing,
    setViewing,
    viewMonth,
    viewYear,
  } = useLilius({ numberOfMonths: 12 });
  return (
    <div className=" h-full overflow-y-scroll relative">
      <div className=" sticky top-0 bg-white">
        <div className='flex justify-between w-auto align-middle p-5'>
          <div className='font-extrabold text-secondary text-2xl'>
            Meeting Schedule
          </div>
          <button className='bg-lightnavy rounded-md shadow-md overflow-hidden md:max-w-2xl outline md:outline-lightgray  outline-1 justify-start px-4 py-1 justify-center shadow-lg'>
            <span className='font-bold text-white text-lg'>Schedule</span>
          </button>
        </div>
        <div className='flex text-center content-center place-items-center align-middle ml-4'>
          <SearchComponent />
          <div className=''>
            <ul className='flex justify-center align-middle'>
              <li className='pr-3 text-secondary '>Only My Meetings</li>
              <li className='pr-3 text-secondary '>Recently Attended</li>
              <li className='flex text-secondary  pl-2'>All sprints</li>
              <img src={MoreIcon} className='ml-2 place-self-center' />
            </ul>
          </div>
        </div>
      </div>
      <div className='flex flex-row flex-wrap items-center'>
        {calendar.map((month, index) => (
          <MonthComponent
            calendar={calendar}
            selected={selected}
            setSelected={setSelected}
            isSelected={isSelected}
            viewing={viewing}
            viewMonth={viewMonth}
            viewYear={viewYear}
            month={month}
            months={months}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsPageComponent;
