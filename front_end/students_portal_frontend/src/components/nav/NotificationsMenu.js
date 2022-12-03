
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DateService from "../../utilities/DateService";
import { Link } from "react-router-dom";
import { NOTIFICATIONS } from "../../GraphQL/Queries";
import { useLazyQuery, useMutation } from "react-apollo";
import { MARK_NOTIFICATION_READ } from "../../GraphQL/Mutations";

 const NotificationsMenu = (props) => {

    const[notificationsData, setNotifications] = useState([]);

    const [getNotifications, notifications] = useLazyQuery(NOTIFICATIONS,{
        fetchPolicy: 'network-only', // network request no cache
      });

    const [markNotificationRead, postingData] = useMutation(MARK_NOTIFICATION_READ);

    
    useEffect(() => {
    getNotifications()
    const interval = setInterval(() => {
        console.log("get notifications")
        !notifications.loading && getNotifications()
    }, 10000);
    return () => clearInterval(interval);
    },[]);

    useEffect(()=>{
        if(notifications.data){
            setNotifications([...notifications.data.getNotifications])
        }
        console.log(notifications.data)
        console.log("notifications data ",notificationsData)
    },[notifications.data])

    const markAsRead = (id) =>{
        markNotificationRead({ 
                variables: { 
                    id: id
                }
            }
        )
    }


    return (

        notificationsData && !!notificationsData.length ?
        <>
        <Menu as='div'>
        <Menu.Button className='relative mr-3 cursor-pointer flex justify-center items-center w-10 h-10 bg-transparentgray rounded-full text-gray hover:text-primary border-2 border-white hover:border-primary border-solid'>
            <FontAwesomeIcon icon='fa-bell' className='inline text-2xl ' />
            <div className='absolute bottom-0 rounded-full right-0 w-4 h-4 bg-lightgreen border-4 border-white'></div>
        </Menu.Button>
        <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'>
           
        <Menu.Items className='absolute w-82 border-0 right-16 z-10 origin-top-right bg-white top-full rounded m-0 mt-2 p-3 list-none shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='py-1'>

            {
                notificationsData.map((notification, index) => 
                    <Menu.Item key={index}>
                    {({ active }) => (
                    <Link onClick={()=>markAsRead(notification.id)} to={notification.url} className="hover:text-primary flex rounded p-2 border-graymedium border">
                        <FontAwesomeIcon icon="fa-circle-exclamation"   className='inline text-xs m-4 mt-2'/>
                        <ul className="list-none">
                            <li className=" text-left">
                                {notification.description}
                            </li>
                            <li className=" text-left">
                                {DateService.getMessageDate(notification.createdAt)}
                            </li>
                        </ul>
                    </Link>
                    )}
                </Menu.Item>
                )
            }
            </div>
        </Menu.Items>
        </Transition>
        </Menu>
        </>
    :
        <div className='mr-3 cursor-pointer flex justify-center items-center w-10 h-10 bg-transparentgray rounded-full text-gray hover:text-primary border-2 border-white hover:border-primary border-solid'>
          <FontAwesomeIcon icon='fa-bell' className='inline text-2xl ' />
        </div>
    )
 }

 export default NotificationsMenu