import React, { useState } from "react";
import Header from "./partials/Header"; // Importing Header component
import Todo from "./partials/Todo"; // Importing Todo component
import AddTodoModals from "./partials/AddTodoModals"; // Importing AddTodoModals component
import { useEffect } from "react"; // Importing useEffect hook
import { getTodoListApi, getToken } from "../services/api"; // Importing API functions
import { useNavigate } from "react-router-dom"; // Importing useNavigate hook from react-router-dom
import "./style.css"; // Importing the CSS file

function Home() {
  const navigation = useNavigate(); // Using useNavigate hook from react-router-dom

  // State variables
  const [list, setList] = useState([]); // State to store the list of todos
  const [refreshlist, setRefreshlist] = useState(); // State to trigger list refresh
  const [searchText, setSearchText] = useState(""); // State to store search text
  const [filteredList, setFilteredList] = useState([]); // State to store filtered list of todos

  // useEffect hook to fetch todo list and check authentication
  useEffect(() => {
    if (!getToken()) {
      navigation("/login"); // Redirect to login page if token is not available
    }
    fetchTodoList(); // Fetch todo list
  }, [navigation, refreshlist]); // Dependencies: navigation and refreshlist

  // useEffect hook to filter todo list based on search text
  useEffect(() => {
    if (searchText === "") {
      setFilteredList(list); // If search text is empty, set filtered list as the original list
    } else {
      // Otherwise, filter the list based on search text
      const filterlist = list.filter((todos) =>
        todos.desc.toLowerCase().includes(searchText.toLowerCase().trim())
      );
      setFilteredList(filterlist); // Set the filtered list
    }
  }, [list, searchText]); // Dependencies: list and searchText

  // Function to fetch todo list from API
  async function fetchTodoList() {
    const result = await getTodoListApi(); // Call getTodoListApi function
    console.log("todolist", result);
    if (result.status === 200 && result.data.status === 200) {
      setList(result.data.data.todos.reverse()); // If successful response, set the list of todos
    }
  }

  return (
    <div>
      <Header searchText={searchText} setSearchText={setSearchText} />{" "}
      {/* Header component with search functionality */}
      <div className="container">
        <div className="row justify-content-md-center mt-4">
          {/* Conditionally render todos or 'No Todos Found' message */}
          {filteredList.length === 0 ? ( // If filtered list is empty
            <div className="notFoundTodos">
              {" "}
              {/* Styling for 'No Todos Found' message */}
              <div>No Todos Found!</div>{" "}
              {/* Display 'No Todos Found' message */}
            </div>
          ) : (
            // If filtered list is not empty, map over todos and render Todo component
            filteredList.map((todo) => (
              <Todo
                key={todo._id}
                todo={todo}
                setRefreshlist={setRefreshlist}
              /> // Todo component with todo data and setRefreshlist function
            ))
          )}
        </div>

        {/* Button to open Add Todo modal */}
        <div
          className=""
          style={{ position: "fixed", right: 50, bottom: 50, zIndex: 100 }}
        >
          <button
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            className="btn btn-outline-light"
            style={{
              backgroundColor: "rgb(129, 0, 52)",
              color: "rgb(255, 246, 0)",
            }}
          >
            Create a Task!
          </button>
        </div>

        {/* AddTodoModals component for adding new todos */}
        <AddTodoModals setRefreshlist={setRefreshlist} />
      </div>
    </div>
  );
}

export default Home;
