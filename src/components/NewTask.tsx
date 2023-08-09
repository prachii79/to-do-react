import {
    Accordion,
    AccordionItem,
    AccordionItemHeading,
    AccordionItemButton,
    AccordionItemPanel,
  } from 'react-accessible-accordion';
  
export default function NewTask({labl, tit, det}){
    return(
        <AccordionItem className="flex flex-col w-30 rounded bg-yellow-100 p-3">
            <AccordionItemHeading>
                <AccordionItemButton>
                    <div>
                        <p>date</p>
                        <p className="font-bold text-xl">{tit}</p>
                        <p>{det}</p>
                    </div>
                </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
                <p>{det}</p>    
            </AccordionItemPanel>            
        </AccordionItem>
    )
}