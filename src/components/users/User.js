import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import classes from"./User.module.css"


const User = () => {
  const [user, setUser] = useState([]);
  const { id } = useParams();

  const [newAnswer, setAnswer] = useState("");
  const { body, postId } = newAnswer;

  useEffect(() => {
    loadUser();
  }, []);
  const loadUser = async () => {
    const res = await axios.get(`http://localhost:3003/answers?postId=${id}`);//http://localhost:3003/answers?postId=2
    setUser(res.data);
    console.log('hiii',res.data)
  };

  const deleteUser = async id=> {
    // user.answers.splice(index,1)
    await axios.delete(`http://localhost:3003/answers/${id}`);
    loadUser();

    // const ansewrs = user;
    // setUser(ansewrs);
     console.log("ana hena fe users",user)
    
  }

  const onIChange = e => {
    setAnswer(e.target.value);
    console.log(newAnswer)
  };

const onSubmit = async e=>{

  e.preventDefault();
  if(newAnswer=="")return
  const postData  = {
    body:newAnswer,
    postId:id
  }

  await axios.post(`http://localhost:3003/answers?postId=${id}`, postData);
  loadUser();
  setAnswer("");

}

  return (
    <div className="container py-4">
      <Link className={classes.back} to="/">
        back to Home
      </Link>

      <form onSubmit={e => onSubmit(e)} className={classes.addanswer}>
          <div className="form-group">
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter Your Answers"
              name="body"
              value={newAnswer}
              onChange={onIChange}
            />
          </div>
          
          <button className="btn btn-primary btn-block">Add Answer</button>
        </form>
      <h1 className="display-4">User Id: {id}</h1>
      <hr />
      <ul className="list-group w-100">
        <li className="list-group-item">name: {user.title}</li>
        <li className="list-group-item">Answers: 
           {user.map((res,index)=>
                  <div key={index} className={classes.answer}>
                  <h2 className={classes.answer_text} >{res.body}</h2>
                  <button
                  className="btn btn-danger"
                  // to={`/`}
                  onClick={() => deleteUser(res.id)}
                >
                  Delete
                </button>
                </div>
        )}
               
         </li>
   
      </ul>
    </div>
  );
};

export default User;
