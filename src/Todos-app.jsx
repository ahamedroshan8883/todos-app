import { useState } from "react";
import {v4 as uuid4} from 'uuid';
import { FaRegTrashCan } from "react-icons/fa6";
import { MdEdit } from "react-icons/md";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
function Todos(){
    let [todos,setTodos] = useState([]);
    let [todosInput,setTodosInput] = useState('');
    let [editTodo,setEditTodo] = useState({});

    const handleform = (e)=>{
        e.preventDefault();
        if(editTodo.id){
            const updateTodos =  todos.map((todos)=>(todos.id===editTodo.id)?{...todos,title:todosInput}:todos)
            setTodos(updateTodos);
            console.log(updateTodos);
            setEditTodo({})
        }else{
            alert('added')
        const addtodos = {
            id:uuid4(),
            title:todosInput,
            complete:false
        }
        todos.push(addtodos);
        setTodos(todos)
        console.log(todos);
        setTodosInput('')
    }}

    const deletetask = (id)=>{
        const updatetodos = todos.filter((todo)=>todo.id!==id);
        setTodos(updatetodos);
    }

    const updateTodos = (todos)=>{
        setTodosInput(todos.title);
        setEditTodo(todos);
    }

    const completetask = (updateTodos)=>{
        const updatedTodos = todos.map((todo)=>(todo.id === updateTodos.id)?{...todo,completed:!todo.completed}:todo);
        setTodos(updatedTodos)
    }
    return(<>
    <div style={{display:"flex",margin:"150px auto 0px",flexDirection:"column",width:"350px"}}>

        <form action="" onSubmit={handleform}>
        <label htmlFor="">Enter a task</label>&nbsp;
        <input type="text" name="" id="" value={todosInput} onChange={(e)=>setTodosInput(e.target.value)} />
        </form>

        {todos.length < 1 ? ("You have no task to complete") : (<b>You have {todos.length} task to complete</b>)}

        <ul style={{listStyle:"none"}}>

        {todos.map((todos,index)=>
        <li key={index+1}>
            <input type="checkbox" name="" id="check" onChange={()=>completetask(todos)}/>{todos.title}&nbsp;
            <Button onClick={()=>deletetask(todos.id) } variant="outline-danger"><FaRegTrashCan/></Button>&nbsp;
            <Button onClick={()=>updateTodos(todos)} variant="outline-info"><MdEdit /></Button>
        </li>)}&nbsp;

        </ul> 
    </div>
    </>)
}
export default Todos;