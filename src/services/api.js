import axios from 'axios'; // Importing axios for making HTTP requests
import { CREATE_TODO, DELETE_TODO, GET_TODO, LOGIN, MARK_TODO, REGISTER } from './apiConstants'; // Importing API endpoint constants

// Function to handle user login
export const login = async (data) => {
    return axios.post(LOGIN, data); // Making a POST request to the login endpoint with user data
}

// Function to handle user registration
export const register = async (data) => {
    return axios.post(REGISTER, data); // Making a POST request to the register endpoint with user data
}

// Function to create a new todo
export const createTodoApi = async (data) => {
    let token = getToken(); // Get user token from local storage
    console.log(token, 'token for creating a task'); // Logging the user token
    return axios.post(CREATE_TODO, data, { // Making a POST request to the create todo endpoint with todo data and token in headers
        headers: {
            auth: token // Setting authorization header with user token
        }
    });
}

// Function to get the list of todos
export const getTodoListApi = async (data) => {
    let token = getToken(); // Get user token from local storage
    console.log(token, 'token for getTodoList'); // Logging the user token
    return axios.get(GET_TODO, { // Making a GET request to the get todo list endpoint with token in headers
        headers: {
            auth: token // Setting authorization header with user token
        }
    });
}

// Function to delete a todo
export const deleteTodoApi = async (data) => {
    let token = getToken(); // Get user token from local storage
    console.log(token, 'token for delete Task'); // Logging the user token
    return axios.post(DELETE_TODO, data, { // Making a POST request to the delete todo endpoint with todo data and token in headers
        headers: {
            auth: token // Setting authorization header with user token
        }
    });
}

// Function to mark a todo as completed
export const markTodoApi = async (data) => {
    let token = getToken(); // Get user token from local storage
    console.log(token, 'token for marking the task'); // Logging the user token
    return axios.post(MARK_TODO, data, { // Making a POST request to the mark todo endpoint with todo data and token in headers
        headers: {
            auth: token // Setting authorization header with user token
        }
    });
}

// Function to get user token from local storage
export function getToken() {
    let user = localStorage.getItem('user'); // Get user data from local storage
    if (!user) return; // If user data is not available, return
    const userObj = JSON.parse(user); // Parse user data to JSON object
    return userObj.token; // Return user token
}
