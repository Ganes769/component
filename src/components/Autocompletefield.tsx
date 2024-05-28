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

  const boxRef = useRef<HTMLDivElement>(null);

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

  return (
    <ClickAwayListener
      onClickAway={handleClickAway}
      onPositionChange={handlePositionChange}
    >
      <div className="border border-gray-400" ref={boxRef}>
        <button
          onClick={() => setisOptionOpen(true)}
          className={`relative w-[410px] flex  justify-center items-center ${className}  ${
            disabled && "bg-[#FAFAFA] opacity-75"
          }`}
        >
          <input
            disabled={disabled}
            value={!disabled ? userInput : ""}
            onChange={handleInputChange}
            onFocus={() => setisOptionOpen(true)}
            className=" h-full w-full focus:border-transparent active:border-transparent px-4 py-2 border-none focus:outline-none focus:ring-2 focus:ring-transparent"
            type="text"
            placeholder="Placeholder...."
          />

          <ul
            className={` z-10 bg-white shadow-md mt-2 flex flex-col scrollbar h-auto max-h-[200px]  rounded-md w-full absolute overflow-y-auto ${
              openUpWards ? "bottom-full " : "top-full"
            } ${isOptionOpen ? "block" : "border-none hidden "}`}
          >
            {isOptionOpen &&
              suggestions.map((value, index) => (
                <li
                  key={index}
                  onClick={() => handleClickSuggestion(value)}
                  className={`text-black bg-red- hover:bg-gray-300  text-[14px] p-1 m-2 flex justify-between ${
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
        </button>
      </div>
    </ClickAwayListener>
  );
}
