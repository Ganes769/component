import "react-toastify/dist/ReactToastify.css";
import { useRef, useState } from "react";
import "./App.css";

export type OptionPropTypes = {
  name: string;
  id: string;
};

import Autocompletefield from "./components/Autocompletefield";
import MultipleChip from "./components/MultipleChip";
import useToasthook from "./components/Toaster/useToasthook";
import Button from "./components/Button";
import { ToastContainer } from "react-toastify";
import { toastConfig } from "./components/Toaster/toastConfig";
import Chip from "./components/Chip";
import ModalContent from "./components/ModalContent";
import ConfirmationModal from "./components/ConfirmationModal";
import Modal from "./components/Modal";
function App() {
  const { errorMsg, successMsg } = useToasthook();
  const modalref = useRef<{
    show: (title: string, message: string) => void;
    cancel: () => void;
  }>(null);
  function showConfirmModal() {
    modalref?.current?.show(
      "Connection Successful",
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    );
  }
  // Detail modal
  const [showModal, setShowModal] = useState<boolean>(false);

  function displayDetailModal() {
    setShowModal(true);
  }

  const [defaultChips, setdefaulatChips] = useState<OptionPropTypes[]>([
    {
      id: "1",
      name: "The Godfather: Part II",
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
    setdefaulatChips(value);
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
  function onAccept(refid: number) {
    console.log("proceed to next", refid);
  }
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

  return (
    <>
      <div className="w-1/3 flex justify-center items-center flex-col gap-3 mt-10 mx-auto">
        <MultipleChip
          className="bg-white"
          value={defaultChips}
          options={options}
          onChange={handleChipChange}
        />
        {/* <Autocompletefield
          tickOption={false}
          className=""
          value={value}
          onChange={handleFieldChange}
          options={options}
        /> */}
        <Autocompletefield
          tickOption={true}
          className=""
          value={value}
          onChange={handleFieldChange}
          options={options}
        />
        {/* Modal -useimperativehandle */}
        <Button
          onClick={() => showConfirmModal()}
          hasIcon={false}
          title="Modal"
          variant="standard"
        />

        <ConfirmationModal
          className="h-[200px] w-[300px]"
          onCancel={() => closeModal()}
          onAccept={() => onAccept(77)}
          ref={modalref}
        />
        <Modal
          className="h-[200px] w-[300px]"
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <ModalContent report={report} />
        </Modal>
        {/* //Toaster */}
        <Button
          onClick={() => errorMsg("Title", "description")}
          title="Error"
          hasIcon={false}
          variant="plain"
        />
        <Button
          onClick={() => successMsg("Title", "description")}
          title="Success"
          hasIcon={false}
          variant="plain"
        />
        {/* chips  */}
        <Chip status="active" />
        <Chip status="deactive" />
        <Button
          onClick={() => displayDetailModal()}
          title="Details Modal"
          hasIcon={false}
          variant="plain"
        />

        <div className="bg-red-800">{/* <Lucide.logo /> */}</div>
      </div>
      <ToastContainer {...toastConfig} />
    </>
  );
}

export default App;
