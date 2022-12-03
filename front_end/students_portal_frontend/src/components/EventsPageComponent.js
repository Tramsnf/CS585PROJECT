/* eslint-disable jsx-a11y/alt-text */
import { useLilius } from "use-lilius";
import MonthComponent from "./MonthComponent";
import SearchComponent from "./SearchComponent";
import MoreIcon from "../assets/down-arrow.svg";
import DateService from "../utilities/DateService";
import { useEffect, useState } from "react";
import { useLazyQuery } from "react-apollo";
import { getActiveProfile, GET_MEETINGS } from "../GraphQL/Queries";
import { useParams } from "react-router-dom";
import { useStateValue } from "../utilities/StateProvider";


const EventsPageComponent = (props) => {
 
  const months = DateService.getMonths();

  const[{ user }, dispatch] = useStateValue();

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

  const urlParams = useParams(); 

  const [getMeetings, fetchMeetings] = useLazyQuery(GET_MEETINGS,{
    fetchPolicy: 'network-only', // network request no cache
    variables: {refId : urlParams && urlParams.profile ? urlParams.profile : user.profile.refId },
  });

  useEffect(()=>{
      getMeetings()
      setSelected([])
  },[urlParams])

  useEffect(() => {
    if(!fetchMeetings.error && !fetchMeetings.loading){
      if(fetchMeetings.data){
        if( !!fetchMeetings.data.getMeetings.length ){
              // console.log("posting meetings ",fetchMeetings.data)
                var meetins = fetchMeetings.data.getMeetings
                var dates = []
                meetins && meetins.forEach(meetin => dates.push(
                      DateService.getDateFromString(
                        DateService.getYYYYMMDDstringFormat(
                          DateService.getDateFromString(meetin.time)
                        )+"T00:00:00"
                      )
                    )
                  )
                setSelected(dates)
              }
        };
    }
  },[fetchMeetings.data]);
  

  return (
    <>
      <div className='flex justify-between w-auto align-middle p-5'>
        <div className='font-extrabold text-secondary text-2xl'>
          Meeting Overview
        </div>
        {/* <button className='bg-lightnavy rounded-md shadow-md overflow-hidden md:max-w-2xl border border-gray border-opacity-30 justify-start px-4 py-1  '>
          <span className='font-bold text-white text-lg'>Schedule New</span>
        </button> */}
      </div>
      <div className='flex text-center content-center place-items-center align-middle ml-4 mb-4'>
        {/* <SearchComponent /> */}
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

      <div className='bg-graydark p-2 rounded-lg'>
        <div className='flex gap-2 py-2'>
          <span className='flex items-center gap-1 font-extrabold  text-gray'>
            <div className='cursor-pointer  items-center  p-2 w-7 h-7 bg-primary rounded-lg ' />
            Upcoming meetings
          </span>
          <span className='flex items-center gap-1 font-extrabold  text-gray'>
            <div className='cursor-pointer  items-center  p-2 w-7 h-7 bg-primary bg-opacity-20 rounded-lg ' />
            Attended meetings
          </span>
        </div>
        <div className='flex flex-wrap justify-center'>
          
          {calendar.map((month, index) => (
            <MonthComponent
              calendar={calendar}
              selected={selected}
              setSelected={()=>{}}
              isSelected={isSelected}
              viewing={viewing}
              setViewing={()=>{}}
              viewMonth={viewMonth}
              viewYear={viewYear}
              month={month}
              months={months}
              key={index}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default EventsPageComponent;
