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
function App() {
  const { errorMsg, successMsg } = useToasthook();
  const modalref = useRef<any>(null);
  function showModal() {
    modalref?.current?.show();
  }
  const [defaultChips, setdefaulatChips] = useState<OptionPropTypes[]>([
    {
      id: "1",
      name: "The Godfather: Part II",
    },
  ]);
  const [field, setField] = useState<OptionPropTypes>({
    id: "1",
    name: "The Godfather: Part II",
  });
  const handleFieldChange = (value: OptionPropTypes) => {
    console.log("Selected values are :", value);
    setField(value);
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

  return (
    <>
      <div className="w-1/3 flex justify-center items-center flex-col gap-3 mt-10 mx-auto">
        Reusable Component
        <MultipleChip
          defaultChip={defaultChips}
          options={options}
          handleChange={handleChipChange}
        />
        <Autocompletefield
          field={field}
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
        <Modal
          message="Lorem Ipsum has been the industry's standard dummy text ever since
              the 1500s,"
          ref={modalref}
          title="modal title"
        />
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
      </div>
      <ToastContainer {...toastConfig} />
    </>
  );
}

export default App;
