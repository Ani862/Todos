import { useReducer, useState } from 'react';
import './App.css';
import TodoList from './TodoList';
import TodoHeader from './TodoHeader';
import TodoFooter from './TodoFooter';
import { type } from '@testing-library/user-event/dist/type';


function reducer(state, action) {
  if(action.type === "add"){
    return[
      ...state,
      {
        id:1,
        text: action.payload.text,
        isCompleted: false
      }
    ];
  }else if(action.type === "delete"){
    return state.filter((t)=>t.id !== action.payload.id)
  }else if(action.type === "completed") {
    return state.map((todo)=> todo.id !== action.payload.id) 
  }else if (action.type ==="clearCompleted") {
    return state.filter((todo)=> todo.id  !== todo.completed)
    
  }

}


function App() {

  const [todos, dispatch] = useReducer(reducer,[
    {id: 1, text:"Java Script", completed: false },
    {id: 2, text:"React", completed: false },
    {id: 3, text:"Html", completed: false },
    {id: 4, text:"Css", completed: false },
    {id: 5, text:"Next", completed: false },
  ])
  return(
    <div className="App">
      <div className="AppCont">

        <TodoHeader onAdd={(text)=>{
          dispatch({
            type: "add",
            payload:{
              text:text
            }
          });
        //   ...todos,
        //   {
        //     id:6,
        //     text:text,
        //     completed:false
        //   }
        // ])
        }}/>
        
        <TodoList
         todos ={todos}
         onDelete={(todo)=>{
          dispatch({
            type: "delete",
            payload:{
              id: todo.id
            }
          });
          // onDelete={(todo)=>{
          //   setTodos(todos.filter((t) => t.id !== todo.id));
          // }
        }}
        onChange={(newTodo) => {
          dispatch({
            type: "completed",
            payload:{
              id: newTodo.id
            }
          })

          // setTodos(todos.map((todo)=>{
          //   if(todo.id === newTodo.id){
          //     return newTodo;
          //   }
          //   return todo;
          // }))

        }}/>

        <TodoFooter todos={todos} onClearCompleted ={()=>{
          dispatch({
            type: "clearCompleted",
            payload:{
              id: todos.id
            }
          })

        //  setTodos(todos.filter((todo)=>!todo.completed))
        }} />
      </div>
    </div>
  )
}

export default App
