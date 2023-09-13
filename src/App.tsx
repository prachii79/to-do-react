import React, { useState } from "react";
import { nanoid } from "nanoid";
import { ModalTask } from "./interfaces";
import CreateModal from "./components/CreateModal";
import EditModal from "./components/EditModal";
import NewTask from "./components/NewTask";
import { Accordion } from 'react-accessible-accordion';

export default function App() {

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() { setIsOpen(true) }
  function closeModal() { setIsOpen(false) }

  const [editModalIsOpen, setEditIsOpen] = React.useState(false);
  function openEditModal() { setEditIsOpen(true) }
  function closeEditModal() { setEditIsOpen(false) }

  const [date, setDate] = useState("");
  const [prior, setPrior] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  //const [done, setDone] = useState(false)
  const [tasks, setTasks] = useState(() => {
    const storedTask = JSON.parse(localStorage.getItem("data"));
    return storedTask || [];
  });
  
  const [editPrior, setEditPrior] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDetails, setEditDetails] = useState("");

  React.useEffect(() => {
    localStorage.setItem("data", JSON.stringify(tasks));
  }, [tasks]);

  function handleDone(id: string) {
    console.log("clicked")
    setTasks((prevTasks: ModalTask[]) => {
      return prevTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      );
    });
  }
  
  //const checked = done ? "/images/checked2.svg" : "/images/unchecked.svg"

  function handleCreateTasks() {
    setTasks((prevTasks: ModalTask[]) => {
      const task: ModalTask = {
        id: nanoid(),
        date: date,
        prior: prior,
        title:title,
        details:details,
        done:false
      };
      return [...prevTasks, task];
    });
    setPrior("");
    setTitle("");
    setDetails("");

    if((prior || title || details) === null ){
      alert("fill the necessary fields")
    } else{
      closeModal();
    }
  }

  function deleteTask(id: string, e) {
    e.stopPropagation()
    setTasks((prevTasks: ModalTask[]) => {
      return prevTasks.filter((task) => task.id != id);
    });
    localStorage.setItem("data", JSON.stringify(tasks));
  }

  function handleEdit(id: string) {
    setTasks((prevTasks: ModalTask[]) => {
      return prevTasks.map((task) =>
        task.id === id ? { ...task, prior: editPrior, title: editTitle, details: editDetails } : task
      );
    });
    setEditPrior("");
    setEditTitle("");
    setEditDetails("");
    closeEditModal();
  }  

  function editTask(id: string, e){
    e.stopPropagation()
    setEditIsOpen(true)
    const editable = tasks.find((taask: ModalTask) => taask.id === id)

    if (editable) {
      setEditPrior(editable.prior);
      setEditTitle(editable.title);
      setEditDetails(editable.details);
    }  
  }

  const taskToEdit = tasks.find((task: ModalTask) => task.title === editTitle)

  const modalTasks = tasks.map((taask: ModalTask) => {
    return(
      <NewTask 
        key = {taask.id}
        id = {taask.id}
        priority={taask.prior}
        tit={taask.title}
        det={taask.details}
        delet={deleteTask}
        edit={editTask}
        date={taask.date}
        done={taask.done}
        handle={handleDone}
      />
    )
  })  

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  let yyyy = today.getFullYear();
  let d = today.getDay()
  const months = ["January", "February", "March", "April","May", "June", "July", "August", "September", "October", "November", "December"]
  const month = months[parseInt(mm) - 1]
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]
  const day = days[parseInt(d) - 1]
  return (
    <div className="w-5/12 border-2 rounded-md flex flex-col items-center justify-center mx-auto p-3">
      <header className="flex justify-between w-full h-22 border-b-2 border-dotted pb-2">
        <div className="flex items-center">
          <div className="text-4xl font-bold">{dd}</div>
          <div className="ml-2">
            <p className="text-md font-semibold">{month} {yyyy}</p>
            <p className="text-sm">{day}</p>
          </div>
        </div>

        <div className="flex items-center">
          <img src="./images/create.svg" alt="" className="h-9 w-9"  onClick={openModal}/>
          <p className="font-bold text-xs">CREATE TASK</p>
        </div>
      </header>

      <CreateModal 
        open={modalIsOpen}
        setOpen={setIsOpen}
        onOpen={openModal}
        onClose={closeModal}
        prior={prior}
        onPrior={e=>{setPrior(e.target.value)}}
        title={title}
        details={details}
        onTitle={e=>{setTitle(e.target.value)}}
        onDetail={e => {setDetails(e.target.value)}}
        onDate={e => {setDate(e.target.value)}}
        onCreateTasks={handleCreateTasks}
      />

      {editModalIsOpen && 
          <EditModal 
          open={editModalIsOpen}
          setOpen={setEditIsOpen}
          onOpen={openEditModal}
          onClose={closeEditModal}
          prior={editPrior}
          onPrior={e => {setEditPrior(e.target.value)}}
          title={editTitle}
          details={editDetails}
          onTitle={e => {setEditTitle(e.target.value)}}
          onDetail={e => {setEditDetails(e.target.value)}}
          onEditTask={() => handleEdit(taskToEdit.id)}
      />}
           
      <Accordion allowZeroExpanded>
        {modalTasks}
      </Accordion>

    </div>
  );
}
