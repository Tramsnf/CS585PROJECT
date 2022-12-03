import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { useMutation } from "react-apollo";
import { CREATE_PROFILE } from "../GraphQL/Mutations";
import { getActiveProfile } from "../GraphQL/Queries";
import { useStateValue } from "../utilities/StateProvider";
import UserService from "../utilities/UserService";

const GetStartedComponent = () => {

    const[{ user }, dispatch] = useStateValue();
    

    const updateCache = (cache, { data }) => {
        var existingProfile = cache.readQuery({
          query: getActiveProfile
        });

        console.log("existing profile " ,existingProfile);
        console.log("new profile ", data)
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

    const[createProfile, { error, loading }] = useMutation(CREATE_PROFILE, { update: updateCache } );

    const initializeProfile = (profile) =>{
        console.log(`initializing profile ${profile}`)
        createProfile({ 
            variables: { profile: profile }
        })
    }

      useEffect(()=>{
        var profile = UserService.getProfile();
        if(profile!==""){
            console.log("initializing profile automatically ",profile)
            initializeProfile(profile);
        }
      },[])

    return (
        <div className=" flex justify-center w-full h-full pt-20 ">
            <div className=" inline-block border border-graydark rounded">
                <div>
                    <h2 className="text-4xl font-extrabold mt-20 pb-5">Login as student or lecturer</h2>
                </div>
                  { !loading ?
                  <table>
                    <tbody>
                            <tr>
                                <td>
                                    <div onClick={() => initializeProfile("student")} className="text-2xl font-extrabold p-10 m-5 border cursor-pointer  rounded border-lightgreen hover:bg-lightgreen hover:text-white">
                                    <h4>I am a student</h4>
                                    </div>
                                </td>
                                <td>
                                <div onClick={() => initializeProfile("lecturer")} className="text-2xl font-extrabold p-10 m-5 border cursor-pointer  rounded border-lightgreen hover:bg-lightgreen hover:text-white">
                                        <h4>I am a lecturer</h4>
                                    </div>
                                </td>
                            </tr>
                    </tbody>
                </table>
                    : 
                    <div className="font-extrabold p-10 m-5 text-lightgreen">
                                        <h1><FontAwesomeIcon icon='fa-spinner' className='animate-spin h-5 w-5 mr-3 inline text-center' /></h1>
                                    </div>
                    }
                {/* <div className="flex justify-end  mt-10">
                    {!!profile &&<Link to="/profile" className="cursor-pointer rounded p-3 pl-10 pr-10 inline-block text-lg  text-white font-bold bg-lightgreen" onClick={() => console.log("redirect to home")}>Proceed</Link>}
                </div> */}
            </div>
        </div>

     
    )

}

export default GetStartedComponent;