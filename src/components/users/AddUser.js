import React, { useState } from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";

const AddUser = () => {
  let history = useHistory();
  const [user, setUser] = useState();
  const [enteredValue,setinterdvalue] = useState("")

  // const { title} = user;
  const onInputChange = e => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setinterdvalue(e.target.value)
  };

  const onSubmit = async e => {
    e.preventDefault();
    if(enteredValue =="")return

    await axios.post("http://localhost:3003/questions", user);
    history.push("/");
  };
  return (
    <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">Add A Question</h2>
        <form onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Question"
              name="title"
              value={enteredValue} 
              onChange={e => onInputChange(e)}
            />
          </div>
          
          <button className="btn btn-primary btn-block" >Add Question</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
