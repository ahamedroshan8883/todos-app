import React, { useReducer, useState } from "react"
import {v4 as uuid4} from 'uuid';
import Button from 'react-bootstrap/Button';
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

export default function Tododemo(){
    let[todoInput,setTodoinput] = useState(""); 
    let[todos,setTodos] = useState([]);
    let [edittodo,setEdittodo] = useState({});
    // const reducer = (state,action)=>{
    //     switch(action.type){
    //         case "Complete":
    //             return state.map((todo) => {
    //                 if (todo.id === action.id) {
    //                   return { ...todo, complete: !todo.complete };
    //                 } else {
    //                   return todo;
    //                 }
    //             })
    //         default:
    //             return state;
    //     }
    // }
    // let [state,dispatch] = useReducer(reducer,todos)
    const completeTodo =(id)=>{
       const completedTodo =  todos.map(todo=>(todo.id==id)?{...todo,complete:!todo.complete}:todo);
       setTodos(completedTodo);
    } 
    const handleform = (e)=>{
        e.preventDefault();
        if(edittodo.id){
            const updatedtodo = todos.map(todos=>(todos.id===edittodo.id)?{...todos,title:todoInput}:todos)
            setTodos(updatedtodo);
            setEdittodo({})
        }else{
        const addTodos = {
            id:uuid4(),
            title:todoInput,
            complete:false
        }
        todos.push(addTodos);
        setTodos(todos);
        console.log(todos)
        setTodoinput('');
    }}
    const deleteTodo = (id)=>{
        const updatedtodo = todos.filter(todo=>id!=todo.id);
        setTodos(updatedtodo)
    }
    const editTodo = (todo)=>{
        setTodoinput(todo.title);
        setEdittodo(todo);
    }
  return (<>
    <h1>Todo-demo</h1>
    <form action="" onSubmit={(e)=>handleform(e)}>
        <label htmlFor="task">Enter the Task</label>&nbsp;&nbsp;
        <input name="task" type="text" value={todoInput} onChange={(e)=>setTodoinput(e.target.value)}/>
        <input type="submit" value="Enter"/>
    </form>
    <ul>
    {todos.length>0?todos.map((todo,index)=>
        <li style={{display:"flex",flexDirection:"row"}} key={index+1}>
            <input type="checkbox" name="taskComplete" checked={todo.complete} onChange={()=>completeTodo(todo.id)}/>
            {todo.title}&nbsp;
            <Button variant="secondary" onClick={()=>editTodo(todo)}><FaEdit /></Button>
            <Button variant="secondary" onClick={()=>deleteTodo(todo.id)}><FaTrash /></Button>
        </li>
        ):'NO TASK FOUND'}
    </ul>
  </>)
};