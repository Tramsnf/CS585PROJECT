import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MeetingComponent from "./MeetingComponent";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getActiveProfile, GET_USER_CHAT_SPACE } from "../GraphQL/Queries";
import { useLazyQuery, useMutation } from "react-apollo";
import { POST_MESSAGE } from "../GraphQL/Mutations";
import TomessageComponent from "./ToMessageComponent";
import FromMessageComponent from "./FromMessageComponent";
import { useStateValue } from "../utilities/StateProvider";

const ChatScreenComponent = (props) => {

  const[{ user }, dispatch] = useStateValue();

  const [spaceRefId, setSpaceRefId] = useState("");

  const urlParams = useParams(); 

  var [spaceDto, setSpaceDto] = useState();

  var [messageInput, setMessageInput] = useState("");

  const [getChats, getUserSpaceDto] = useLazyQuery(GET_USER_CHAT_SPACE,{
    fetchPolicy: 'network-only', // network request no cache
    variables: {profile : "", refId : spaceRefId},
  });

  useEffect(() => {
    if(getUserSpaceDto.data && !getUserSpaceDto.error && !getUserSpaceDto.loading){
      console.log("DATA",getUserSpaceDto.data)
      setSpaceDto(getUserSpaceDto.data)
    }
  },[getUserSpaceDto.data]);
  
  useEffect(()=>{
    setSpaceRefId(urlParams.profile)
    console.log(urlParams)
    getChats()
  },[urlParams.profile])

  
  const updateSpace = (cache, { data }) => {
    setSpaceDto(data)
    setMessageInput("");
  };

  const [postMessage, { error, loading }] = useMutation(POST_MESSAGE, { update: updateSpace } );

  const sendMessage = (e) =>{
    e.preventDefault();
    const messageBody = {
      spaceItemType : "MESSAGE",
      message: messageInput,
      to: spaceRefId,
    }

    if(messageInput !== ""){
      postMessage({ 
          variables: { 
            profileType: "",
            messageDto: messageBody
          }
        }
      )
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      !getUserSpaceDto.loading && getChats();
      console.log("refetching")
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <div className=" overflow-scroll h-full w-full ">
        <div className='p-2 flex flex-col justify-end items-center relative' style={{minHeight:"100%"}}>
            
            {
              spaceDto && spaceDto.getDetailedChatSpace && spaceDto.getDetailedChatSpace.spaceItems &&  !!spaceDto.getDetailedChatSpace.spaceItems.length &&
              spaceDto.getDetailedChatSpace.spaceItems.map((value, index)=>
                value.from.refId === spaceRefId ?
                  <TomessageComponent key={index} item={value}/>
                :
                  <FromMessageComponent key={index} item={value}/>
              )
            }

            <div className="w-full bg-white sticky bottom-0">
              <form className="m-auto">
                {/* <label for='chat' className='sr-only'>
                  Your message
                </label> */}
                <div className='flex items-center py-2 px-3 bg-lightgray rounded-lg  bg-opacity-20'>
                  <textarea
                    id='chat'
                    rows='1'
                    className='block mx-4 p-2.5 w-full text-sm text-darkright font-medium bg-lightgray bg-opacity-20 rounded-lg border border-lightgray border-opacity-20 outline outline-1  outline-graymedium  focus:ring-bluefocus:border-blue'
                    placeholder='Message'
                    value={ messageInput }
                    onChange={(e)=>setMessageInput(e.target.value)}
                  ></textarea>
                  <button onClick={(e)=>sendMessage(e)}>
                    <div className='cursor-pointer px-2 py-1  flex justify-center items-center   bg-gray bg-opacity-20 rounded-lg text-gray hover:bg-primary hover:text-white  border outline-1 border-gray border-opacity-20 shadow-lg'>
                      <span className='font-bold mr-2'>Send</span>
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
