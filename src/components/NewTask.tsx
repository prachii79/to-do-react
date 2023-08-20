import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
  } from 'react-accessible-accordion';
  
export default function NewTask({id, labl, tit, det, delet, edit}){
    return(
        <AccordionItem className="flex flex-col w-30 rounded bg-yellow-100 p-3">
            <AccordionItemHeading>
                <AccordionItemButton>
                    <div>
                        <img src="/images/unchecked.svg" className='w-4 h-43' />
                        <p>date</p>
                        <p className="font-bold text-xl">{tit}</p>
                        <p>{det}</p>
                        <button onClick={(e) => {delet(id, e)}}>delete</button><br></br>
                        <button onClick={(e) => {edit(id, e)}}>edit</button>
                    </div>
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <p>{det}</p>    
            </AccordionItemPanel>            
        </AccordionItem>
    )
}