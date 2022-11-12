/* eslint-disable jsx-a11y/alt-text */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import AddIcon from "../assets/Shape.svg";
import SendIcon from "../assets/Vector.svg";

const item = {
  meeting_link: "meet-BRC-jth/redirect-video-meet",
  meeting_title: "MEETING WITH MR MWATHI",
  meeting_description: "phoenix invited you to this meeting",
  meeting_time_title: "Time: ",
  meeting_time: "8.25AM",
  meeting_day_title: "Day: ",
  meeting_day: "Today",
};

const MeetingComponent = () => {
  return (
    <div class='content-end bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl outline md:outline-lightgray  outline-1 justify-start shadow-lg'>
      <div class='flex justify-start ml-4 mt-2 text-blue underline font-semibold'>
        {item.meeting_link}
      </div>
      <div class='flex justify-start ml-4 text-deepblue font-bold'>
        {item.meeting_title}
      </div>
      <div class='flex justify-start ml-4 text-blue'>
        {item.meeting_description}
      </div>
      <div class='flex justify-start ml-4 text-deepblue '>
        {item.meeting_time_title}
        <span className='font-bold'>{item.meeting_time}</span>
      </div>
      <div class='flex justify-start ml-4 text-deepblue '>
        {item.meeting_day_title}
        <span className='font-bold'>{item.meeting_day}</span>
      </div>
      <div class='flex flex-row ml-3 mb-4 mt-2'>
        <button class='mr-3 rounded-full' onClick={() => {}}>
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
