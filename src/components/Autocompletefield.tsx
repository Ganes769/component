import React, {
  HTMLAttributes,
  MouseEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { OptionPropTypes } from "../App";
import { Lucide } from "./Lucide";
import ClickAwayListener from "./ClickAwayListners";

interface AutoCompleteFieldProps {
  options: OptionPropTypes[];
  onChange: (value: OptionPropTypes) => void;
  value?: OptionPropTypes;
  className: string;
  tickOption: boolean | true;
  disabled?: boolean;
}

export interface DropdownTypes {
  name: string;
  id: string;
}

export default function Autocompletefield({
  options,
  value,
  onChange,
  disabled,
  tickOption,
  className,
}: AutoCompleteFieldProps) {
  const [userInput, setUserInput] = useState<string>(value?.name || "");
  const [isOptionOpen, setisOptionOpen] = useState<boolean>(false);
  const [suggestions, setSuggestions] = useState<OptionPropTypes[]>(options);
  const [openUpWards, setOpenUpwards] = useState<boolean>(false);
  const boxRef = useRef<HTMLDivElement>(null);

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

  function toggleList() {
    setisOptionOpen(!isOptionOpen);
    console.log("inside toggle", isOptionOpen);
  }
  return (
    <ClickAwayListener
      onClickAway={handleClickAway}
      onPositionChange={handlePositionChange}
    >
      <div
        ref={boxRef}
        onClick={() => toggleList}
        className={` boredr-2 border-gray-500 relative w-[300px] sm:w-[400px] focus-within:border-2 focus-within:border-blue-600 flex border-2   justify-center items-center ${className}  ${
          disabled && "bg-[#FAFAFA] opacity-75"
        }`}
      >
        <input
          disabled={disabled}
          value={!disabled ? userInput : ""}
          onChange={handleInputChange}
          onFocus={() => setisOptionOpen(true)}
          className=" h-full  w-full focus:border-none active:border-nonet px-4 py-2 border-none focus:outline-none focus:ring-2 focus:ring-transparent"
          type="text"
          placeholder="Placeholder...."
        />
        <button disabled={disabled} onClick={toggleList}>
          <Lucide.ChevronDown className={`${isOptionOpen && "rotate-180"}`} />
        </button>

        <ul
          className={` z-10 bg-white shadow-md mt-2  flex-col scrollbar h-auto max-h-[200px]   rounded-md w-full absolute overflow-y-auto ${
            openUpWards ? "bottom-full " : "top-full"
          } ${isOptionOpen ? "animate-fadeIn" : "animate-fadeOut"}`}
        >
          {isOptionOpen &&
            suggestions.map((value, index) => (
              <li
                key={index}
                onClick={() => handleClickSuggestion(value)}
                className={`text-black  hover:bg-gray-300 rounded-md  text-[14px] p-1 sm:p-2 sm:m-2 flex  justify-between ${
                  value.name == userInput && "bg-[#F2F4F7] border-2  rounded-md"
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
    </ClickAwayListener>
  );
}
