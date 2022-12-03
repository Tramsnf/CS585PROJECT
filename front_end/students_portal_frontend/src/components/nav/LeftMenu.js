import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import App_Icon from "../../assets/app_icon.svg";
import Icon from "../../assets/fire.svg";

const LeftMenu = () => {
  return (
    <div className='flex flex-col flex-wrap items-center justify-center'>
      <Link to="/" className=" cursor-pointer">
        <div className=" inline-block"><img src={App_Icon} className='h-6 w-6 m-3' /></div>
      </Link>
    </div>
  );
};

export default LeftMenu;
