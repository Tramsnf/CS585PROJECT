import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const UserAccountType = () => {
  const [countries, setCountries] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // user type account for users
    fetch("")
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);
  return (
    <div className='w-72 font-medium h-80'>
      <div
        onClick={() => setOpen(!open)}
        className={`bg-lightgray bg-opacity-20 outline outline-1 outline-graymedium w-full p-2 flex items-center justify-between rounded ${
          !selected && "text-gray"
        }`}>
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : "user of account"}
        <FontAwesomeIcon
          icon='fa-arrow-down'
          size={20}
          className={` text-xs inline ${open && "rotate-180"}`}
        />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        } `}>
        <div className='flex items-center px-2 sticky top-0 bg-white'>
          <FontAwesomeIcon icon='fa-search' size={20} className='text-gray' />
          <input
            type='text'
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder='enter type of account'
            className='placeholder:text-gray p-2 outline-none'
          />
        </div>
        {countries?.map((country) => (
          <li
            key={country?.name}
            className={`p-2 text-sm hover:bg-blue hover:text-white
            ${
              country?.name?.toLowerCase() === selected?.toLowerCase() &&
              "bg-blue text-white"
            }
            ${
              country?.name?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (country?.name?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(country?.name);
                setOpen(false);
                setInputValue("");
              }
            }}>
            {country?.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserAccountType;
