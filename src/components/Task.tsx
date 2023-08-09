// export default function Tasks({toggle, markImp, deleteTask, id, val, done, imp} : {toggle: (id: string) => void; markImp: (id: string) => void; deleteTask: (id: string) => void; id: string; val: string; done: boolean; imp: boolean} = props){ 

//     const styles = {
//         backgroundColor: done ? "blue" : "yellow"
//     }

//     const source = imp? "/images/star-filled.svg" : "/images/star.svg"

//     return(
//         <>
//             <div className="flex flex-row h-7 w-auto border-2" style={styles} key={id}>
//                 <img src={source} alt="star" onClick={() => markImp(id)} />
//                 <p>{val}</p>
//                 <button className="text-green-700 bg-green-200 mx-2 border-blue-600 border-2" onClick={()=> toggle(id)} >done</button>
//                 <button className="text-red-700 bg-red-200 mx-2 border-blue-600 border-2" onClick={()=> deleteTask(id)} >delete</button>
//             </div>
//         </>
//     )
// }