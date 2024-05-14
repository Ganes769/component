import "./index.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRef } from "react";
import Chip from "./components/Chip";
import { toastConfig } from "./components/Toaster/toastConfig";
function App() {
  const modalref = useRef<any>(null);
  function showModal() {
    modalref?.current?.show();
  }
  // const { successMsg, errorMsg } = useToasthook();
  return (
    <>
      <div className="w-1/3 flex justify-center items-center flex-col mt-10 mx-auto">
        <div className="flex flex-col gap-y-2 justify-center items-center">
          <Chip name="active" />
          <Chip name="deactive" />
        </div>

        <ToastContainer {...toastConfig} />
      </div>
    </>
  );
}

export default App;
