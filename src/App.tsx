import React, { useState } from "react";
import { nanoid } from "nanoid";
import { ModalTask } from "./interfaces";
import CreateModal from "./components/CreateModal";
import EditModal from "./components/EditModal";
import Task from "./components/Task";
import { Accordion } from "react-accessible-accordion";

export default function App() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }
  function closeModal() {
    setIsOpen(false);
  }

  const [editModalIsOpen, setEditIsOpen] = React.useState(false);
  function openEditModal() {
    setEditIsOpen(true);
  }
  function closeEditModal() {
    setEditIsOpen(false);
  }

  const [date, setDate] = useState("");
  const [prior, setPrior] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [tasks, setTasks] = useState(() => {
    const storedTaskJSON = localStorage.getItem("data");
    const storedTask = storedTaskJSON ? JSON.parse(storedTaskJSON) : [];
    return storedTask || [];
  });

  const [editPrior, setEditPrior] = useState("");
  const [editTitle, setEditTitle] = useState("");
  const [editDetails, setEditDetails] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editID, setID] = useState("");

  React.useEffect(() => {
    localStorage.setItem("data", JSON.stringify(tasks));
  }, [tasks]);

  function handleDone(id: string) {
    setTasks((prevTasks: ModalTask[]) => {
      return prevTasks.map((task) => {
        if (task.id === id) {
          return { ...task, done: !task.done };
        }
        return task;
      });
    });
  }

  function handleCreateTasks() {
    if (!prior || !title || !details || !date) {
      alert("Please fill in all the necessary fields.");
      return;
    }

    setTasks((prevTasks: ModalTask[]) => {
      const task: ModalTask = {
        id: nanoid(),
        date: date,
        prior: prior,
        title: title,
        details: details,
        done: false,
      };
      return [...prevTasks, task];
    });
    setPrior("");
    setTitle("");
    setDetails("");

    closeModal();
  }

  function deleteTask(id: string, e:any) {
    e.stopPropagation();
    setTasks((prevTasks: ModalTask[]) => {
      return prevTasks.filter((task) => task.id != id);
    });
    localStorage.setItem("data", JSON.stringify(tasks));
  }

  function handleEdit(id: string) {
    setTasks((prevTasks: ModalTask[]) => {
      return prevTasks.map((task) =>
        task.id === id
          ? {
              ...task,
              prior: editPrior,
              title: editTitle,
              details: editDetails,
              date: editDate,
              id: editID,
            }
          : task
      );
    });
    setEditPrior("");
    setEditTitle("");
    setEditDetails("");
    closeEditModal();
  }

  function editTask(id: string, e:any) {
    e.stopPropagation();
    setEditIsOpen(true);
    const editable = tasks.find((taask: ModalTask) => taask.id === id);

    if (editable) {
      setEditPrior(editable.prior);
      setEditTitle(editable.title);
      setEditDetails(editable.details);
      setEditDate(editable.date);
      setID(editable.id);
    }
  }

  const taskToEdit = tasks.find((task: ModalTask) => task.id === editID);

  const modalTasks = tasks.map((taask: ModalTask) => {
    return (
      <Task
        key={taask.id}
        id={taask.id}
        priority={taask.prior}
        tit={taask.title}
        det={taask.details}
        delet={deleteTask}
        edit={editTask}
        date={taask.date}
        done={taask.done}
        handle={handleDone}
      />
    );
  });

  let today = new Date();
  let dd = String(today.getDate()).padStart(2, "0");
  let mm = String(today.getMonth() + 1).padStart(2, "0");
  let yyyy = today.getFullYear();
  let d = today.getDay();
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[parseInt(mm) - 1];
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];
  const day = days[d - 1];
  return (
    <div className="flex justify-center mx-2 sm:mx-16 md:mx-20 lg:mx-44 xl:mx-60">
      <div className="w-full border-2 rounded-md flex flex-col items-center justify-center mt-10 p-3 sm:p-4 md:p-6">
        <header className="flex justify-between w-full h-22 border-b-2 border-slate-500 pb-2">
          <div className="flex items-center">
            <div className="text-xl font-bold sm:text-3xl md:text-4xl lg:text-5xl">
              {dd}
            </div>
            <div className="ml-1">
              <p className="text-xs font-medium sm:text-sm sm:font-semibold md:text-md lg:text-lg">
                {month} {yyyy}
              </p>
              <p className="text-xs sm:text-sm md:text-md lg:text-lg">{day}</p>
            </div>
          </div>

          <div className="flex items-center">
            <img
              src="./images/create.svg"
              alt=""
              className="h-5 w-5 sm:h-8 sm:w-8"
              onClick={openModal}
            />
            <p className="font-semibold text-xs ml-1 sm:font-bold sm:text-sm">
              CREATE TASK
            </p>
          </div>
        </header>

        <CreateModal
          open={modalIsOpen}
          setOpen={setIsOpen}
          onOpen={openModal}
          onClose={closeModal}
          prior={prior}
          handlePrior={(e: any) => {
            setPrior(e.target.value);
          }}
          date={date}
          title={title}
          details={details}
          handleTitle={(e: any) => {
            setTitle(e.target.value);
          }}
          handleDetail={(e: any) => {
            setDetails(e.target.value);
          }}
          handleDate={(e: any) => {
            setDate(e.target.value);
          }}
          onCreateTasks={handleCreateTasks}
        />

        {editModalIsOpen && (
          <EditModal
            id={taskToEdit.id}
            open={editModalIsOpen}
            setOpen={setEditIsOpen}
            onOpen={openEditModal}
            onClose={closeEditModal}
            prior={editPrior}
            handlePrior={(e: any) => {
              setEditPrior(e.target.value);
            }}
            title={editTitle}
            details={editDetails}
            date={editDate}
            handleTitle={(e: any) => {
              setEditTitle(e.target.value);
            }}
            handleDetail={(e: any) => {
              setEditDetails(e.target.value);
            }}
            handleDate={(e: any) => {
              setEditDate(e.target.value);
            }}
            onEditDone={handleEdit}
          />
        )}

        <div className="w-full mt-5">
          <Accordion allowZeroExpanded>{modalTasks}</Accordion>
        </div>
      </div>
    </div>
  );
}
