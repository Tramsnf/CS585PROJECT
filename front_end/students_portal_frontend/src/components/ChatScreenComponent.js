import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MeetingComponent from "./MeetingComponent";
import { useState } from "react";

const ChatScreenComponent = (props) => {
  const [time, setTime] = useState(new Date());

  const item = {
    name: "John Doe",
  };

  
  const { from, to, message } = props;
  return (
    <>
    <div className=" overflow-scroll h-full w-full ">
        <div className='p-2 flex flex-col justify-end items-center relative' style={{minHeight:"100%"}}>
            <table className="w-full">
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
                  <td className='flex flex-col'>
                    {/* senders name */}
                    <div className='flex justify-between items-center'>
                      <div className='flex text-sm text-gray justify-start font-bold'>
                        {item.name}
                      </div>
                      <div className='flex justify-end font-bold text-gray text-xs align-middle'>
                        {time.toLocaleTimeString("en-US", { hour12: true })}
                      </div>
                    </div>
                    {/* message */}
                    <div className='cursor-pointer px-2 py-1 flex justify-start items-center   bg-lightgray mb-2 bg-opacity-20 rounded-lg text-gray border outline-1 border-gray border-opacity-20'>
                      this is a sample message
                    </div>
                    {/* reaactions on message */}
                    <div></div>
                    {/* attatchments */}
                    <div>

                        <MeetingComponent />
          
                    </div>
                  </td>
                  {/* other party */}
                  <td className=' w-14'>
                    {to && (
                      <div className="m-2 w-10 h-10 rounded-full bg-[url('assets/avatar.jpg')] relative">
                        <div className='absolute bottom-0 rounded-full right-0 w-4 h-4 bg-lightgreen border-4 border-white'></div>
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          
          
            <table className="self-end w-full">
              <tbody>
                <tr>
                  {/* owners account */}
                  <td className=' w-14'>
                    {from && (
                      <div className="m-2 w-10 h-10 rounded-full bg-[url('assets/avatar.jpg')] relative justify-end">
                        <div className='absolute bottom-0 rounded-full right-0 w-4 h-4 bg-lightgreen border-4 border-white'></div>
                      </div>
                    )}
                  </td>
                  {/* message */}
                  <td className='flex flex-col justify-start'>
                    {/* senders name */}
                    <div className='flex flex-row-reverse justify-between text-center items-center'>
                      <div className='flex text-sm text-gray justify-end font-bold'>
                        {item.name}
                      </div>
                      <div className='flex justify-start font-bold text-gray text-xs align-middle'>
                        {time.toLocaleTimeString("en-US", { hour12: true })}
                      </div>
                    </div>
                    {/* message */}
                    <div className='cursor-pointer px-2 py-1 flex justify-end items-center   bg-lightgray mb-2 bg-opacity-20 rounded-lg text-gray border place-items-end outline-1 border-gray border-opacity-20'>
                      this is a sample message
                    </div>
                    {/* reaactions on message */}
                    <div></div>
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
            <div className="w-full bg-white sticky bottom-0">
            <form className="m-auto">
              <label for='chat' class='sr-only'>
                Your message
              </label>
              <div class='flex items-center py-2 px-3 bg-lightgray rounded-lg  bg-opacity-20'>
                <textarea
                  id='chat'
                  rows='1'
                  class='block mx-4 p-2.5 w-full text-sm text-darkright font-medium bg-lightgray bg-opacity-20 rounded-lg border border-lightgray border-opacity-20 outline outline-1  outline-graymedium  focus:ring-bluefocus:border-blue'
                  placeholder='Message'></textarea>
                <button onClick={(e)=>e.preventDefault()}>
                  <div className='cursor-pointer px-2 py-1  flex justify-center items-center   bg-gray bg-opacity-20 rounded-lg text-gray hover:bg-primary hover:text-white  border outline-1 border-gray border-opacity-20 shadow-lg'>
                    <span class='font-bold mr-2'>Send</span>
                    <FontAwesomeIcon
                      icon='fa-paper-plane'
                      className='text-xs inline h-5 w-5'
                    />
                  </div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatScreenComponent;
