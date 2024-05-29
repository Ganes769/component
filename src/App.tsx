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
import MultipleChip from "./components/MultipleChip";
import { Button } from "./components/ui/button";
import { DatePicker } from "./components/DatePicker";

function App() {
  const [date, setDate] = useState<Date | undefined>(new Date());
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
  // Detail modal
  const [showModal, setShowModal] = useState<boolean>(false);

  const [values, setValues] = useState<OptionPropTypes[]>([
    {
      id: "1",
      name: "The Godfather: Part II",
    },
  ]);

  const [value1, setValue1] = useState<OptionPropTypes>({
    id: "1",
    name: "The value1: ",
  });

  const [value, setValue] = useState<OptionPropTypes>({
    id: "1",
    name: "The Godfather: Part II",
  });
  const handleFieldChange = (value: OptionPropTypes) => {
    console.log("Selected values are :", value);
    setValue(value);
  };
  const handleFieldChange1 = (value: OptionPropTypes) => {
    console.log("Selected values are :", value);
    setValue1(value1);
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

  return (
    <>
      <div className="w-1/3 flex justify-center items-center flex-col gap-3  mx-auto">
        <MultipleChip
          disabled={true}
          className="min-w-[400px] max-w-[340px]"
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
        <ConfirmationModal
          onAccept={handleAccept}
          className="h-[200px] w-[300px]"
          onCancel={() => closeModal()}
          ref={modalref}
        />
        <Modal
          className="h-[200px] w-[300px]"
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <ModalContent report={report} />
        </Modal>

        <Chip status="active" />
        <Chip status="deactive" />

        <Autocompletefield
          // disabled={true}
          tickOption={true}
          className=""
          value={value}
          onChange={handleFieldChange}
          options={options}
        />
        <DatePicker date={date} onSelectDate={handleDateSelect} />
      </div>
      <ToastContainer {...toastConfig} />
    </>
  );
}

export default App;
