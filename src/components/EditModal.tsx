import Modal from 'react-modal';

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      background: "#f8fdfeee",
    },
  };

  Modal.setAppElement('#root');

export default function EditModal(props){

    return(
        <Modal
            isOpen={props.open}
            onRequestClose={props.onClose}
            style={customStyles} 
          >
        <div className="flex flex-col">
            <div onClick={props.onClose} className="text-right font-semibold cursor-pointer text-xl ">x</div>
            <div className="flex flex-col px-4">
              <p className="font-bold mb-2">TASK: </p>

              <div className="input-group">
                <input type="text" id="title" value={props.title} onChange={props.onTitle} required />
                <label htmlFor="title">Title</label>
              </div>

              <div className="input-group">
                <textarea id="description" value={props.details} onChange={props.onDetail} required ></textarea>
                <label htmlFor="description">Description</label>
              </div> 

              <div className="flex items-center space-x-4" >
                <p>Set Priority: </p>
              
                <input type="radio" checked={props.prior === "LOW"} onChange={props.onPrior} value="LOW"></input>
                <p>LOW</p>
                <input type="radio" checked={props.prior === "HIGH"} onChange={props.onPrior} value="HIGH"></input>
                <p>HIGH</p>

              </div>

              <div className="flex items-center">
                <p>Due Date: </p>
                <input type="date" id="date" className="p-2 m-2.5 bg-transparent border-2 border-gray rounded" placeholder="dd-mm-yy" />
              </div>

              <button onClick={() => {props.onEditTask(props.id)}}>done</button>
            </div>
        </div>
        </Modal>
    )
}