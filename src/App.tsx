import React, { ChangeEvent, useState } from "react";
import { nanoid } from "nanoid";
import Task from "./components/Task";
import TaskInt from "./interfaces";
import Create from "./components/Create";

export default function App() {
  const [value, setValue] = useState("");
  const [tasks, setTasks] = useState<TaskInt[]>(() => {
    const storedTask = JSON.parse(localStorage.getItem("data"));
    return storedTask || [];
  });
  const [showAll, setShowAll] = useState(true);
  const [showImp, setShowImp] = useState(false);
  const [showCompleted, setShowCompleted] = useState(false);
  const [showActive, setShowActive] = useState(false);

  React.useEffect(() => {
    localStorage.setItem("data", JSON.stringify(tasks));
  }, [tasks]);

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  function handleCreate() {
    setTasks((prevTasks) => {
      const task: TaskInt = {
        id: nanoid(),
        val: value,
        isDone: false,
        isDeleted: false,
        isImp: false,
      };
      return [...prevTasks, task];
    });
    setValue("");
  }

  function toggle(id: string) {
    setTasks((prevTasks) => {
      const newTasks: TaskInt[] = [];
      for (let i = 0; i < prevTasks.length; i++) {
        const currentTask = prevTasks[i];
        if (currentTask.id === id) {
          const updatedTask = {
            ...currentTask,
            isDone: !currentTask.isDone,
          };
          newTasks.push(updatedTask);
        } else {
          newTasks.push(currentTask);
        }
      }
      return newTasks;
    });
  }

  // function toggle(id: string) {
  //   setTasks((prevTasks) => {
  //     return prevTasks.map((currentTask) => {
  //       if (currentTask.id === id) {
  //         return {
  //           ...currentTask,
  //           isDone: !currentTask.isDone,
  //         };
  //       }
  //       return currentTask;
  //     });
  //   });
  // }
  
  // function togggle(id:string){
  //   setTasks(prevTasks => {
  //     return prevTasks.filter(task => task.id === id).map(currentTask => {
        
  //     })
  //   })
  // }

  function deleteTask(id: string) {
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id != id);
    });
    localStorage.setItem("data", JSON.stringify(tasks));
  }

  function markImp(id: string) {
    setTasks((prevTasks) => {
      const newTasks: TaskInt[] = [];
      for (let i = 0; i < prevTasks.length; i++) {
        const currentTask = prevTasks[i];
        if (currentTask.id === id) {
          const updatedTask = {
            ...currentTask,
            isImp: !currentTask.isImp,
          };
          newTasks.push(updatedTask);
        } else {
          newTasks.push(currentTask);
        }
      }
      return newTasks;
    });
  }

  const allTasks = tasks.map((taask: TaskInt) => {
    return (
      <Task
      key = {taask.id}
        toggle={toggle}
        markImp={markImp}
        deleteTask={deleteTask}
        val={taask.val}
        id={taask.id}
        done={taask.isDone}
        imp={taask.isImp}
      />
    );
  });

  const filteredTasks = tasks.filter((taask: TaskInt) => {
    if ((showImp && !taask.isImp) || (showCompleted && !taask.isDone) || (showActive && taask.isDone)) {
      return false;
    }
    return true;
  }).map((taask: TaskInt)=> (
    <Task
      key = {taask.id}
      toggle={toggle}
      markImp={markImp}
      deleteTask={deleteTask}
      val={taask.val}
      id={taask.id}
      done={taask.isDone}
      imp={taask.isImp}
    />
  ));

  function bgcolor(param: boolean){
    const styles = {
      backgroundColor : param ?  "purple" : "white"
    }
    return styles
  }

  React.useEffect(()=>{
    if(showImp || showActive || showCompleted){
      setShowAll(false)
      if(showActive && showCompleted){
        setShowActive(false)
        setShowCompleted(false)
        alert("active and completed tasks are merged in all tasks")
      }
    } 
    else if(showAll){
      setShowImp(false)
      setShowActive(false)
      setShowCompleted(false)
    }
    else{
      setShowAll(true)
      setShowImp(false)
      setShowActive(false)
      setShowCompleted(false)}
  }, [showImp, showActive, showCompleted, showAll])
    
  function handleShowAllClick() {
    setShowAll(true);
    setShowImp(false);
    setShowActive(false);
    setShowCompleted(false);
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Create
        onCreate={handleCreate}
        inVal={value}
        handleInput={handleInputChange}
      />

      <button style={bgcolor(showAll)} onClick={handleShowAllClick}>show all</button>
      <button style={bgcolor(showImp)} onClick={() => setShowImp(prevState => !prevState)}>show imp</button>
      <button style={bgcolor(showCompleted)} onClick={() => setShowCompleted(prevState => !prevState)}>show completed</button>
      <button style={bgcolor(showActive)} onClick={() => setShowActive(prevState => !prevState)}>show active</button>

      <div id="show"  className="mt-10">
        {(filteredTasks.length > 0 && (showImp || showActive || showCompleted) ) ? filteredTasks : allTasks}
      </div>
    </div>
  );
}
