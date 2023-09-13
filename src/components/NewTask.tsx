import {
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
  } from 'react-accessible-accordion';

export default function NewTask({id, priority, tit, det, delet, edit, date, done, handle}){
    console.log("props:", { id, priority, tit, det, date, done, handle });

    const styles = {
        backgroundColor: priority === "LOW" ? "yellow" : "red"
        //backgroundColor: priority === "LOW" ? "yellow" : done ? "green" : "red"
      }
    //const checked = done ? "/images/checked2.svg" : "/images/unchecked.svg"
    console.log(done)
    //console.log(checked)
    
    function handleImageClick(e) {
        e.stopPropagation()
        console.log("Image clicked");
        handle(id, e)
        console.log(handle(id, e))
      }

    return(
        <div>
            <div>
                <AccordionItem className="flex flex-col w-30 rounded bg-yellow-100 p-3" style={styles}>
                <AccordionItemHeading>
                    <AccordionItemButton>
                        <div className='w-52'>
                            <p> Due: {date}</p>
                            <div className='flex items-center'>
                                <div >
                                    <img src={done ? "/images/checked2.svg" : "/images/unchecked.svg"} onClick={handleImageClick} className='w-6 h-6' />
                                </div>
                                <div className='flex justify-between w-full'>
                                    <div className="font-bold text-xl">{tit}</div>
                                    <div className='flex  mr-0'>
                                        <img src="/images/delete.svg" onClick={(e) => {delet(id, e)}} className='w-8 h-8'/>
                                        <img src="/images/edit.svg" onClick={(e) => {edit(id, e)}} className='w-8 h-8'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </AccordionItemButton>
                </AccordionItemHeading>
                <AccordionItemPanel>
                    <div className='bg-pink-100'>
                        <p>{det}</p>
                    </div>
                </AccordionItemPanel>
                </AccordionItem>
            </div>
        </div>
    )
}