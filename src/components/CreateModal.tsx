import Modal from "react-modal";

Modal.setAppElement("#root");

export default function CreateModal(props) {
  return (
    <Modal
      isOpen={props.open}
      onRequestClose={props.onClose}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ease-in-out duration-300 w-60 sm:w-96 p-2 h-auto bg-[#f8fdfeee]"
    >
      <div className="flex flex-col">
        <div
          onClick={props.onClose}
          className="text-right font-semibold cursor-pointer text-xl mr-2 "
        >
          x
        </div>
        <div className="flex flex-col px-4">
          <p className="font-bold mb-2">TASK: </p>

          <div className="input-group">
            <input
              type="text"
              id="title"
              value={props.title}
              onChange={props.handleTitle}
              className="outline-2 outline-black"
              required
            />
            <label htmlFor="title">Title</label>
          </div>

          <div className="input-group">
            <textarea
              id="description"
              value={props.details}
              onChange={props.handleDetail}
              className="outline-2 outline-black"
              required
            ></textarea>
            <label htmlFor="description">Description</label>
          </div>

          <div className="flex items-center space-x-2">
            <p>Set Priority: </p>

            <input
              type="radio"
              checked={props.prior === "LOW"}
              onChange={props.handlePrior}
              value="LOW"
            ></input>
            <p className="text-sm md:text-lg">LOW</p>
            <input
              type="radio"
              checked={props.prior === "HIGH"}
              onChange={props.handlePrior}
              value="HIGH"
            ></input>
            <p className="text-sm md:text-lg">HIGH</p>
          </div>

          <div className="flex items-center">
            <p>Due Date: </p>
            <input
              type="date"
              id="date"
              className="p-2 m-2.5 bg-transparent border-2 outline-2 outline-black rounded"
              value={props.date}
              onChange={props.handleDate}
              placeholder="dd-mm-yy"
            />
          </div>

          <button onClick={props.onCreateTasks} className="bg-green-600 text-white mx-16 md:mx-24 my-4 p-2 rounded">DONE</button>
        </div>
      </div>
    </Modal>
  );
}
