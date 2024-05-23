import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";
import { MdArrowDropUp } from "react-icons/md";
import { OptionPropTypes } from "../App";

type AutoCompleteFieldProps = {
  options: OptionPropTypes[];
  onChange: (value: OptionPropTypes) => void;
  field?: OptionPropTypes;
};

export interface DropdownTypes {
  name: string;
  id: string;
}

export default function Autocompletefield({
  options,
  field,
  onChange,
}: AutoCompleteFieldProps) {
  const [userInput, setUserInput] = useState<string>(field?.name || "");
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
  console.log(field);
  return (
    <div className="relative w-[410px]">
      <div className="flex p-1 items-center justify-between border-2">
        <input
          value={userInput}
          onChange={handleInputChange}
          onFocus={() => setisOptionOpen(true)}
          className="h-full focus:border-transparent active:border-transparent px-4 py-2 border-none focus:outline-none focus:ring-2 focus:ring-transparent"
          type="text"
          placeholder="enter your text"
        />
        {isOptionOpen ? (
          <MdArrowDropUp onClick={() => setisOptionOpen(false)} />
        ) : (
          <IoMdArrowDropdown onClick={() => setisOptionOpen(true)} />
        )}
      </div>
      <ul
        className={` bg-white shadow-md mt-2  rounded-md w-full absolute overflow-y-auto  ${
          isOptionOpen
            ? "block border-2 border-[#8C94A0]"
            : "border-none hidden "
        }`}
      >
        {isOptionOpen &&
          suggestions.map((value, index) => (
            <li
              key={index}
              onClick={() => handleClickSuggestion(value)}
              className={`p-2 text-black hover:bg-gray-300 ${
                value.name == userInput && "bg-[#F2F4F7]"
              } `}
            >
              {value.name}
            </li>
          ))}
      </ul>
    </div>
  );
}
