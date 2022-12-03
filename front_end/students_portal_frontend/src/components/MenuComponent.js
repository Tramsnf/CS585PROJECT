import ContactMenuComponent from "./menu/ContactMenuComponent";
import SearchProfilesComponent from "./SearchProfilesComponent";
import { useLazyQuery } from "react-apollo";
import { PROFILE_HIGHLIGHT } from "../GraphQL/Queries";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useStateValue } from "../utilities/StateProvider";

const MenuComponent = (props) => {

  const[{ user }, dispatch] = useStateValue();

  const[profileHighlights, setHighlights] = useState({
    recentlyContacted: [],
    frequentlyContacted: [],
  })

  const [getProfiles, searchProfiles] = useLazyQuery(PROFILE_HIGHLIGHT,{
    fetchPolicy: 'network-only', // network request no cache
    variables: {profile : "" },
  });

  useEffect(() => {
    getProfiles()
    const interval = setInterval(() => {
      console.log("get notifications")
        !searchProfiles.loading && getProfiles()
    }, 10000);
    return () => clearInterval(interval);
  },[]);


  useEffect(()=>{
      if(!searchProfiles.loading && searchProfiles.data){
        setHighlights({...searchProfiles.data.profileHighlights})
      }
  },[searchProfiles.data])

  return (
    <div className="h-full overflow-y-scroll">
      <SearchProfilesComponent />
      {
        // searchProfiles.loading && !searchProfiles.data 
        // ?
        // <div className='p-3 pb-0'>{/* loader */}

        //     <div className="font-extrabold p-10 m-5 text-lightgreen">
        //         <h1><FontAwesomeIcon icon='fa-spinner' className='animate-spin h-5 w-5 mr-3 inline text-center' /></h1>
        //     </div>

        // </div>
        // : 
        !profileHighlights ?
            <div className='p-3 pb-0'>
                <div className='p-0.5 text-left font-semibold text-base '>
                  { `Search a ${user.type === "student"? "lecturer" : "student"} to get started` }
                </div>
            </div>
        :
            <>  
              <div className='p-3 pb-0'>
                <div className='p-0.5 text-left font-semibold text-base '>
                  Recently Contacted
                </div>
                <div className='bg-white border border-gray border-opacity-20 rounded-lg'>
                    {!!profileHighlights.recentlyContacted.length &&  profileHighlights.recentlyContacted.map((value, index)=>
                          user.type==="student"?
                              <ContactMenuComponent
                                key={index}
                                name={value.lecturer.profile.userName}
                                registrationNumber={value.lecturer.registrationNumber}
                                profile={value.lecturer.profile.refId}
                                chat={value.id}
                                events={"eventsId"}
                              />
                              :
                              <ContactMenuComponent
                                key={index}
                                name={value.student.profile.userName}
                                registrationNumber={value.student.registrationNumber}
                                profile={value.student.profile.refId}
                                chat={value.id}
                                events={"eventsId"}
                              />
                          )}
                </div>
              </div>
              <hr className='pl-1 mt-3 h-px border-0' />
              <div className='p-3'>
                <div className='p-0.5 text-left font-semibold text-base '>
                  Frequently Contacted
                </div>
                <div className='bg-white border border-gray border-opacity-20 rounded-lg'>
                    {!!profileHighlights.frequentlyContacted.length &&  profileHighlights.frequentlyContacted.map((value, index)=>
                              user.type==="student"?
                              <ContactMenuComponent
                                key={index}
                                name={value.lecturer.profile.userName}
                                registrationNumber={value.lecturer.registrationNumber}
                                profile={value.lecturer.profile.refId}
                                chat={value.id}
                                events={"eventsId"}
                              />
                              :
                              <ContactMenuComponent
                                key={index}
                                name={value.student.profile.userName}
                                registrationNumber={value.student.registrationNumber}
                                profile={value.student.profile.refId}
                                chat={value.id}
                                events={"eventsId"}
                              />
                          )}
                </div>
              </div>
              </>
        }
    </div>
  );
};

export default MenuComponent;
