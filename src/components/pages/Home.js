import React, { useState, useEffect } from "react";
import axios from "axios";
import classes from"./Home.module.css"
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";


const Home = () => {
  let history = useHistory();

  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3003/questions");
    setUser(result.data);
  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:3003/questions/${id}`);
    loadUsers();
    // await axios.delete(`http://localhost:3003/answers?postId=${id}`);
    // loadUsers();
    history.push("/");
  };

  return (
    <div className="container">
      <div className="py-4">
        <h1>Question Page</h1>
        <Link className={classes.add} to="/users/add"
        >Add Question</Link>

        <table className="table border shadow">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Question</th>
              {/* <th scope="col">User Name</th>
              <th scope="col">Email</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td className={classes.title}>{user.title}</td>
                {/* <td>{user.username}</td>
                <td>{user.email}</td> */}
                <td className={classes.action}>
                  <Link className="btn btn-primary mr-2" to={`/users/${user.id}`}>
                    View Answers
                  </Link>
     
                  <button
                    className="btn btn-danger"
                    // to={`/`}
                    onClick={() => deleteUser(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
