import { createContext, useContext }  from "react";

export const TodoContext = createContext( {
// In this we can write arr, obj, data and we have to declare functions name not its working
    todos: [
        {
            id:1,
            todo:"Task 1",
            completed: false,
        },
    ],
    // Functions defination
    addTodo : (todo) => {},
    updateTodo : (id, todo) => {},
    toggleComplete : (id) => {},
    deleteTodo : (id) => {},
})

export const useTodo = () => {
    return useContext(TodoContext);
}

export const TodoProvider = TodoContext.Provider