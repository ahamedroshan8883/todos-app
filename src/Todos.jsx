import { useState } from "react";
import {v4 as uuid4} from 'uuid';
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";

export default function Todos(){
    let [todosInput,setTodosInput] = useState('');
    let [todos,setTodos] = useState([]);
    let [edittodo,seteditTodos] = useState({});

    const handleSubmit = (e)=>{
        e.preventDefault();
        if(edittodo.id){
           const updatedTodos = todos.map(todos=>(todos.id==edittodo.id)?{...todos,title:todosInput}:todos)
           setTodos(updatedTodos);
           console.log(updatedTodos );
           seteditTodos({})
        }else{
        const addtodos = {
            id:uuid4(),
            title:todosInput,
            complete:false
        }
        todos.push(addtodos);
        setTodos(todos);
        console.log(todos)
        setTodosInput('')
    }}
    const deleteTodos = (id)=>{
        const UpdateTodos = todos.filter((todo)=>id!=todo.id)
        setTodos(UpdateTodos);
    }
    const updateTodos = (todo)=>{
        setTodosInput(todo.title);
        seteditTodos(todo);
    }
    const completedtask  = (updatetodo)=>{
        const updatedTodos = todos.map((todo)=>(updatetodo.id==todo.id)?{...todo,complete:!todo.complete}:todo)
        setTodos(updatedTodos);
        console.log(todos)
    }
    return(<>
    <form action="" onSubmit={(e)=>{handleSubmit(e)}}>
    <label>Enter the task</label>&nbsp;&nbsp;
    <input type="text" name="" id="" value={todosInput} onChange={(e)=>setTodosInput(e.target.value)}/>
    <button type="submit">Submit</button>
    </form>
    <ul style={{listStyle:"none"}}>
    {todos.map((todo)=>
        <li key={todo.id}>
        <input type="checkbox" onChange={()=>{completedtask(todo)}} name="" id="" />&nbsp;{todo.title}&nbsp;
        <button onClick={()=>{deleteTodos(todo.id)}}><FaRegTrashAlt/></button>&nbsp;
        <button onClick={()=>{updateTodos(todo)}}><FaRegEdit/></button>
        </li>
    )}
    </ul>
    </>)
}