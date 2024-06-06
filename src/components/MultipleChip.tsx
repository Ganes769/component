import React, { useCallback, useEffect, useRef, useState } from "react";
import { OptionPropTypes } from "../App";
import { Lucide } from "./Lucide";
import ClickAwayListener from "./ClickAwayListners";
import Chip from "./Chip";
interface AutoCompleteFieldProps {
  options: OptionPropTypes[];
  onChange: (value: OptionPropTypes[]) => void;
  value: OptionPropTypes[];
  className: string;
  disabled?: boolean;
}

function MultipleChip({
  options,
  onChange,
  value,
  disabled,
  className,
}: AutoCompleteFieldProps) {
  const [suggestions, setSuggestions] = useState<OptionPropTypes[]>(options);
  const [option, setOption] = useState<string>("");
  const [isOptionOpen, setisOptionOpen] = useState<boolean>(false);
  const [openUpWards, setOpenUpwards] = useState<boolean>(false);

  const [selectedOption, setSelectedOption] = useState<OptionPropTypes[]>([]);
  const boxRef = useRef<HTMLButtonElement>(null);

  function hadleClickSuggestion(value: OptionPropTypes) {
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
  console.log("default options", selectedOption);

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
  const handleClickAway = useCallback(
    (event: Event) => {
      if (boxRef.current && !boxRef.current.contains(event.target as Node)) {
        console.log("here", isOptionOpen);
        setisOptionOpen(false);
      }
    },
    [isOptionOpen]
  );
  function handlePositionChange() {
    if (boxRef.current) {
      const rect = boxRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      setOpenUpwards(rect.bottom + 200 > viewportHeight);
      console.log(rect.bottom, "viewport:", viewportHeight);
    }
  }

  useEffect(() => {
    setSelectedOption(value);
  }, [value]);
  console.log("outside", isOptionOpen);
  return (
    <ClickAwayListener
      onClickAway={handleClickAway}
      onPositionChange={handlePositionChange}
    >
      <div
        ref={boxRef}
        onClick={() => {if(!disabled)setisOptionOpen(true)}}
        className={`relative border-2 border-gray-500 focus-within:border-2 focus-within:border-blue-500  w-[300px] sm:w-[400px]   ${className}`}
      >
        <div
          className={`flex flex-row flex-wrap  ${
            disabled && "bg-[#FAFAFA] opacity-75"
          }`}
        >
          {selectedOption.map((item) => (
            <Chip type="deactive">
              <span
                key={item.id}
                className={`border-2 border-[#BCBDBC] m-2 inline-flex items-center whitespace-nowrap  rounded-full font-semibold  bg-[#E9E9E8] py-1 px-2 font-sans text-xs  uppercase ${
                  disabled && "bg-[#FAFAFA] opacity-75"
                } `}
              >
                <span className="mr-2 cursor-pointer ">{item.name}</span>
                <span>
                  <Lucide.circlex
                    size={18}
                    onClick={() => handleDeleteChip(item.id)}
                  />
                </span>
              </span>
            </Chip>
          ))}
          <input
            disabled={disabled}
            value={option}
            onChange={handleInputChange}
            onFocus={() => setisOptionOpen(true)}
            className="w-full flex-grow focus:border-transparent active:border-transparent px-4 py-2 border-none focus:outline-none focus:ring-2 focus:ring-transparent"
            type="text"
            placeholder="Placeholder....."
          />
        </div>

        <ul
          className={`bg-white mt-2 max-h-[200px] w-full scrollbar  overflow-y-auto shadow-md rounded-md absolute z-10 animate-fadeInOut ${
            isOptionOpen ? "animate-fadeIn" : "animate-fadeOut"
          } ${openUpWards ? "bottom-full " : "top-full"}  `}
        >
          {isOptionOpen &&
            suggestions.map((value, index) => (
              <li
                key={index}
                onClick={() => hadleClickSuggestion(value)}
                className={` rounded-md  flex justify-between p-2 m-1  sm:m-2 text-black text-[14px] hover:bg-gray-300 ${
                  selectedOption.some((item) => item.id === value.id) &&
                  "bg-[#F2F4F7]"
                }`}
              >
                {value.name}
              </li>
            ))}
        </ul>
      </div>
    </ClickAwayListener>
  );
}

export default MultipleChip;
