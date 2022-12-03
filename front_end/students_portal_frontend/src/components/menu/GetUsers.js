import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { LOAD_STUDENTS } from "../../GraphQL/Queries";

function GetUsers() {
  const { error, loading, data } = useQuery(LOAD_STUDENTS);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (data) {
      setUsers(data.students);
    }
  }, [data]);

  return (
    <div>
      {" "}
      {users.map((val) => {
        return <span> {val.id}</span>;
      })}
    </div>
  );
}

export default GetUsers;
