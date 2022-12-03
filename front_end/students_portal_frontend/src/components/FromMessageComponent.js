import { useEffect } from "react";
import DateService from "../utilities/DateService";
import UserService from "../utilities/UserService";
import MeetingComponent from "./MeetingComponent";


const FromMessageComponent =  ({ item }) => {
  useEffect(()=>{
    // console.log(item)
  },[item])

  console.log(item.type , item)
  return (
    <table className="self-end w-full mt-4">
    <tbody>
      <tr>
        {/* owners account */}
        <td className=' w-14'>
        </td>
        {/* message */}
        <td className='flex flex-col justify-start  border border-lightgray border-solid rounded-md p-4'>
          {/* senders name */}
          <div className='flex flex-row-reverse justify-between text-center items-center'>
            <div className='flex text-sm text-gray justify-end font-bold'>
              {item.from.userName}
            </div>
            <div className='flex justify-start font-bold text-gray text-xs align-middle'>
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
        {/* other party */}
        <td className=' w-14'>
          {true && (
            <div className="m-2 w-10 h-10 rounded-full bg-[url('assets/avatar.jpg')] relative">
              <div className='absolute bottom-0 rounded-full right-0 w-4 h-4 bg-lightgreen border-4 border-white'></div>
            </div>
          )}
        </td>
      </tr>
    </tbody>
  </table>
)}

export default FromMessageComponent;
