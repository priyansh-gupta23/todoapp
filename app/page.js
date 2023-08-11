'use client'
import React from 'react'
import { useState } from "react"
import "bootstrap/dist/css/bootstrap.min.css"
import { toast } from 'react-toastify'

const page = () => {
const [title, settitle] = useState("")
const [description, setdesc] = useState("")
const [status, setstatus] = useState("Due")

const [tasks, settasks] = useState([])
const [activeTask, setActiveTask] = useState(null)

const submitHandler = (e) =>{
  e.preventDefault();
  //Validation
  if(title.length < 4 || description<20){
    toast.error(
      "Title and description must be Grater than 4 and 20 Character respectively"
    );
    return;
  }
  
  const newTask={
    title,
    description,
    status,
    date:new Date().toLocaleDateString()
  }
  console.log(newTask);
  settasks([...tasks, newTask]);
  settitle("");
  setdesc("");
  setstatus("Due");
 }

 const UpdateHandler = (index) => {
  const { title, description, status } = tasks[index];
  settitle(title);
  setdesc(description);
  setstatus(status);
  setActiveTask(index);
};

 const updateTask = (e) =>{
  e.preventDefault();
  const copyTask = [...tasks];
  copyTask[activeTask]={
    ...copyTask[activeTask],
    title,
    description,
    status,
  };
  settasks(copyTask);
  setActiveTask(null);
  settitle("");
  setstatus("Due");
  setdesc("");
 }
 
 const deletehandler = (index) =>{
  settasks(tasks.filter((t,i) => i!==index));
 }

 let taskList = (<h1>Loading.....</h1>);
 if(tasks.length>0){
  taskList = tasks.map((task, index) =>{
    return(
      <>
      {/* <h2>Pending Tasks</h2>  */}
            <div  key={index} className=" d-flex">
                <div className="card  mb-3 me-3" style={{ width: "18rem"}}>
                    <div className="card-body">
                        <h5 className="card-title">{task.title}</h5>
                        <h6 className="card-subtitle mb-2 text-body-secondary">
                            {task.status}
                        </h6>
                        <p className="card-text">
                            {task.description}
                        </p> 
                        <button 
                           onClick={() => UpdateHandler(index)}
                          className="me-2 btn btn-sm btn-primary">
                            Update Task
                        </button>
                        <button onClick={() => deletehandler(index)} className="btn btn-sm btn-primary">
                            Delete Task
                        </button>
                    </div>
                </div>
            </div>
      </>
      
    )
  })
 }
  return (
    <>
    <div className='mt-5 container p-5'>
    <form className='w-50 p-5'  >
    <h2>Create Your Task</h2>
      <input 
      className='form-control mb-3'
      type="text"
      placeholder='Title'
      onChange={(e)=> settitle(e.target.value)}
      value={title}/>

      <textarea 
      className='form-control mb-3'
      placeholder="Description here......"
      onChange={(e)=> setdesc(e.target.value)}
      value={description}>
      </textarea>

      <select className='form-control mb-3'onChange={(e)=>setstatus(e.target.value)}>
          <option value="Due">Due</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        {activeTask === null?(
          <button
          onClick={ submitHandler}
          className='btn btn-primary'>Create Task</button>
        ):(
          <button 
         onClick={updateTask}
         className='btn btn-primary'>Update Task</button>
        )}

        
    </form>

    <hr/>
    
           <div className='d-flex flex-wrap'>{taskList}</div> 
    </div>
    </>
  )
}

export default page;