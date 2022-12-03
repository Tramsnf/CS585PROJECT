/* eslint-disable jsx-a11y/alt-text */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useLilius } from "use-lilius";
import MonthComponent from "./MonthComponent";
import SearchComponent from "./SearchComponent";
import MoreIcon from "../assets/down-arrow.svg";
import MeetingComponent from "./MeetingComponent";
import DateService from "../utilities/DateService";


import {
  format,
  getDay,
  getMonth,
  getYear,
  isToday,
  formatISO
} from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getActiveProfile, getProfileByUser } from "../GraphQL/Queries";
import { useQuery, useMutation, useLazyQuery } from "react-apollo";
import TimePicker from "react-time-picker";
import { POST_MESSAGE } from "../GraphQL/Mutations";
import { useStateValue } from "../utilities/StateProvider";


const EventsCreateComponent = (props) => {
  const[{ user }, dispatch] = useStateValue();
  const months = DateService.getMonths();
  const years = [2022,2023,2024,2025];

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

  const navigate = useNavigate();
  const urlParams = useParams(); 

  const [meeting, setMeeting] = useState({
    spaceItemType : 'MEETING',
    to : urlParams.profile,
    title : '',
    time : '12:00',
    meetingType : 'PHYSICAL',
    link:'',
    description : '',
  })


  const [getProfile, otherProfile] = useLazyQuery(getProfileByUser,{
    fetchPolicy: 'network-only',
    variables: { refId: urlParams.profile }
  });

  const redirectToEvents = e => {
    console.log("post message ",e)
    if(e){
        navigate("/")
    }
  }

  const [postMessage, postMessageStatus] = useMutation(POST_MESSAGE, { update: redirectToEvents } );

  
  useEffect(()=>{
      console.log("refetching profile")
      getProfile()
  },[urlParams])

  const inputAction = (key,value)=> {
    var _temp_state = meeting;
    _temp_state[key] = value
    if(_temp_state && _temp_state.link!==''){
      _temp_state.meetingType = 'ONLINE'
    }else{
      _temp_state.meetingType = 'PHYSICAL'
    }
    setMeeting({..._temp_state})
  }

  const postMeeting = () => {
    var date = DateService.getYYYYMMDDstringFormat(viewing);
    var _meeting = {...meeting, time:date+"T"+meeting.time+":00"}
    const messageBody = {
      spaceItemType : "MEETING",
      title: _meeting.title,
      time: _meeting.time,
      description: _meeting.description,
      link: _meeting.link,
      meetingType: _meeting.meetingType,
      to: _meeting.to,
    }


    console.log('posting meeting ',_meeting)
    
    if(date && messageBody.title !== "" || messageBody.description !== "" ){
      postMessage({ 
          variables: { 
            profileType: user.type,
            messageDto: messageBody
          }
        }
      )
    }


  }

  

  return (
    <>
      <div className='flex justify-between w-auto align-middle p-5'>
        <div className='font-extrabold text-secondary text-2xl'>
          {otherProfile.data && `Meeting with ${otherProfile.data.getProfileByRefId.profile.userName}`}
        </div>
        <button onClick={()=>postMeeting()} className='bg-lightnavy rounded-md shadow-md overflow-hidden md:max-w-2xl border border-gray border-opacity-30 justify-start px-4 py-1  '>
          <span className='font-bold text-white text-lg'>Schedule New</span>
        </button>
      </div>
      <div className='flex text-center content-center place-items-center align-middle ml-4 mb-4'>
        <div className=''>
          <ul className='flex justify-center align-middle'>
            <div className='cursor-pointer flex items-center  px-2 py-1  bg-lightgray border border-graymedium bg-opacity-20 rounded-lg font-bold text-gray hover:bg-primary active:bg-primary active:bg-opacity-20 hover:text-white mr-3'>
              {/* <FontAwesomeIcon icon='fa-calendar' className='text-xs inline' /> */}
              <li className=' text-secondary'>
                <select
                  name="month"
                  onChange={(e) => viewMonth(e.target.value)}
                  value={months[getMonth(viewing)].value}
                >
                  {months.map((item) => (
                    <option key={item.value} value={item.value}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </li>
            </div>
            <div className='cursor-pointer flex items-center  px-2 py-1  bg-lightgray border border-graymedium bg-opacity-20 rounded-lg text-gray hover:bg-primary font-bold hover:text-white mr-3'>
              {/* <FontAwesomeIcon icon='fa-calendar' className='text-xs inline' /> */}
              <li className=' text-secondary '>
                  <select
                    name="year"
                    onChange={(e) => viewYear(e.target.value)}
                    value={getYear(viewing)}
                  >
                    {years.map((item) => (
                      <option key={item} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
              </li>
            </div>
            {/* <div className='cursor-pointer flex items-center  px-2 py-1  bg-lightgray border border-graymedium bg-opacity-20 rounded-lg font-bold text-gray hover:bg-primary hover:text-white mr-3'>
              <li className='flex text-secondary  pl-2'>All sprints</li>
              <img
                src={MoreIcon}
                className='ml-2 text-white rotate-180 place-self-center'
              />
            </div> */}
          </ul>
        </div>
      </div>

      <div className='flex flex-row'>
        <div className='bg-graydark rounded-lg flex flex-col flex-wrap mx-2'>
          <span className='pl-4 pt-4 font-extrabold text-base flex justify-start text-gray'>
            TASK VIEW
          </span>
          {calendar.map((month, index) => (
            <div key={index} className='mx-2 mt-1'>
              <MonthComponent
                calendar={calendar}
                selected={selected}
                setSelected={setSelected}
                isSelected={isSelected}
                viewing={viewing}
                viewMonth={viewMonth}
                viewYear={viewYear}
                setViewing={setViewing}
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
                Fill in the meeting details below : 
              </div>
              <div>
                <img
                  src={MoreIcon}
                  className='place-self-center  p-1 bg-lightgray bg-opacity-20 rounded-md '
                />
              </div>
            </span>
            <div className='bg-lightnavy bg-opacity-10 rounded-lg gap-3 flex flex-col p-5'>
              
              <form className="w-full max-w-sm">
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                      Title
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input 
                    value={meeting.title} 
                    className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
                     id="inline-full-name" type="text"
                     onChange={e=>inputAction("title",  e.target.value)} />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                      Description
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <textarea value={meeting.description} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                    id="inline-password" type="text" placeholder="type here..." 
                    onChange={e=>inputAction("description",  e.target.value)}
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-password">
                      Meeting Link
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input value={meeting.link} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                    id="inline-password" type="text" placeholder="type here..." 
                    onChange={e=>inputAction("link",  e.target.value)}
                    />
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-state">
                      Meeting type
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <div className="relative">
                      <select value={meeting.meetingType} 
                      className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                      id="grid-state"
                        onChange={e=>inputAction("meetingType",  e.target.value)}
                      > zxz  
                        <option value='ONLINE'>online</option>
                        <option value='PHYSICAL'>physical</option>
                      </select>
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                      Time
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <TimePicker
                    onChange={e => inputAction("time",  e)}                    
                    value={meeting.time} />
                  </div>
                </div>
                {/* <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                      created by
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" id="inline-full-name" type="text" value="Jane Doe" />
                  </div>
                </div> */}
                {/* <div className="md:flex md:items-center mb-6">
                  <div className="md:w-1/3">
                    <label className="block text-gray-500 font-bold md:text-right mb-1 md:mb-0 pr-4" htmlFor="inline-full-name">
                      invited
                    </label>
                  </div>
                  <div className="md:w-2/3">
                    <input 
                      value={
                        data && data.getProfileByRefId && data.getProfileByRefId.profile.userName
                      } 
                      className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" 
                      id="inline-full-name" 
                      type="text" 
                    />
                  </div>
                </div> */}
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EventsCreateComponent;
