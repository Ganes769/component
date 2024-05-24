import "react-toastify/dist/ReactToastify.css";
import { useRef, useState } from "react";
import "./App.css";

export type OptionPropTypes = {
  name: string;
  id: string;
};
import Autocompletefield from "./components/Autocompletefield";
import MultipleChip from "./components/MultipleChip";
import Modal from "./components/Modal";
import useToasthook from "./components/Toaster/useToasthook";
import Button from "./components/Button";
import { ToastContainer, toast } from "react-toastify";
import { toastConfig } from "./components/Toaster/toastConfig";
import Chip from "./components/Chip";
import Icon from "./components/Icon";
import DetailsModal from "./components/DetailsModal";
import ModalContent from "./components/ModalContent";
function App() {
  const { errorMsg, successMsg } = useToasthook();
  const modalref = useRef<{
    show: (title: string, message: string) => void;
    cancel: () => void;
  }>(null);
  function showModal() {
    modalref?.current?.show(
      "Connection Successful",
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
    );
  }
  // Detail modal
  const [showDetailModal, setShowDeatailModal] = useState<boolean>(false);

  function displayDetailModal() {
    setShowDeatailModal(true);
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
  function onAccept() {
    console.log("proceed to next");
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
        Reusable Component
        <MultipleChip
          value={defaultChips}
          options={options}
          onChange={handleChipChange}
        />
        <Autocompletefield
          value={value}
          onChange={handleFieldChange}
          options={options}
        />
        {/* Modal -useimperativehandle */}
        <Button
          onClick={() => showModal()}
          hasIcon={false}
          title="Modal"
          variant="standard"
        />
        <Modal onCancel={closeModal} onAccept={onAccept} ref={modalref} />
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
        <ToastContainer {...toastConfig} />
        <div className="bg-red-800"></div>
        <DetailsModal
          showModal={showDetailModal}
          setShowModal={setShowDeatailModal}
        >
          <ModalContent report={report} />
        </DetailsModal>
        <Button
          onClick={() => displayDetailModal()}
          title="Details Modal"
          hasIcon={false}
          variant="plain"
        />
      </div>
    </>
  );
}

export default App;
