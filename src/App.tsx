import React, { ChangeEvent, useState } from "react";
import { nanoid } from "nanoid";
import { ModalTask } from "./interfaces";
import CreateModal from "./components/CreateModal";
import EditModal from "./components/EditModal";
import NewTask from "./components/NewTask";
import {
  Accordion
} from 'react-accessible-accordion';

export default function App() {

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() { setIsOpen(true) }
  function closeModal() { setIsOpen(false) }

  const [editModalIsOpen, setEditIsOpen] = React.useState(false);
  function openEditModal() { setEditIsOpen(true) }
  function closeEditModal() { setEditIsOpen(false) }

  const [label, setLabel] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [tasks, setTasks] = useState(() => {
    const storedTask = JSON.parse(localStorage.getItem("data"));
    return storedTask || [];
  });

  
  const [editLabel, setEditLabel] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDetails, setEditDetails] = useState("");

  React.useEffect(() => {
    localStorage.setItem("data", JSON.stringify(tasks));
  }, [tasks]);

  function handleLabel(e: ChangeEvent<HTMLInputElement>) {
    setLabel(e.target.value);
  }
  function handleTitle(e: ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value);
  }
  function handleDetail(e: ChangeEvent<HTMLInputElement>) {
    setDetails(e.target.value);
  }

  function handleEditLabel(e: ChangeEvent<HTMLInputElement>) {
    setEditLabel(e.target.value);
  }
  function handleEditTitle(e: ChangeEvent<HTMLInputElement>) {
    setEditTitle(e.target.value);
  }
  function handleEditDetail(e: ChangeEvent<HTMLInputElement>) {
    setEditDetails(e.target.value);
  }

  function handleCreateTasks() {
    setTasks((prevTasks) => {
      const task: ModalTask = {
        id: nanoid(),
        label: label,
        title:title,
        details:details,
      };
      return [...prevTasks, task];
    });
    setLabel("");
    setTitle("");
    setDetails("");

    if((label || title || details) === null ){
      alert("fill the necessary fields")
    } else{
      closeModal();
    }
  }

  function deleteTask(id: string, e) {
    e.stopPropagation()
    setTasks((prevTasks) => {
      return prevTasks.filter((task) => task.id != id);
    });
    localStorage.setItem("data", JSON.stringify(tasks));
  }

  // function handleEdit(id: string){
  //   const idToRemove = id;    
  //   const indexToRemove = tasks.findIndex(taask => taask.id === idToRemove);
    

  //   setTasks(prevTasks => {
  //     const editedTask = {
  //       id: id,
  //       label: editLabel,
  //       title: editTitle,
  //       details: editDetails,
  //     }
  //     return(prevTasks.splice(indexToRemove, 1, editedTask))
  //   })

  //   setEditLabel("");
  //   setEditTitle("");
  //   setEditDetails("");
  //   closeEditModal();
  // } 

  function handleEdit(id: string) {
    const indexToEdit = tasks.findIndex(task => task.id === id);
    const editedTask = {
      id: id,
      label: editLabel,
      title: editTitle,
      details: editDetails,
    };
    
    const updatedTasks = [...tasks];
    updatedTasks.splice(indexToEdit, 1, editedTask);
    
    setTasks(updatedTasks);

    setEditLabel("");
    setEditTitle("");
    setEditDetails("");
    closeEditModal();
  }  

  function editTask(id: string, e){
    e.stopPropagation()
    setEditIsOpen(true)
    // openEditModal()
    const editable = tasks.find(taask => taask.id === id)

    var idToEdit = editable.id

    if (editable) {
      setEditLabel(editable.label);
      setEditTitle(editable.title);
      setEditDetails(editable.details);
    }  
    console.log("edit")
  }

  const taskToEdit = tasks.find(task => task.title === editTitle)

  {editModalIsOpen && 
    <EditModal 
    open={editModalIsOpen}
    setOpen={setEditIsOpen}
    onOpen={openEditModal}
    onClose={closeEditModal}
    label={editLabel}
    onLabel={handleEditLabel}
    title={editTitle}
    onTitle={handleEditTitle}
    details={editDetails}
    onDetail={handleEditDetail}
    onEditTask={() => handleEdit(taskToEdit.id)}
/>}

  const modalTasks = tasks.map((taask: ModalTask) => {
    return(
      <NewTask 
        key = {taask.id}
        id = {taask.id}
        labl={taask.label}
        tit={taask.title}
        det={taask.details}
        delet={deleteTask}
        edit={editTask}
      />
    )
  })  


  return (
    <div className="w-5/12 border-2 rounded-md flex flex-col items-center justify-center mx-auto p-3">
      <header className="flex justify-between w-full h-22 border-b-2 border-dotted pb-2">
        <div className="flex items-center">
          <div className="text-4xl font-bold">25</div>
          <div className="ml-2 text-sm">
            <p>Tuesday</p>
            <p>Dec 2018</p>
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
        label={editLabel}
        onLabel={handleLabel}
        title={editTitle}
        onTitle={handleTitle}
        details={editDetails}
        onDetail={handleDetail}
        onCreateTasks={handleCreateTasks}
      />
           
      <Accordion allowZeroExpanded>
        {modalTasks}
        </Accordion>

      </div>
  );
}
