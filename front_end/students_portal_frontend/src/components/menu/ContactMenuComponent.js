import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const ContactMenuComponent = (props) => {
    const {
        name,
        registrationNumber,
        profile,
        chat,
        events
    } = props

    return(
        
            <div className="cursor-pointer p-2 hover:text-primary">
                <table>
                    <tbody>
                    <tr>
                        <td> 
                                <div className="m-2 w-10 h-10 rounded-full bg-[url('assets/avatar.jpg')] relative">
                                    <div className="absolute bottom-0 rounded-full right-0 w-4 h-4 bg-lightgreen border-4 border-white"></div>
                                </div>
                        </td>
                        <td>
                        <div>
                            <table>
                                <tbody>
                                    <tr>
                                        <td colSpan={10} className="p-0.5 text-left font-semibold text-base ">
                                            {name}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan={7} className="p-0.5 text-left text-gray text-xs font-light">
                                            {registrationNumber}
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <Link to={{ pathname: `/chat/${profile}` }}>
                                                <div className="cursor-pointer  flex justify-center items-center  p-2 w-7 h-7 bg-transparentgray rounded-full text-gray hover:bg-primary hover:text-white">
                                                    <FontAwesomeIcon icon="fa-paper-plane" className="text-xs inline"/>
                                                </div>
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={{ pathname: `/meeting/create/${profile}` }}>
                                                <div className="cursor-pointer flex justify-center items-center  p-2 w-7 h-7 bg-transparentgray rounded-full text-gray hover:bg-primary hover:text-white">
                                                    <FontAwesomeIcon icon="fa-plus" className="text-xs inline"/>
                                                </div>
                                            </Link>                                        
                                        </td>
                                        <td>
                                            <Link to={{ pathname: `/events/${profile}` }}>
                                                <div className="cursor-pointer flex justify-center items-center  p-2 w-7 h-7 bg-transparentgray rounded-full text-gray hover:bg-primary hover:text-white">
                                                    <FontAwesomeIcon icon="fa-calendar" className="text-xs inline" />
                                                </div>
                                            </Link>
                                        </td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    </tbody>
                            </table>
                        </div>
                        </td>
                    </tr>
                    </tbody>
            </table>
            </div>
    )
}

export default ContactMenuComponent