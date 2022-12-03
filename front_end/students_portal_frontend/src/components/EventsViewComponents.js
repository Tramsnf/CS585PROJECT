/* eslint-disable jsx-a11y/alt-text */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLilius } from "use-lilius";
import MonthComponent from "./MonthComponent";
import SearchComponent from "./SearchComponent";
import MoreIcon from "../assets/down-arrow.svg";
import MeetingComponent from "./MeetingComponent";

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

const EventsViewComponent = (props) => {
  const {
    calendar,
    selected,
    setSelected,
    isSelected,
    viewing,
    setViewing,
    viewMonth,
    viewYear,
  } = useLilius({ numberOfMonths: 1 });
  return (
    <>
      <div className='flex justify-between w-auto align-middle p-5 '>
        <div className='font-extrabold text-secondary text-2xl'>
          All Meetings
        </div>
        <button className='bg-lightnavy rounded-md shadow-md overflow-hidden md:max-w-2xl border border-gray border-opacity-30 justify-start px-4 py-1  '>
          <span className='font-bold text-white text-lg'>Schedule New</span>
        </button>
      </div>
      <div className='flex text-center content-center place-items-center align-middle ml-4 mb-4'>
        <SearchComponent />
        <div className=''>
          <ul className='flex justify-center align-middle'>
            <div className='cursor-pointer flex items-center  px-2 py-1  bg-lightgray border border-graymedium bg-opacity-20 rounded-lg font-bold text-gray hover:bg-primary active:bg-primary active:bg-opacity-20 hover:text-white mr-3'>
              {/* <FontAwesomeIcon icon='fa-calendar' className='text-xs inline' /> */}
              <li className=' text-secondary hover:font-bold'>
                Only My Meetings
              </li>
            </div>
            <div className='cursor-pointer flex items-center  px-2 py-1  bg-lightgray border border-graymedium bg-opacity-20 rounded-lg text-gray hover:bg-primary font-bold hover:text-white mr-3'>
              {/* <FontAwesomeIcon icon='fa-calendar' className='text-xs inline' /> */}
              <li className=' text-secondary '>Recently Attended</li>
            </div>
            <div className='cursor-pointer flex items-center  px-2 py-1  bg-lightgray border border-graymedium bg-opacity-20 rounded-lg font-bold text-gray hover:bg-primary hover:text-white mr-3'>
              <li className='flex text-secondary  pl-2'>All sprints</li>
              <img
                src={MoreIcon}
                className='ml-2 text-white rotate-180 place-self-center'
              />
            </div>
          </ul>
        </div>
      </div>

      <div className='flex flex-row'>
        <div className='bg-graydark rounded-lg flex flex-col flex-wrap mx-2'>
          <span className='pl-4 pt-4 font-extrabold text-base flex justify-start text-gray'>
            TASK VIEW
          </span>
          {calendar.map((month, index) => (
            <div className='mx-2 mt-1'>
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
            </div>
          ))}
        </div>
        <div className='flex flex-col w-full mr-2 bg-graydark rounded-lg p-3'>
          <div className='bg-white p-3 rounded-lg'>
            <span className='flex justify-between items-center m-1'>
              <div className='flex items-center gap-1'>
                <div className='cursor-pointer flex justify-center items-center  p-2 w-7 h-7 bg-lightnavy bg-opacity-20 rounded-lg text-gray hover:bg-primary hover:text-white'>
                  <FontAwesomeIcon
                    icon='fa-calendar'
                    className='text-xs inline'
                  />
                </div>
                Meetings scheduled for 6TH January
              </div>
              <div>
                <img
                  src={MoreIcon}
                  className='place-self-center  p-1 bg-lightgray bg-opacity-20 rounded-md '
                />
              </div>
            </span>
            <div className='bg-lightnavy bg-opacity-10 rounded-lg gap-3 flex flex-col p-5'>
              <MeetingComponent />
              <MeetingComponent />
              <MeetingComponent />
              <div></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsViewComponent;
