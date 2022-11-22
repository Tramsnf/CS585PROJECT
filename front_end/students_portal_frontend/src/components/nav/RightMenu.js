import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import picture from "../../assets/avatar.jpg";
import { Fragment, useEffect, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import UserService from "../../utilities/UserService";
import NotificationsMenu from "./NotificationsMenu";
import { getActiveProfile } from "../../GraphQL/Queries";
import { useQuery,useMutation } from "react-apollo";
import { CREATE_PROFILE } from "../../GraphQL/Mutations";
import { useStateValue } from "../../utilities/StateProvider";


const RightMenu = () => {

  const[{ user }, dispatch] = useStateValue();

  const { loading, error, data } = useQuery(getActiveProfile,{
    fetchPolicy: 'cache-only', // Doesn't check cache before making a network request
  });


  const updateCache = (cache, { data }) => {
    
    var existingProfile = cache.readQuery({
      query: getActiveProfile
    });
    existingProfile = {
            query: getActiveProfile,
            data: {
                getActiveProfile: {...data.createProfile}
            }
    }
    // update profile in cache
    cache.writeQuery({...existingProfile});
    dispatch({
        type: 'SET_USER',
        user: data.createProfile
    })
  };

const[createProfile, createProfileStatus] = useMutation(CREATE_PROFILE, { update: updateCache } );

const initializeProfile = (profile) =>{
    console.log(`initializing profile ${profile}`)
    createProfile({ 
        variables: { profile: profile },
        refetchQueries: { getActiveProfile }
    })
}

  return (
    <div className='flex flex-wrap flex-row-reverse'>
      <Menu as='div'>
        <Menu.Button className="relative mr-3 w-10 h-10 rounded-full bg-[url('assets/avatar.jpg')]  border-2 border-white hover:border-primary border-solid">
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
          <Menu.Items className='absolute w-60 border-0 right-5 z-10 origin-top-right bg-white top-full rounded m-0 mt-2 pt-2.5 pb-2.5 list-none shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
            <div className='py-1'>
              <Menu.Item>
                {({ active }) => (
                  <div className='flex items-center flex-col'>
                    <img
                      loading='lazy'
                      alt=''
                      src={picture}
                      className='w-20 h-20 rounded-full object-cover overflow-hidden'
                    />
                    <div className=' w-full p-2 mt-2 text-xl'>
                      {user.profile.userName}
                    </div>
                    <div className='text-xs text-gray'>
                      {user.profile.email}
                    </div>
                    <div className=' text-xs text-gray'>
                      {user.type}
                      </div>
                  </div>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <div onClick={() => initializeProfile(user.type == "student" ? "lecturer" : "student")}>
                    <button
                      type='button'
                      data-cy='logout-trigger'
                      className='link-logout nav-menu-item p-0 m-2.5 shadow-none text-gray hover:text-primary'>
                      {/* <span
                        size='md'
                        aria-hidden='true'
                        className='up-s-nav-icon nav-options-icon'>
                        <FontAwesomeIcon icon={"fa-arrow-right-from-bracket"} />
                      </span> */}
                      <span>&nbsp;&nbsp;Switch to {user.type == "student" ? "lecturer" : "student"}</span>
                    </button>
                  </div>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <div onClick={() => UserService.doLogout()}>
                    <button
                      type='button'
                      data-cy='logout-trigger'
                      className='link-logout nav-menu-item p-0 m-2.5 shadow-none'>
                      <span
                        size='md'
                        aria-hidden='true'
                        className='up-s-nav-icon nav-options-icon'>
                        <FontAwesomeIcon icon={"fa-arrow-right-from-bracket"} />
                      </span>
                      <span>&nbsp;&nbsp;Log out</span>
                    </button>
                  </div>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <NotificationsMenu />
      
      {/* <button>
        <div className='mr-3 cursor-pointer flex justify-center items-center w-10 h-10 bg-transparentgray rounded-full text-gray hover:text-primary border-2 border-white hover:border-primary border-solid'>
          <FontAwesomeIcon icon='fa-gear' className='inline text-2xl ' />
        </div>
      </button> */}
    </div>
  );
};

export default RightMenu;
