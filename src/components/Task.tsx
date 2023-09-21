import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

export default function Task(props: {
  id:string,
  priority:string,
  tit:string,
  det:string,
  delet: (id: string, e: any)=> void,
  edit: (id: string, e: any)=> void,
  date: string,
  done:boolean,
  handle: (id: string)=> void,
}) {
  const styles = {
    backgroundColor: props.done
      ? "#62b462"
      : props.priority === "LOW"
      ? "#f7f767"
      : "#f34949",
  };

  const descStyles = {
    backgroundColor: props.done
      ? "#7ab77a"
      : props.priority === "LOW"
      ? "#f9f985"
      : "#f96666",
  };

  function handleImageClick(e: any) {
    e.stopPropagation();
    props.handle(props.id);
  }

  return (
    <div>
      <div>
        <AccordionItem
          className="rounded p-2 lg:p-4 mb-2 sm:mb-3 md:mb-4"
          style={styles}
        >
          <AccordionItemHeading>
            <AccordionItemButton>
              <div className="flex items-center justify-between w-full ">
                <div className="flex flex-col w-4/5">
                  <p className="font-normal text-sm sm:text-md">Due: {props.date}</p>
                  <div className="flex items-center">
                    <img
                      src={
                        props.done ? "/images/checked.svg" : "/images/unchecked.svg"
                      }
                      onClick={handleImageClick}
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                    <div className="font-bold text-md ml-1 sm:text-lg">
                      {props.tit}
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-1 ">
                  <img
                    src="/images/delete.svg"
                    onClick={(e: any) => {
                      props.delet(props.id, e);
                    }}
                    className="w-6 h-6 sm:w-8 sm:h-8"
                  />
                  <img
                    src="/images/edit.svg"
                    onClick={(e: any) => {
                      props.edit(props.id, e);
                    }}
                    className="w-6 h-6 sm:w-8 sm:h-8"
                  />
                </div>
              </div>
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <div
              className="border-2 border-black p-2 my-2 mx-2 rounded text-md sm:text-lg"
              style={descStyles}
            >
              <p>{props.det}</p>
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      </div>
    </div>
  );
}
