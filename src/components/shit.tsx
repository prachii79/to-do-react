// import React, { ChangeEvent, useState } from "react";
// import { nanoid } from "nanoid";
// import Task from "./components/Task";
// import {TaskInt} from "./interfaces";
// import { ModalTask } from "./interfaces";
// import Create from "./components/Create";
// import CreateModal from "./components/CreateModal";
// import EditModal from "./components/EditModal";
// import NewTask from "./components/NewTask";
// import {
//   Accordion,
//   AccordionItem,
//   AccordionItemHeading,
//   AccordionItemButton,
//   AccordionItemPanel,
// } from 'react-accessible-accordion';

// export default function App() {

//   const [modalIsOpen, setIsOpen] = React.useState(false);

//   function openModal() {
//     setIsOpen(true);
//   }

//   function closeModal() {
//     setIsOpen(false);
//   }

//   const [editModalIsOpen, setEditIsOpen] = React.useState(false);

//   function openEditModal() {
//     setIsOpen(true);
//   }

//   function closeEditModal() {
//     setIsOpen(false);
//   }

//   const [label, setLabel] = useState("");
//   const [title, setTitle] = useState("");
//   const [details, setDetails] = useState("");
//   const [value, setValue] = useState("");
//   const [tasks, setTasks] = useState(() => {
//     const storedTask = JSON.parse(localStorage.getItem("data"));
//     return storedTask || [];
//   });
//   // const [tasks, setTasks] = useState([]);
//   const [showAll, setShowAll] = useState(true);
//   const [showImp, setShowImp] = useState(false);
//   const [showCompleted, setShowCompleted] = useState(false);
//   const [showActive, setShowActive] = useState(false);

//   React.useEffect(() => {
//     localStorage.setItem("data", JSON.stringify(tasks));
//   }, [tasks]);

//   function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
//     setValue(e.target.value);
//   }

//   function handleLabel(e: ChangeEvent<HTMLInputElement>) {
//     setLabel(e.target.value);
//   }

//   function handleTitle(e: ChangeEvent<HTMLInputElement>) {
//     setTitle(e.target.value);
//   }

//   function handleDetail(e: ChangeEvent<HTMLInputElement>) {
//     setDetails(e.target.value);
//   }

//   // function handleCreate() {
//   //   setTasks((prevTasks) => {
//   //     const task: TaskInt = {
//   //       id: nanoid(),
//   //       val: value,
//   //       isDone: false,
//   //       isDeleted: false,
//   //       isImp: false,
//   //     };
//   //     return [...prevTasks, task];
//   //   });
//   //   setValue("");
//   // }

//   // function toggle(id: string) {
//   //   setTasks((prevTasks) => {
//   //     return prevTasks.map((currentTask) => {
//   //       if (currentTask.id === id) {
//   //         return {
//   //           ...currentTask,
//   //           isDone: !currentTask.isDone,
//   //         };
//   //       }
//   //       return currentTask;
//   //     });
//   //   });
//   // }

//   // function deleteTask(id: string) {
//   //   setTasks((prevTasks) => {
//   //     return prevTasks.filter((task) => task.id != id);
//   //   });
//   //   localStorage.setItem("data", JSON.stringify(tasks));
//   // }

//   // function markImp(id: string) {
//   //   setTasks((prevTasks) => {
//   //     const newTasks: TaskInt[] = [];
//   //     for (let i = 0; i < prevTasks.length; i++) {
//   //       const currentTask = prevTasks[i];
//   //       if (currentTask.id === id) {
//   //         const updatedTask = {
//   //           ...currentTask,
//   //           isImp: !currentTask.isImp,
//   //         };
//   //         newTasks.push(updatedTask);
//   //       } else {
//   //         newTasks.push(currentTask);
//   //       }
//   //     }
//   //     return newTasks;
//   //   });
//   // }

//   // const allTasks = tasks.map((taask: TaskInt) => {
//   //   return (
//   //     <Task
//   //     key = {taask.id}
//   //       toggle={toggle}
//   //       markImp={markImp}
//   //       deleteTask={deleteTask}
//   //       val={taask.val}
//   //       id={taask.id}
//   //       done={taask.isDone}
//   //       imp={taask.isImp}
//   //     />
//   //   );
//   // });

//   // const filteredTasks = tasks.filter((taask: TaskInt) => {
//   //   if ((showImp && !taask.isImp) || (showCompleted && !taask.isDone) || (showActive && taask.isDone)) {
//   //     return false;
//   //   }
//   //   return true;
//   // }).map((taask: TaskInt)=> (
//   //   <Task
//   //     key = {taask.id}
//   //     toggle={toggle}
//   //     markImp={markImp}
//   //     deleteTask={deleteTask}
//   //     val={taask.val}
//   //     id={taask.id}
//   //     done={taask.isDone}
//   //     imp={taask.isImp}
//   //   />
//   // ));

//   // function bgcolor(param: boolean){
//   //   const styles = {
//   //     backgroundColor : param ?  "purple" : "white"
//   //   }
//   //   return styles
//   // }

