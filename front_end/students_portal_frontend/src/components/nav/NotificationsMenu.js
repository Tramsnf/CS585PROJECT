
import { Fragment, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

 const NotificationsMenu = (props) => {

    const [time, setTime] = useState(new Date())

    return (<Menu as='div'>

        <Menu.Button className='mr-3 cursor-pointer flex justify-center items-center w-10 h-10 bg-transparentgray rounded-full text-gray hover:text-primary border-2 border-white hover:border-primary border-solid'>
            <FontAwesomeIcon icon='fa-bell' className='inline text-2xl ' />
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
            <Menu.Item>
                {({ active }) => (
                <div className="hover:text-primary flex rounded p-2 border-graymedium border">
                    <FontAwesomeIcon icon="fa-circle-exclamation"   className='inline text-xs m-4 mt-2'/>
                    <ul className="list-none">
                        <li className=" text-left">
                            Mwangi Mweu sent you a message
                        </li>
                        <li className=" text-left">
                            {time.toLocaleTimeString('en-US', { hour12: true })}
                        </li>
                    </ul>
                </div>
                )}
            </Menu.Item>
            <Menu.Item>
                {({ active }) => (
                <div className="hover:text-primary flex rounded p-2 border-graymedium border">
                    <FontAwesomeIcon icon="fa-circle-exclamation"   className='inline text-xs m-4 mt-2'/>
                    <ul className="list-none">
                        <li className=" text-left">
                            Mwangi Mweu sent you a message
                        </li>
                        <li className=" text-left">
                            {time.toLocaleTimeString('en-US', { hour12: true })}
                        </li>
                    </ul>
                </div>
                )}
            </Menu.Item>
            </div>
        </Menu.Items>
        </Transition>
        </Menu>
    )
 }

 export default NotificationsMenu