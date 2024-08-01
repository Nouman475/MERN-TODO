import React, { useState, useLayoutEffect } from "react";
import "./../../../scss/_dashboard.scss";
import { Collapse } from "antd";
import Data from "./Data";
import axios from "axios";
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

const notify = (msg, type) => {
  const bgGradients = {
    success: "linear-gradient(to right, #56ab2f, #a8e063)",
    error: "linear-gradient(to right, #f12711, #f5af19)",
    default: "linear-gradient(to right, #00b4db, #0083b0)",
  };
  const bg = bgGradients[type] || bgGradients.default;
  Toastify({
    text: msg,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "left",
    stopOnFocus: true,
    style: {
      background: bg,
    },
  }).showToast();
}

function Dashboard() {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({ title: "", desc: "" });

  let email = localStorage.getItem("email");

  const handleChange = (e) => {
    setTodo({ ...todo, [e.target.name]: e.target.value, email });
  };

  const NoTodo = React.memo(() => {
    return (
      <div className="col-lg-3 p-3">
        <div className="card p-3" id="todoCard">
          <img
            src="https://cdni.iconscout.com/illustration/premium/thumb/no-data-found-8867280-7265556.png"
            alt="blank"
          />
          <p className="text-center">No Todo to show</p>
        </div>
      </div>
    );
  });

  //GET OR READ TODOS

  const fetchTodos = async (user_id) => {
    try {
      const response = await axios.get(
        `${window.location.origin}/api/v2/getTask/${user_id}`
      );
      const todos = response.data.tasks;
      if (todos.length > 0) {
        setTodos(todos);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const user_id = localStorage.getItem("user_id");
  fetchTodos(user_id);

  //Create TODO

  const handleSubmit = (e) => {
  e.preventDefault()
    axios
      .post(`${window.location.origin}/api/v2/addTask`, todo)
      .then(() => {
        notify("todo created, refresh to see changes","default")
      })
      .catch(() => {
        notify("Failed to create Network problem","error")
      });
  };

  //Delete TODO

  const handleDel = (id) => {
     axios
      .delete(`${window.location.origin}/api/v2/deleteTask/${id}`)
      .then(() => {
        notify("todo deleted","default")
      })
      .catch(() => {
        notify("Error deleting todo network issue","error")
      });
  };

  //update todo

  const [index, setIndex] = useState(null);
  const [id, setId] = useState("");

  const handleUpdate = async () => {
    await axios
      .put(`${window.location.origin}/api/v2/updateTask/${id}`, todo)
      .then(() => {
        notify("todo edited","success")
      })
      .catch(()=>{
        notify("Failed to edit Network problem","error")
      })
  };

  const handleEdit = (i, todo, id) => {
    setIndex(i);
    setTodo(todo);
    setId(id);
  };

  //ASSIGNING IMAGES INTELLIGENCE LOGIC

  const getImageUrl = (title) => {
    switch (title) {
      case 'Play':
      case 'Game':
      case 'Fun':
      case 'Entertainment':
        return Data[0];
      case 'Drink':
      case 'Water':
      case 'Juice':
      case 'Soda':
        return Data[1];
      case 'Sleep':
      case 'Nap':
      case 'Dream':
        return Data[2];
      case 'Eat':
      case 'Food':
      case 'Meal':
      case 'Snack':
        return Data[3];
      case 'Groceries':
      case 'Shopping':
      case 'Market':
      case 'Store':
        return Data[4];
      case 'Walk':
      case 'Run':
      case 'Jog':
      case 'Exercise':
        return Data[5];
      case 'Study':
      case 'Learn':
      case 'Read':
      case 'Research':
        return Data[6];
      case 'Rest':
      case 'Relax':
      case 'Calm':
      case 'Chill':
        return Data[7];
      case 'Anything Important':
      case 'Urgent':
      case 'Emergency':
      case 'Priority':
        return Data[8];
      default:
        return Data[9];
    }
  };
  

  
  useLayoutEffect(() => {
    setTimeout(() => {
      todos.forEach((todo, index) => {
        let URL = getImageUrl(todo.title);
        let element = document.getElementById(`todo-${index}`);
        if (element) {
          element.style.backgroundImage = `url(${URL})`;
        } else {
          console.log('element not found');
        }
      });
    }, 0);
  }, [todos]);

  return (
    <>
      <div className="container my-3 p-2">
        <h2 className="text-primary">Dashboard</h2>
        <div className="container my-4">
          <div className="row">
            {todos.length === 0 && <NoTodo />}
            {todos.map((todo, index) => {
              let { title, desc } = todo;
              return (
                <div className="col-lg-3 p-3" key={index}>
                  <div className="card p-3" id={`todo-${index}`}>
                    <span className="hash fs-1">#{index + 1}</span>
                    <img
                      src="https://png.pngtree.com/png-vector/20220926/ourmid/pngtree-delete-button-3d-icon-png-image_6217492.png"
                      alt="delete"
                      onClick={() => {
                        handleDel(todo._id);
                      }}
                      className="delete"
                      id={todo._id}
                    />
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/3597/3597075.png"
                      alt="edit"
                      id="edit"
                      onClick={() => handleEdit(index, todo, todo._id)}
                      className="edit"
                      data-bs-toggle="modal"
                      data-bs-target="#updateModal"
                      data-bs-whatever="@fat"
                    />
                    <br />
                    <span className="hash1">#Title</span>
                    <p>{title}</p>
                    <span className="hash2">#Description</span>
                    <Collapse>
                      <Collapse.Panel
                        header={
                          desc
                            ? desc.substring(0, 20) + "..."
                            : "No description"
                        }
                        key="1"
                      >
                        <p>{desc}</p>
                      </Collapse.Panel>
                    </Collapse>
                  </div>
                </div>
              );
            })}
            <div className="col-lg-3 p-3">
              <div className="card p-3">
                <img
                  data-bs-toggle="modal"
                  data-bs-target="#exampleModal"
                  src="https://cdn-icons-png.flaticon.com/512/7598/7598663.png"
                  alt="addTodo"
                />
                <p className="text-center">Add todo</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content form-container">
                <div className="modal-header form-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Details
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body form-body">
                  <form>
                    <label htmlFor="Task-Name">Task Name</label>
                    <br />
                    <input
                      onChange={handleChange}
                      type="text"
                      id="taskName"
                      name="title"
                      placeholder="Enter task name"
                    />
                    <br />
                    <label htmlFor="Description">Description</label>
                    <br />
                    <input
                      onChange={handleChange}
                      type="text"
                      id="description"
                      name="desc"
                      placeholder="description"
                    />
                    <br />
                    <button type="submit" onClick={handleSubmit}>
                      add task
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade"
          id="updateModal"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Edit task
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <label htmlFor="Task-Name">Task Name</label>
                  <br />
                  <input
                    value={todo.title}
                    onChange={handleChange}
                    type="text"
                    id="taskName"
                    name="title"
                    placeholder="Enter task name"
                  />
                  <br />
                  <label htmlFor="Description">Description</label>
                  <br />
                  <input
                    onChange={handleChange}
                    type="text"
                    value={todo.desc}
                    id="description"
                    name="desc"
                    placeholder="description"
                  />
                  <br />
                  <button
                    onClick={() => {
                      handleUpdate(todo);
                    }}
                    type="submit"
                  >
                    save changes
                  </button>
                </form>
              </div>
              <div className="modal-footer"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
