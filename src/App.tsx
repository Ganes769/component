import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import Chip from "./components/Chip";
import { toastConfig } from "./components/Toaster/toastConfig";
import Button from "./components/Button";
import Modal from "./components/Modal";
import useToasthook from "./components/Toaster/useToasthook";
import Icon from "./components/Icon";
function App() {
  const modalref = useRef<{ cancel: () => void; show: () => void }>(null);
  function showModal() {
    modalref?.current?.show();
  }
  const { successMsg, errorMsg } = useToasthook();
  return (
    <div className="w-1/3 flex justify-center items-center flex-col gap-3 mt-10 mx-auto">
      {/* Reusable Chip Component */}
      <Chip name="active" />
      <Chip name="deactive" />
      {/* Button Component */}

      <Button hasIcon={false} title="primary" variant="standard" />
      {/* Modal component */}
      <Button
        onClick={() => showModal()}
        hasIcon={true}
        title="Modal"
        variant="standard"
      />
      <p></p>
      <Modal message="lo" ref={modalref} title="modal title" />
      {/* Toaster */}
      <Button
        onClick={() => errorMsg("Error", "Error toaster messege")}
        hasIcon={false}
        title="error"
        variant="outline"
      />
      <Button
        onClick={() => successMsg("Success", "Success toaster messege")}
        hasIcon={false}
        title="succsess"
        variant="outline"
      />
      <Button
        hasIcon={true}
        iconPos="start"
        title="Primary"
        icon={<Icon name="forwardRight" size={12} />}
        variant="error"
        errorvarient="plain"
      />
      <Button variant="error" hasIcon={false} title="Error" />
      <ToastContainer {...toastConfig} />
    </div>
  );
}

export default App;
