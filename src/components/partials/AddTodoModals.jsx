import React, { useState } from "react";
import { toast } from "react-toastify"; // Importing ToastContainer and toast from react-toastify
import "react-toastify/dist/ReactToastify.css"; // Importing CSS for react-toastify
import { createTodoApi } from "../../services/api"; // Importing the createTodoApi function from the api service

function AddTodoModals({ setRefreshlist }) {
  // State to manage the todo description
  const [todoDesc, setTodoDesc] = useState("");

  // Function to handle todo submission
  const handleTodoSubmit = async () => {
    console.log(todoDesc, "todoDesc"); // Logging the todo description

    // Check if todo description is empty
    if (todoDesc === "") {
      toast.info("Task Description is required!"); // Display toast message if description is empty
      return;
    }

    // Call the createTodoApi function to create a new todo
    const result = await createTodoApi({ desc: todoDesc });
    console.log(result); // Log the result from the API call

    // Check if the API call was successful
    if (result.status === 200 && result.data.status === 200) {
      toast.success("Task Added to the TodoList!"); // Display success toast message
      setRefreshlist(new Date());
    } else {
      toast.error(result.data.message); // Display error toast message if API call fails
    }
  };

  return (
    <div className="modal mt-5" id="exampleModal">
      <div className="modal-dialog" role="document">
        <div
          className="modal-content"
          style={{
            backgroundColor: "rgb(255, 150, 100)",
            border: "5px solid rgb(129, 0, 52)",
          }}
        >
          <div className="modal-header">
            <div
              className="modal-title text-center"
              style={{ color: "rgb(38, 0, 27)", fontSize: "20px" }}
            >
              Create a Task!
            </div>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="close"
              onClick={() => {
                setTodoDesc(""); // Clear todo description state on click
              }}
              style={{ color: "rgb(38, 0, 27)", fontSize: "20px" }}
            >
              <span aria-hidden="true"></span>
            </button>
          </div>
          <div className="modal-body">
            <div className="form-grouop">
              <textarea
                name=""
                className="form-control"
                rows={3}
                onChange={(e) => {
                  setTodoDesc(e.target.value); // Update todo description state on change
                }}
                style={{ color: "rgb(38, 0, 27)", fontSize: "20px" }}
                placeholder="Add Task Description"
              ></textarea>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              style={{
                backgroundColor: "rgb(129, 0, 52)",
                color: "rgb(255, 246, 0)",
              }}
              data-bs-dismiss="modal"
              onClick={handleTodoSubmit} // Call handleTodoSubmit function on click
            >
              Save Task
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={() => {
                setTodoDesc(""); // Clear todo description state on click
              }}
              style={{
                backgroundColor: "rgb(129, 0, 52)",
                color: "rgb(255, 246, 0)",
              }}
            >
              Clear Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddTodoModals;
