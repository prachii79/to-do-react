import { ChangeEvent } from "react";

export default function Create({
  onCreate,
  inVal,
  handleInput
}: { onCreate: () => void; inVal: string; handleInput: (e: ChangeEvent<HTMLInputElement>)=>void } = props) {
  return (
    <>
      <p className="font-bold">TO-DO list</p>
      <div className="flex justify-between">
        <input
          type="text"
          className="border-2 border-blue-300"
          value={inVal}
          required
          onChange={handleInput}
        />
        <button onClick={onCreate}>create</button>
      </div>
    </>
  );
}
