import React, { useEffect, useRef, useState } from "react";
import { OptionPropTypes } from "../App";
import { IoMdCloseCircle } from "react-icons/io";

interface AutoCompleteFieldProps {
  options: OptionPropTypes[];
  onChange: (value: OptionPropTypes[]) => void;
  value: OptionPropTypes[];
}

function MultipleChip({ options, onChange, value }: AutoCompleteFieldProps) {
  const [suggestions, setSuggestions] = useState<OptionPropTypes[]>(options);
  const [option, setOption] = useState<string>("");
  const [isOptionOpen, setisOptionOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<OptionPropTypes[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.onclick = (event) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        // console.log("clicked outside ");
        isOptionOpen && setisOptionOpen(false);
      }
    };
    setSelectedOption(value);
  }, [value, isOptionOpen]);
  function hadleClickSuggestion(value: OptionPropTypes, index: number) {
    const isDuplicate = selectedOption.some((item) => item.id === value.id);
    if (!isDuplicate) {
      const newSelectedOption = [...selectedOption, value];
      setSelectedOption(newSelectedOption);
      onChange(newSelectedOption);
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
    const newSelectedOption = selectedOption.filter((item) => item.id !== id);
    setSelectedOption(newSelectedOption);
    onChange(newSelectedOption);
  }

  return (
    <div
      onClick={() => setisOptionOpen(true)}
      ref={boxRef}
      className="relative min-w-[400px] max-w-[360px]"
    >
      <div className="flex flex-row flex-wrap border-2">
        {selectedOption.map((item) => (
          <span
            key={item.id}
            className="border-2 border-[#BCBDBC] m-2 inline-flex items-center whitespace-nowrap  rounded-full font-semibold  bg-[#E9E9E8] py-1 px-2 font-sans text-xs  uppercase text-gray-900"
          >
            <span className="mr-2 cursor-pointer ">{item.name}</span>
            <span>
              <IoMdCloseCircle
                size={18}
                onClick={() => handleDeleteChip(item.id)}
              />
            </span>
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
      <ul
        className={`bg-white mt-2 h-[200px]  w-full scrollbar  overflow-y-auto shadow-md rounded-md absolute z-10 ${
          isOptionOpen ? "block" : "hidden"
        }`}
      >
        {isOptionOpen &&
          suggestions.map((value, index) => (
            <li
              key={index}
              onClick={() => hadleClickSuggestion(value, index)}
              className={`p-2 text-black hover:bg-gray-300 ${
                selectedOption.some((item) => item.id === value.id) &&
                "bg-[#F2F4F7]"
              }`}
            >
              {value.name}
            </li>
          ))}
      </ul>
    </div>
  );
}

export default MultipleChip;
