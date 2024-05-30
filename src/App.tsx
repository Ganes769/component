import "react-toastify/dist/ReactToastify.css";
import { useRef, useState } from "react";
import "./App.css";
import "../app/globals.css";
export type OptionPropTypes = {
  name: string;
  id: string;
};

import Autocompletefield from "./components/Autocompletefield";
import useToasthook from "./components/Toaster/useToasthook";
import { ToastContainer } from "react-toastify";
import { toastConfig } from "./components/Toaster/toastConfig";
import Chip from "./components/Chip";
import ModalContent from "./components/ModalContent";
import ConfirmationModal from "./components/ConfirmationModal";
import Modal from "./components/Modal";
import { Button } from "./components/ui/button";
import { DatePicker } from "./components/DatePicker";
import { InputOTPControlled } from "./components/Inputotp";
import MultipleChip from "./components/MultipleChip";

import { SwitchDemo } from "./components/SwitchDemo";
import { Tooltip, TooltipProvider } from "@radix-ui/react-tooltip";
import TooltipDemo from "./components/Tooltipdemo";
import { DateRange, Matcher } from "react-day-picker";
// import { DatePickerWithRange } from "./components/DateRangepicker";
import { addDays } from "date-fns";
import { DatePickerWithRange } from "./components/DatePickerRange";
function App() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [otp, setOtp] = useState<string | undefined>();
  const [switches, setSwitch] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  function handleDateRange(dateRange?: DateRange) {
    setDateRange(dateRange);
    console.log("daterange", dateRange);
  }
  function handleSwitchChange(check: boolean) {
    console.log("switch chnaged", check);
    setSwitch(check);
  }
  function handleOtp(otp?: string) {
    setOtp(otp);
    console.log("otp entered is:", otp);
  }
  function handleDateSelect(newDate?: Date) {
    console.log("selected date is :", newDate);
    setDate(newDate);
  }
  const { errorMsg } = useToasthook();
  const modalref = useRef<{
    show: (title: string, message: string, refId: number) => void;
    cancel: () => void;
    onAccept: (refId: number) => void;
  }>(null);
  function showConfirmModal() {
    modalref?.current?.show(
      "Connection Successful",
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
      77
    );
  }

  const [showModal, setShowModal] = useState<boolean>(false);

  const [values, setValues] = useState<OptionPropTypes[]>([
    {
      id: "1",
      name: "Part II",
    },
  ]);

  const [value, setValue] = useState<OptionPropTypes>({
    id: "1",
    name: "The Godfather: Part II",
  });
  const handleFieldChange = (value: OptionPropTypes) => {
    console.log("Selected values are :", value);
    setValue(value);
  };

  const handleChipChange = (value: OptionPropTypes[]) => {
    setValues(values);
    console.log("selected tags are ", value);
  };
  const options: OptionPropTypes[] = [
    {
      id: "1",
      name: "The Godfather: Part II",
    },
    {
      id: "2",
      name: "Hello1",
    },
    {
      id: "3",
      name: "12 Angry Men",
    },
    {
      id: "4",
      name: "The Return of the King",
    },
    {
      id: "5",
      name: "Hello4",
    },
    { id: "66", name: "The Shawshank Redemption" },
  ];
  function closeModal() {
    modalref?.current?.cancel();
    console.log("cancel model");
  }
  type reportType = {
    title: string;
    id: string;
    detail: string;
  };
  const report: reportType[] = [
    {
      title: "Report Name",
      id: "1",
      detail: "My template",
    },
    {
      title: "Database",
      id: "2",
      detail: "MySql",
    },
    {
      title: "Host",
      id: "3",
      detail: "111.222.1.11",
    },
    {
      title: "Port",
      id: "4",
      detail: "8000",
    },
  ];
  function handleAccept() {
    console.log("procced to next ");
  }
  const disabledDates = {
    from: new Date("2024-05-23"),
    to: new Date("2024-05-29"),
  };
  return (
    <>
      <div className="w-1/3 flex justify-center items-center flex-col gap-3  mx-auto">
        <MultipleChip
          // disabled={true}
          className=""
          value={values}
          options={options}
          onChange={handleChipChange}
        />
        {/* Modal -useimperativehandle */}
        <Button variant="secondary" onClick={() => showConfirmModal()}>
          ConfirmModal
        </Button>
        <Button
          variant="secondary"
          onClick={() => errorMsg("Title", "description")}
        >
          Toaster
        </Button>
        <Autocompletefield
          // disabled={true}
          tickOption={true}
          className=""
          value={value}
          onChange={handleFieldChange}
          options={options}
        />
        <ConfirmationModal
          onAccept={handleAccept}
          className="h-[200px] w-[300px]"
          onCancel={() => closeModal()}
          ref={modalref}
        />
        <Modal className="" showModal={showModal} setShowModal={setShowModal}>
          <ModalContent report={report} />
        </Modal>
        <button onClick={() => setShowModal(true)}>modal</button>
        {/* <Chip status="active" />
        <Chip status="deactive" /> */}
        <TooltipDemo />
        <SwitchDemo setChange={handleSwitchChange} status={switches} />
        <DatePickerWithRange date={dateRange} setDateRange={handleDateRange} />
        <DatePicker
          disableDates={disabledDates}
          date={date}
          onSelectDate={handleDateSelect}
        />
        <InputOTPControlled value={otp} setValue={handleOtp} />
      </div>
      <ToastContainer {...toastConfig} />
    </>
  );
}

export default App;
