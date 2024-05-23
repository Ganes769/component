import React, { useEffect, useState } from "react";
import { OptionPropTypes } from "../App";
import { IoMdCloseCircle } from "react-icons/io";
type AutoCompleteFieldProps = {
  options: OptionPropTypes[];
  handleChange: (value: OptionPropTypes[]) => void;
  defaultChip: OptionPropTypes[];
};

export default function MultipleChip({
  options,
  handleChange,
  defaultChip,
}: AutoCompleteFieldProps) {
  useEffect(() => {
    setSelectedOption(defaultChip);
  }, []);
  const [suggestions, setSuggestions] = useState<OptionPropTypes[]>(options);
  const [option, setOption] = useState<string>("");
  const [isOptionOpen, setisOptionOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<OptionPropTypes[]>([]);

  function hadleClickSuggestion(value: any, index: number) {
    const isDuplicate = selectedOption.some((item) => item.id === value.id);
    if (!isDuplicate) {
      setOption(value[index]);
      const newSelectedOption = [...selectedOption, value];
      setSelectedOption(newSelectedOption);
      handleChange(newSelectedOption);
      setisOptionOpen(false);
      setSuggestions(options);
      setOption("");
    } else {
      setisOptionOpen(false);
      handleDeleteChip(value.id);
    }
  }
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setOption(e.target.value);
    setisOptionOpen(true);
    setSuggestions(
      options.filter((suggestion) =>
        suggestion.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  }
  function handleDeleteChip(id: string) {
    setSelectedOption((selectedOption) =>
      selectedOption.filter((item) => item.id !== id)
    );
  }
  console.log;
  return (
    <div className="relative min-w-[400px] max-w-[360px]">
      <div className="flex flex-row flex-wrap border-2">
        {selectedOption.map((item) => (
          <span
            key={item.id}
            className="border-2 border-[#BCBDBC] m-2 inline-flex items-center whitespace-nowrap  rounded-full font-semibold  bg-[#E9E9E8] py-1 px-2 font-sans text-xs  uppercase text-gray-900"
          >
            <span className="mr-2 cursor-pointer ">{item.name}</span>
            <IoMdCloseCircle
              size={18}
              onClick={() => handleDeleteChip(item.id)}
            />
          </span>
        ))}
        <input
          value={option}
          onChange={handleInputChange}
          onFocus={() => setisOptionOpen(true)}
          className="w-[80px] flex-grow focus:border-transparent active:border-transparent px-4 py-2 border-none focus:outline-none focus:ring-2 focus:ring-transparent"
          type="text"
          placeholder="enter your text"
        />
      </div>
      <ul className="bg-white w-full shadow-md rounded-md absolute z-10">
        {isOptionOpen &&
          suggestions.map((value, index) => (
            <li
              key={index}
              onClick={() => hadleClickSuggestion(value, index)}
              className={`p-2 text-black hover:bg-gray-300 ${
                selectedOption.some((item) => item.id == value.id) &&
                "bg-[#EAF5FE]"
              }`}
            >
              {value.name}
            </li>
          ))}
      </ul>
    </div>
  );
}

// import React, { useState } from "react";
// import Tag from "./Tag";
// export type ChipPropTypes = {
//   name: string;
//   id: number;
// };
// export default function Autocompletefield() {
//   const data: ChipPropTypes[] = [
//     {
//       id: 1,
//       name: "Hello",
//     },
//     {
//       id: 2,
//       name: "Hello1",
//     },
//     {
//       id: 3,
//       name: "Hello2",
//     },
//     {
//       id: 4,
//       name: "Hello3",
//     },
//     {
//       id: 5,
//       name: "Hello4",
//     },
//   ];
//   console.log(data);
//   const [option, setOption] = useState<string>("");
//   const [suggestion, setShowSuggestions] = useState<boolean>(false);
//   const [selectOption, setSelectedOption] = useState<ChipPropTypes[]>([]);
//   function handleClickSuggestion(
//     data: any,
//     value: ChipPropTypes,
//     index: number
//   ) {
//     const isDuplicate = selectOption.some((item) => item.id === value.id);
//     if (!isDuplicate) {
//       setOption(data[index]);
// setSelectedOption([...selectOption, value]);
// setShowSuggestions(false);
//     } else {
//       handleDeleteChip(value.id);
//     }
//   }
//   function handleDeleteChip(id: number) {
//     setSelectedOption((selectOption) =>
//       selectOption.filter((item) => item.id !== id)
//     );
//   }
//   return (
//     <div className="flex flex-col">
//       <div className="flex relative ">
//         {selectOption.map((item) => (
//           <Tag handleDelete={handleDeleteChip} item={item} />
//         ))}

//         <input
//           onChange={(e) => setOption(e.target.value)}
//           onFocus={() => setShowSuggestions(true)}
//           placeholder="choose the value..."
//           type="text"
//           className="w-full focus:border-transparent active:border-transparent px-4 py-2 border-none  rounded-md focus:outline-none focus:ring-2 focus:ring-transparent"
//         />
//       </div>
//       <div className="mt-2 flex flex-wrap">
//         <ul className="bg-white mt-2 shadow-md shadow-gray-600 w-full rounded-lg">
//           {suggestion &&
//             data.map((value, index) => (
//               <li
//                 key={index}
//                 onClick={() => handleClickSuggestion(data, value, index)}
//                 className="p-2 text-black hover:bg-gray-300"
//               >
//                 {value.name}
//               </li>
//             ))}
//         </ul>{" "}
//       </div>
//     </div>
//   );
// }

// <div className="justify-start items-start  space-y-2 flex  p-2">
// <div className=" flex flex-wrap items-center justify-center  mt-2 ">
// {selectOption.map((item) => (
//   <Tag handleDelete={handleDeleteChip} item={item} />
// ))}
// </div>

//       <div className="flex flex-col  justify-start  items-start">
{
  /* <input
  onChange={(e) => setOption(e.target.value)}
  onFocus={() => setShowSuggestions(true)}
  placeholder="choose the value..."
  type="text"
  className="px-4 py-2 ml-2 border-2 focus:outline-none focus:border-transparent active:border-transparent"
/> */
}

{
  /* <ul className="bg-white mt-2 shadow-md shadow-gray-600 w-full rounded-lg">
  {suggestion &&
    data.map((value, index) => (
      <li
        key={index}
        onClick={() => handleClickSuggestion(data, value, index)}
        className="p-2 text-black hover:bg-gray-300"
      >
        {value.name}
      </li>
    ))}
</ul> */
}
//       </div>
//     </div>
