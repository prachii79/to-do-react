import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";

export default function Task({
  id,
  priority,
  tit,
  det,
  delet,
  edit,
  date,
  done,
  handle,
}) {
  const styles = {
    backgroundColor: done
      ? "#62b462"
      : priority === "LOW"
      ? "#f7f767"
      : "#f34949",
  };

  const descStyles = {
    backgroundColor: done
      ? "#7ab77a"
      : priority === "LOW"
      ? "#f9f985"
      : "#f96666",
  };

  function handleImageClick(e) {
    e.stopPropagation();
    handle(id, e);
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
                  <p className="font-normal text-sm sm:text-md">Due: {date}</p>
                  <div className="flex items-center">
                    <img
                      src={
                        done ? "/images/checked.svg" : "/images/unchecked.svg"
                      }
                      onClick={handleImageClick}
                      className="w-4 h-4 sm:w-5 sm:h-5"
                    />
                    <div className="font-bold text-md ml-1 sm:text-lg">
                      {tit}
                    </div>
                  </div>
                </div>
                <div className="flex gap-x-1 ">
                  <img
                    src="/images/delete.svg"
                    onClick={(e) => {
                      delet(id, e);
                    }}
                    className="w-6 h-6 sm:w-8 sm:h-8"
                  />
                  <img
                    src="/images/edit.svg"
                    onClick={(e) => {
                      edit(id, e);
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
              <p>{det}</p>
            </div>
          </AccordionItemPanel>
        </AccordionItem>
      </div>
    </div>
  );
}
