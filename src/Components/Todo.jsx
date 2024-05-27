import { useState } from 'react'
import './CSS/Todo.css'
import { useRef } from 'react';
import { useEffect } from 'react';
import TodoItems from './TodoItems';

let count= 0;

const Todo = () => {

    const [todos,setTodos]= useState([]);
    const inputRef= useRef(null);

    const add=()=>{
        //no, text, display are objects
        setTodos([...todos,{no:count++, text:inputRef.current.value, display:""}]);
        //used to clear the input field data
        inputRef.current.value= "";
        localStorage.setItem("todos_count",count);
    }

    //In this useEffect, when the web page is reloaded we will get the data from the local storage and store it in userstate var(setTodos)
    useEffect(()=>{
        setTodos(JSON.parse(localStorage.getItem("todos")));
        //string to json
        count= localStorage.getItem("todos_count");
    },[])

    //when the todos get updated the below function will be execute and print in console
    useEffect(()=>{
        setTimeout(()=>{
            console.log(todos);
            //To store the data in local storage, we convert into string
            localStorage.setItem("todos",JSON.stringify(todos));
        },100)
    },[todos])

  return (
    <div className='todo'>
        
        <div className='todo-header'>To-Do App</div>
        <div className='todo-add'>
            <input ref={inputRef} type='text' placeholder='Add Your Task' className='todo-input'/>
            <div onClick={()=>{add()}}className="todo-add-btn">ADD</div>
        </div>
        <div className="todo-list">
            {todos.map((item,index)=>{
                //Passing the probs
                return <TodoItems key={index} setTodos={setTodos} no={item.no} display={item.display} text={item.text}/>
            })}
        </div>
    </div>
  )
}

export default Todo