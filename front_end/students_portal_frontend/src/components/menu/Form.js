import React, { useState } from "react";


function Form() {
  const [ID, setID] = useState("");
  const [registrationNumber, setRegistrationNumber] = useState("");
  const [email, setEmail] = useState("");
  const [refId, setRefID] = useState("");
  const [userName, setUserName] = useState("");

  return (
    <form id='add-book'>
      <div className='field'>
        <input
          type='text'
          placeholder='Type of ID registration'
          onChange={(e) => {
            setID(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder='Registration Number'
          onChange={(e) => {
            setRegistrationNumber(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder='Email'
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder='refID'
          onChange={(e) => {
            setRefID(e.target.value);
          }}
        />
        <input
          type='text'
          placeholder='Username'
          onChange={(e) => {
            setUserName(e.target.value);
          }}
        />
        <div className='field'>
          <label>User:</label>
          {/* <select>
            <option>Select author</option>
            
          </select> */}
        </div>
        <button > Create User</button>
      </div>
    </form>
  );
}

export default Form;
