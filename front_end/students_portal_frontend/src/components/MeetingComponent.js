/* eslint-disable jsx-a11y/alt-text */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import AddIcon from "../assets/Shape.svg";
import SendIcon from "../assets/Vector.svg";
import DateService from "../utilities/DateService";

// const item = {
//   meeting_link: "meet-BRC-jth/redirect-video-meet",
//   meeting_title: "MEETING WITH MR MWATHI",
//   meeting_description: "phoenix invited you to this meeting",
//   meeting_time_title: "Time: ",
//   meeting_time: "8.25AM",
//   meeting_day_title: "Day: ",
//   meeting_day: "Today",
// };

const MeetingComponent = ({item}) => {
  return (
    <div className='content-end bg-white rounded-xl overflow-hidden md:max-w-2xl outline md:outline-lightgray  outline-1 justify-start shadow-lg'>
      <div className='flex justify-start ml-4 mt-2 text-blue underline font-semibold'>
        {item.link}
      </div>
      <div className='flex justify-start ml-4 text-deepblue font-bold'>
        {item.title}
      </div>
      <div className='flex justify-start ml-4 text-blue'>
        {item.description}
      </div>
      <div className='flex justify-start ml-4 text-deepblue '>
        Day: &nbsp;
        <span className='font-bold'>{DateService.getMessageDate(item.time)}</span>
      </div>
      <div className='flex justify-start ml-4 text-deepblue '>
        Time: &nbsp;
        <span className='font-bold'>{DateService.getMessageTimeHHMM(item.time)}</span>
      </div>
      <div className='flex flex-row ml-3 mb-4 mt-2'>
        <button className='mr-3 rounded-full' onClick={() => {}}>
          <div className='cursor-pointer  flex justify-center items-center  p-2 w-10 h-10 bg-transparentgray rounded-full text-gray hover:bg-primary hover:text-white  border outline-1 border-gray border-opacity-20 shadow-lg'>
            <FontAwesomeIcon
              icon='fa-paper-plane'
              className='text-xs inline h-5 w-5'
            />
          </div>
        </button>
        <button className='rounded-full  ' onClick={() => {}}>
          <div className='cursor-pointer  flex justify-center items-center  p-2 w-10 h-10 bg-transparentgray rounded-full text-gray hover:bg-primary hover:text-white  border outline-1 border-gray border-opacity-20 shadow-lg'>
            <FontAwesomeIcon icon='fa-add' className='text-xs inline h-5 w-5' />
          </div>
        </button>
      </div>
    </div>
    // </div>
  );
};

export default MeetingComponent;
