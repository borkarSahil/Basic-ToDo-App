import { TodoProvider } from './contexts/TodoContext.js'
import { useEffect } from "react";
import { useState } from "react";
import TodoForm from './components/TodoForm.jsx';
import TodoItem from './components/TodoItem.jsx';


function App() {
  
  const [todos, setTodos] = useState([]);

  // We have written like this because we want to add previous value also including the new value
  // ... (spread value) is use to add all values
  const addTodo = (todo) => {
    setTodos( (prev) => [{
      id: Date.now(), ...todo },
      ...prev
    ])
  }

  const updateTodo = (id, todo) => {
    setTodos( (prev) => prev.map( (prevTodo) => (
      prevTodo.id === id ? todo : prevTodo
    )))
  }

  // In delete we create a new array and add all elements except the id one
  const deleteTodo = (id) => {
    setTodos( (prev) => prev.filter( (todo) => (
      todo.id !== id
    ) ))
  }

  // In this we first find the todo then we take all previous todos and in that we toggle completed 
  const toggleComplete = (id) => {
    setTodos( (prev) => prev.map( (prevTodo) => (
      prevTodo.id === id ? {
        ...prevTodo, completed: !prevTodo.completed
      } : prevTodo
    )))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))
    console.log("todos: ", todos);

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  },[])

  useEffect( () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  },[todos])

  return (
    <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">{/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            { 
              todos.map( (todo) => (
                <div key={todo.id} className='w-full'>
                  <TodoItem todo={todo} />
                </div>
              ))
           } 
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
