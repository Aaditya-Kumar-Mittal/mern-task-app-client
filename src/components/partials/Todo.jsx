import React from "react";
import moment from "moment/moment.js"; // Importing moment.js library for date formatting
import { deleteTodoApi, markTodoApi } from "../../services/api"; // Importing API functions for deleting and marking todos
import { toast } from "react-toastify"; // Importing toast from react-toastify for displaying messages
import "react-toastify/dist/ReactToastify.css"; // Importing CSS for react-toastify

function Todo({ todo, setRefreshlist }) {
  // Function to handle deletion of a todo
  const handleDelete = async () => {
    const result = await deleteTodoApi({
      todo_id: todo._id,
    });

    console.log("delete todo", result);
    if (result.data.status === 200) {
      setRefreshlist(new Date());
      toast.success(result.data.message); // Display success toast message
    } else {
      toast.error(result.data.message); // Display error toast message
    }
  };

  // Function to handle marking a todo as completed or pending
  const handleMarkTask = async () => {
    const result = await markTodoApi({
      todo_id: todo._id,
    });

    console.log("mark todo", result);
    if (result.data.status === 200) {
      setRefreshlist(new Date());
      toast.success(result.data.message); // Display success toast message
    } else {
      toast.error(result.data.message); // Display error toast message
    }
  };

  // Calculate the time passed since the todo was created
  const timePassed = moment(todo.date).fromNow();

  return (
    <div
      className="col-md-5 mx-3 my-2 alert "
      style={{
        border: "5px solid rgb(129, 0, 52)",
        borderRadius: "25px",
        backgroundColor: "rgb(255, 150, 100)",
      }}
    >
      <div
        className="card-header text-center"
        style={{
          fontSize: "15px",
          fontWeight: "bold",
          color: "#990000",
        }}
      >
        {moment(todo.date).format("LLL")} {/* Displaying date and time */}
        <br />
        <small>{timePassed}</small> {/* Displaying time passed */}
      </div>
      <div className="card-body text-warning text-center">
        <h4
          className="cart-title my-3"
          style={{ fontSize: "30px", color: "black" }}
        >
          {todo.desc} {/* Displaying todo description */}
        </h4>
        <p
          className="card-text"
          style={{ color: "rgb(38, 0, 27)", fontSize: "20px", margin: "15px" }}
        >
          {/* Displaying completion status */}
          {todo.isCompleted ? "🥳Completed, Yay!🥳" : "⌛Pending Task⌛"}
        </p>
      </div>
      <div
        className="actionButtons "
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Flex container for buttons */}
        <div className="deleteButton">
          <button
            className="btn"
            style={{
              backgroundColor: "rgb(129, 0, 52)",
              color: "rgb(255, 246, 0)",
              padding: "10px",
              boxShadow: "none",
            }}
            onClick={handleDelete} // Call handleDelete function on click
          >
            Delete Task!❌
          </button>
        </div>
        <div className="markTodo">
          <button
            className="btn"
            style={{
              backgroundColor: "rgb(129, 0, 52)",
              color: "rgb(255, 246, 0)",
              padding: "10px",
              boxShadow: "none",
            }}
            onClick={handleMarkTask} // Call handleMarkTask function on click
          >
            {/* Displaying appropriate text based on completion status */}
            {todo.isCompleted ? "Not Completed!❌" : "Completed!✅"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Todo;
