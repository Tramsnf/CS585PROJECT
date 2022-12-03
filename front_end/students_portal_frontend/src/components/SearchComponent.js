import React, { useEffect, useState } from "react";
import { useQuery } from "react-apollo";
import { getActiveProfile, SEARCH_PROFILES } from "../GraphQL/Queries";
import ContactMenuComponent from "./menu/ContactMenuComponent";

const SearchComponent = () => {

  // const [searchTerm, setSearchTerm] = useState('') 
  // var [profile, setProfile] = useState("");

  // const searchProfiles = useQuery(SEARCH_PROFILES,{
  //   fetchPolicy: 'network-only', // Doesn't check cache before making a network request
  //   variables: {profile : profile, name : searchTerm},
  // });

  // const activeProfile = useQuery(getActiveProfile,{
  //   fetchPolicy: 'cache-only', // Doesn't check cache before making a network request
  // });

  // useEffect(() => {
  //   if(!activeProfile.error && !activeProfile.loading){
  //       setProfile(activeProfile.data.getActiveProfile.type);
  //   }
  // },[activeProfile.data]);



  // useEffect(() => {
  //   const delayDebounceFn = setTimeout(() => {
  //     console.log(searchTerm)
  //     searchProfiles.refetch({ 
  //       variables: {profile : profile, name : searchTerm}
  //     })
  //     // Send Axios request here
  //   }, 3000)

  //   return () => clearTimeout(delayDebounceFn)
  // }, [searchTerm])

  return (
    <>
        <div className='p-3 pb-0'>
            <form>
              <label
                for='default-search'
                className='mb-2 text-sm font-medium text-white sr-only '>
                Search
              </label>
              <div className='relative w-4/4 pr-3'>
                <div className='flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none'>
                  <svg
                    aria-hidden='true'
                    className='w-5 h-5 text-gray'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                    xmlns='http://www.w3.org/2000/svg'>
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth='2'
                      d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'></path>
                  </svg>
                </div>
                <input
                  type='search'
                  id='default-search'
                  className='block p-4 pl-10 w-full text-sm text-secondary font-bold bg-lightgray rounded-lg border outline outline-lightgray outline-1 h-[35px] border-gray border-opacity-20'
                  placeholder='Search'
                  required=''
                  // onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* <button
                  type='submit'
                  className='text-blue absolute right-2.5 bottom-2.5 bg-blue- hover:bg-blue focus:ring-4 focus:outline-none focus:ring-blue font-medium rounded-lg text-sm px-4 py-2'>
                  Search
                </button> */}
              </div>
            </form>
        </div>
      
    </>
  );
};

export default SearchComponent;
