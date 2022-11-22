import { useEffect } from "react";
import DateService from "../utilities/DateService";
import UserService from "../utilities/UserService";
import MeetingComponent from "./MeetingComponent";


const TomessageComponent =  ({ item }) => {
  useEffect(()=>{
    // console.log(item)
  },[item])

  return (
    <table className="w-full mt-4">
    <tbody>
      <tr>
        {/* owners account */}
        <td className=" w-16">
          {true && (
            <div className="m-2 w-10 h-10 rounded-full bg-[url('assets/avatar.jpg')] relative">
              <div className='absolute bottom-0 rounded-full right-0 w-4 h-4 bg-lightgreen border-4 border-white'></div>
            </div>
          )}
        </td>
        {/* message */}
        <td className='flex flex-col  border border-lightgray border-solid rounded-md p-4'>
          {/* senders name */}
          <div className='flex justify-between items-center'>
            <div className='flex text-sm text-gray justify-start font-bold'>
              {item.from.userName}
            </div>
            <div className='flex justify-end font-bold text-gray text-xs align-middle'>
              {/* {time.toLocaleTimeString("en-US", { hour12: true })} */}
              { DateService.getMessageTime(item.timeSent) }
            </div>
          </div>
          {/* message */}
          <div className='cursor-pointer px-2 py-1 flex justify-start items-center   bg-lightgray mb-2 bg-opacity-20 rounded-lg text-gray border outline-1 border-gray border-opacity-20'>
            { item.type === "MESSAGE" ? item.message : item.from.userName === UserService.getFullName() ? "You requested this meeting" : "Meeting requestd by " + item.from.userName}
          </div>
          {/* reaactions on message */}
          <div></div>
          {/* attatchments */}
          <div>

          {item.type === "MEETING" && <MeetingComponent item = {item} />}

          </div>
        </td>
        <td className=" w-16">
        </td>
      </tr>
    </tbody>
  </table>
)}

export default TomessageComponent;