//   // React.useEffect(()=>{
//   //   if(showImp || showActive || showCompleted){
//   //     setShowAll(false)
//   //     if(showActive && showCompleted){
//   //       setShowActive(false)
//   //       setShowCompleted(false)
//   //       alert("active and completed tasks are merged in all tasks")
//   //     }
//   //   }
//   //   else if(showAll){
//   //     setShowImp(false)
//   //     setShowActive(false)
//   //     setShowCompleted(false)
//   //   }
//   //   else{
//   //     setShowAll(true)
//   //     setShowImp(false)
//   //     setShowActive(false)
//   //     setShowCompleted(false)}
//   // }, [showImp, showActive, showCompleted, showAll])

//   // function handleShowAllClick() {
//   //   setShowAll(true);
//   //   setShowImp(false);
//   //   setShowActive(false);
//   //   setShowCompleted(false);
//   // }

//   function handleCreateTasks() {
//     setTasks((prevTasks) => {
//       const task: ModalTask = {
//         id: nanoid(),
//         label: label,
//         title:title,
//         details:details,
//       };
//       return [...prevTasks, task];
//     });
//     setLabel("");
//     setTitle("");
//     setDetails("");

//     if((label || title || details) === null ){
//       alert("fill the necessary fields")
//     } else{
//       closeModal();
//     }
//   }

//   function deleteTask(id: string, e) {
//     e.stopPropagation()
//     setTasks((prevTasks) => {
//       return prevTasks.filter((task) => task.id != id);
//     });
//     localStorage.setItem("data", JSON.stringify(tasks));
//   }

//   function handleEdit(id: string){
//     const idToRemove = id;
//     const newIndex = id;

//     const indexToRemove = tasks.findIndex(taask => taask.id === idToRemove);

//     // if (indexToRemove !== -1) {
//     //   // Remove the object at the specified index and insert a new object
//     //   arrayOfObjects.splice(indexToRemove, 1, { id: 5, name: 'New Object' });
//     // }
//     setTasks(prevTasks => {
//       const editedTask = {
//         id: id,
//         label: label,
//         title:title,
//         details:details,
//       }
//       return(prevTasks.splice(indexToRemove, 1, editedTask))
//     })
//     setLabel("");
//     setTitle("");
//     setDetails("");
//     closeEditModal();
//   }

//   function editTask(id: string, e){
//     e.stopPropagation()
//     const editable = tasks.filter(taask => taask.id === id)
//     openEditModal()

//     return(
//       <EditModal
//         open={editModalIsOpen}
//         setOpen={setEditIsOpen}
//         onOpen={openEditModal}
//         onClose={closeEditModal}
//         label={editable.label}
//         onLabel={handleLabel}
//         title={editable.title}
//         onTitle={handleTitle}
//         details={editable.details}
//         onDetail={handleDetail}
//         onEditDone={() => handleEdit(id)}
//     />
//     )
//   }

//   const modalTasks = tasks.map((taask: ModalTask) => {
//     return(
//       <NewTask
//         key = {taask.id}
//         id = {taask.id}
//         labl={taask.label}
//         tit={taask.title}
//         det={taask.details}
//         delet={deleteTask}
//         edit={editTask}
//       />
//     )
//   })

//   return (
//     <div className="w-5/12 border-2 rounded-md flex flex-col items-center justify-center mx-auto p-3">
//       <header className="flex justify-between w-full h-22 border-b-2 border-dotted pb-2">
//         <div className="flex items-center">
//           <div className="text-4xl font-bold">25</div>
//           <div className="ml-2 text-sm">
//             <p>Tuesday</p>
//             <p>Dec 2018</p>
//           </div>
//         </div>

//         <div className="flex items-center">
//           <img src="./images/create.svg" alt="" className="h-9 w-9"  onClick={openModal}/>
//           <p className="font-bold text-xs">CREATE TASK</p>
//         </div>
//       </header>

//       {/* <Create
//         onCreate={handleCreate}
//         inVal={value}
//         handleInput={handleInputChange}
//       /> */}

//       {/* <button style={bgcolor(showAll)} onClick={handleShowAllClick}>show all</button>
//       <button style={bgcolor(showImp)} onClick={() => setShowImp(prevState => !prevState)}>show imp</button>
//       <button style={bgcolor(showCompleted)} onClick={() => setShowCompleted(prevState => !prevState)}>show completed</button>
//       <button style={bgcolor(showActive)} onClick={() => setShowActive(prevState => !prevState)}>show active</button> */}

//       {/* <div id="show"  className="mt-10">
//         {(filteredTasks.length > 0 && (showImp || showActive || showCompleted) ) ? filteredTasks : allTasks}
//       </div> */}

//       <CreateModal
//         open={modalIsOpen}
//         setOpen={setIsOpen}
//         onOpen={openModal}
//         onClose={closeModal}
//         label={label}
//         onLabel={handleLabel}
//         title={title}
//         onTitle={handleTitle}
//         details={details}
//         onDetail={handleDetail}
//         onCreateTasks={handleCreateTasks}
//       />

//       <Accordion allowZeroExpanded>
//         {modalTasks}
//         </Accordion>

//       </div>
//   );
// }
