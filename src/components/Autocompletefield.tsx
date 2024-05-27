import React, { MouseEvent, useEffect, useRef, useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import { OptionPropTypes } from "../App";
import { Lucide } from "./Lucide";

interface AutoCompleteFieldProps {
  options: OptionPropTypes[];
  onChange: (value: OptionPropTypes) => void;
  value?: OptionPropTypes;
  className: string;
  tickOption: boolean | true;
}

export interface DropdownTypes {
  name: string;
  id: string;
}

export default function Autocompletefield({
  options,
  value,
  onChange,
  tickOption,
  className,
}: AutoCompleteFieldProps) {
  const [userInput, setUserInput] = useState<string>(value?.name || "");
  const [isOptionOpen, setisOptionOpen] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<OptionPropTypes[]>(options);

  function handleClickSuggestion(option: OptionPropTypes) {
    const selectedValue = option.name;
    setUserInput(selectedValue);
    setisOptionOpen(false);
    setSuggestions(options);
    onChange(option);
    console.log(option);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    setUserInput(e.target.value);
    setisOptionOpen(true);
    setSuggestions(
      options.filter((suggestion) =>
        suggestion.name.toLowerCase().includes(value.toLowerCase())
      )
    );
  }
  function toggleList(e: MouseEvent) {
    e.stopPropagation();
    setisOptionOpen((prev) => !prev);
  }
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.onclick = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        isOptionOpen && setisOptionOpen(false);
      }
    };
  }, [isOptionOpen]);

  console.log(isOptionOpen);
  return (
    <div
      ref={boxRef}
      onClick={() => setisOptionOpen(true)}
      className={`relative  w-[410px]  ${className}`}
    >
      <div className="flex  items-center justify-between border-2">
        <input
          value={userInput}
          onChange={handleInputChange}
          onFocus={() => setisOptionOpen(true)}
          className="h-full w-full focus:border-transparent active:border-transparent px-4 py-2 border-none focus:outline-none focus:ring-2 focus:ring-transparent"
          type="text"
          placeholder="enter your text"
        />
        <div className="cursor-pointer mr-2" onClick={toggleList}>
          {isOptionOpen ? (
            <Lucide.arrowUp size={18} onClick={toggleList} />
          ) : (
            <Lucide.arrrowDown size={18} onClick={toggleList} />
          )}
        </div>
      </div>
      <ul
        className={` z-10 bg-white shadow-md mt-2 scrollbar rounded-md w-full absolute overflow-y-auto  ${
          isOptionOpen ? "block" : "border-none hidden "
        }`}
      >
        {isOptionOpen &&
          suggestions.map((value, index) => (
            <li
              key={index}
              onClick={() => handleClickSuggestion(value)}
              className={`p-2 m-2 text-black bg-red- hover:bg-gray-300 flex justify-between ${
                value.name == userInput && "bg-[#F2F4F7] border  rounded-md"
              } `}
            >
              {value.name}
              {tickOption && value.name == userInput && (
                <Lucide.check strokeWidth={2} color="#33B469" />
              )}
            </li>
          ))}
      </ul>
    </div>
  );
}
